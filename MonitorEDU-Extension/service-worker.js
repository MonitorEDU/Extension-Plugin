let MonitorEDU_api = "https://8uy0ege324.execute-api.us-east-1.amazonaws.com/api";
let exam_url;
const exam_tabs_id = [];
var tabToUrl = {};

function report_event(code, event, description) {
  fetch(`${MonitorEDU_api}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_code: code, // provided to tester
      event: event, // tabs_event | keystroke_event
      event_description: description, // new tab opened | too many tabs | cmd key pressed | etc
      event_timestamp: Date.now(), // javascript Date.now() ms since epoch
    }),
  }).catch((error) => console.log(error));
}

// Tab Counter
async function check_tabs() {
  const current_tabs = await chrome.tabs.query({
    windowId: chrome.windows.WINDOW_ID_CURRENT,
  });

  chrome.storage.local.get({ session_code: "Enter code here" }, (items) => {
    const current_session = items.session_code;

    if (current_session == "Enter code here") {
      return;
    }
    if (exam_tabs_id.length == 0) {
      return;
    }

    if (items.session_code != "Enter code here") {
      fetch(`${MonitorEDU_api}/status?session_code=${current_session}`)
        .then((raw_response) => raw_response.json())
        .then((json_response) => {
          let maxTabs = json_response.max_tabs;

          if (current_tabs.length > maxTabs) {
            report_event(
              current_session,
              "tabs_event",
              `${current_tabs.length} tabs opened (Max = ${maxTabs})`
            );
          }
        })
        .catch((error) => console.log(error));
    }
  });
}

function examTabClosed(tabId) {
  const tabId_closed = exam_tabs_id.indexOf(tabId);
  const closed_url = tabToUrl[tabId];

  if (tabId_closed + 1 == 0) {
    return;
  }

  // Move closed tabId to final position for pop().
  if (exam_tabs_id.length > 1) {
    let temp = exam_tabs_id[exam_tabs_id.length - 1];
    exam_tabs_id[exam_tabs_id.length - 1] = exam_tabs_id[tabId_closed];
    exam_tabs_id[tabId_closed] = temp;
  }

  // Get active code to report tab closed
  chrome.storage.local.get({ session_code: "Enter code here" }, (items) => {
    if (items.session_code != "Enter code here") {
      report_event(
        items.session_code,
        "tabs_event",
        `Exam tab closed: ${closed_url}`
      );
    }
  });

  exam_tabs_id.pop();
  delete tabToUrl[tabId];
}

chrome.tabs.onRemoved.addListener(examTabClosed);
chrome.tabs.onCreated.addListener(check_tabs);

chrome.runtime.onMessage.addListener((message, sender) => {
  switch (message.type) {
    case "new_code":
      // Session settings (GET from API)
      fetch(`${MonitorEDU_api}/init?session_code=${message.session_code}`)
        .then((raw_response) => raw_response.json())
        .then((json_response) => {
          // Code not exist or any general error.
          if (json_response.error) {
            (async () => {
              const [tab] = await chrome.tabs.query({
                active: true,
                lastFocusedWindow: true,
              });

              chrome.tabs.sendMessage(tab.id, {
                type: "code alert",
                error: json_response.error,
              });
            })();
            chrome.storage.local.clear();
            return;
          }
          // Code in 'finished' status.
          if (json_response.status == "finished") {
            (async () => {
              const [tab] = await chrome.tabs.query({
                active: true,
                lastFocusedWindow: true,
              });

              chrome.tabs.sendMessage(tab.id, {
                type: "code alert",
                error: "Session Finished!",
              });
            })();
            chrome.storage.local.clear();
            return;
          }

          exam_url = json_response.exam_url.split(",");

          exam_url.forEach((exam_page) => {
            (async () => {
              chrome.tabs.query({ url: exam_page }, (tabs) => {
                if (tabs.length > 0) {
                  for (let tab in tabs) {
                    chrome.tabs.sendMessage(tabs[tab].id, {
                      type: "activate monitoring",
                      keepAliveInterval: json_response.keep_alive_interval,
                      codeStatus: json_response.status,
                      infoType: json_response.type,
                    });
                  }
                }
              });
            })();
          });
        })
        .catch((error) => console.log(error));
      break;
    case "no_code":
      chrome.storage.local.clear();
      if (exam_url) {
        (async () => {
          chrome.tabs.query({ url: exam_url }, (tabs) => {
            if (tabs.length > 0) {
              for (let tab in tabs) {
                chrome.tabs.sendMessage(tabs[tab].id, {
                  type: "deactivate monitoring",
                  code: message.session_code,
                });
              }
            }
          });
        })();
      }
      break;
    case "exam_page_open":
      if (!exam_tabs_id.includes(sender.tab.id)) {
        exam_tabs_id.push(sender.tab.id);
        tabToUrl[sender.tab.id] = sender.tab.url;
      }
      check_tabs();
      break;
    case "clearing_code":
      chrome.storage.local.clear();
      report_event(
        message.session_code,
        "code_event",
        `Session code has been cleared`
      );
      break;
  }
});
