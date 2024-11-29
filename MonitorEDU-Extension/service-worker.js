chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "tabCounter");
  port.onMessage.addListener(function(msg) {
    if (msg.ask === "How Many Tabs?") {
      chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
        port.postMessage({response: tabs.length});
      });
    }
  });
});
