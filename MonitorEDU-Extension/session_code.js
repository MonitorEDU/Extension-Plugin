let current_code;

// Saves options to chrome.storage
const saveOptions = () => {
    const code = document.getElementById('session_code').value;

    // Get active code berofe clearing the storage
    chrome.storage.local.get({ session_code: 'Enter code here' },(items) => {
      if(items.session_code != 'Enter code here'){
        chrome.runtime.sendMessage({
          type: 'clearing_code',
          session_code: items.session_code
        });
      }
    });
    
    chrome.storage.local.set(
      { session_code: code.trim()  },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Session Code saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 1000);
      }
    );

    if(code != ""){
      chrome.runtime.sendMessage({
        type: 'new_code',
        session_code: code.trim()
      });
    }
    else { 
      chrome.runtime.sendMessage({
        type: 'no_code',
        session_code: current_code
      });
    }
};
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.local
const restoreOptions = () => {
  chrome.storage.local.get({ session_code: 'Enter code here' },(items) => {
      document.getElementById('session_code').value = items.session_code;
      current_code = items.session_code;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById("session_code").addEventListener('keydown',function (event) {
  console.log(event);
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('save').click();
  }
});
