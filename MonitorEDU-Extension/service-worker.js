chrome.action.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
    let openTabs = {
      tabCount: tabs.length
    }
    console.log(openTabs);
  });
}
