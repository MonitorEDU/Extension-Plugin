const keyCombinations = ({ repeat, metaKey, ctrlKey, altKey, shiftKey, key }) => {
  if(repeat) return;
  if(not_monitoring) return;

  let key_message = "";

  if (metaKey && key != 'Meta') key_message = `[Cmd+${key}] was pressed`;
  if (ctrlKey && key != 'Control') key_message = (`[Ctrl+${key}] was pressed`);
  if (altKey && key != 'Alt') key_message = (`[Alt+${key}] was pressed`);
  if (metaKey && shiftKey) key_message = (`[Cmd+Shift] was pressed`);

  if(key_message != "") {
    chrome.storage.local.get({ session_code: 'Enter code here' },(items) => {
      if(items.session_code != 'Enter code here') {
        report_event(items.session_code,"keystroke_event",key_message);
      }
    });
  }
}

document.addEventListener('keydown', keyCombinations);

document.addEventListener("keyup", (event) => {
  const isRepetition = event.repeat;
  const key = event.key;

  if(isRepetition) return;
  if(not_monitoring) return;

  let key_message = "";

  if (key == "PrintScreen") key_message = `[${key}] was pressed`;
  if (key == "F1") key_message = `[${key}] was pressed`;
  if (key == "F2") key_message = `[${key}] was pressed`;
  if (key == "F3") key_message = `[${key}] was pressed`;
  if (key == "F4") key_message = `[${key}] was pressed`;
  if (key == "F5") key_message = `[${key}] was pressed`;
  if (key == "F6") key_message = `[${key}] was pressed`;
  if (key == "F7") key_message = `[${key}] was pressed`;
  if (key == "F8") key_message = `[${key}] was pressed`;
  if (key == "F9") key_message = `[${key}] was pressed`;
  if (key == "F10") key_message = `[${key}] was pressed`;
  if (key == "F11") key_message = `[${key}] was pressed`;
  if (key == "F12") key_message = `[${key}] was pressed`;

  if(key_message != "") {
    chrome.storage.local.get({ session_code: 'Enter code here' },(items) => {
      if(items.session_code != 'Enter code here') {
        report_event(items.session_code,"keystroke_event",key_message);
      }
    });
  }

});
