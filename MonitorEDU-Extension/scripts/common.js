let MonitorEDU_api = "https://8uy0ege324.execute-api.us-east-1.amazonaws.com/api";
let not_monitoring = true;
let sessionCode;

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
