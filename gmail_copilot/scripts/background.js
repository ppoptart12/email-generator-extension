// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Function to inject content script
function injectContentScript(tabId) {
  chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['gmail_copilot/scripts/content.js']
  }, () => {
      if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
      } else {
          console.log("Content script injected");
      }
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' || changeInfo.url) {
        if (tab.url && tab.url.includes('https://mail.google.com/')) {
            injectContentScript(tabId);
            chrome.sidePanel.setOptions({ path: "gmail_copilot/source/popup.html" });
        }
        else{
            chrome.sidePanel.setOptions({ path: "gmail_copilot/source/not_gmail_tab.html" });
        }
      }
  });


// Listen to tab activation to ensure the content script is injected
chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
      if (tab.url && tab.url.includes('https://mail.google.com/')) {
          injectContentScript(activeInfo.tabId);
          chrome.sidePanel.setOptions({ path: "gmail_copilot/source/popup.html" });
        }else{
            chrome.sidePanel.setOptions({ path: "gmail_copilot/source/not_gmail_tab.html" });
        }
    });
});

// Listen for window focus changes
chrome.windows.onFocusChanged.addListener(windowId => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
      chrome.tabs.query({ active: true, windowId: windowId }, tabs => {
          if (tabs.length > 0) {
              const tab = tabs[0];
              if (tab.url && tab.url.includes('https://mail.google.com/')) {
                  injectContentScript(tab.id);
              }
              chrome.sidePanel.setOptions({ path: "gmail_copilot/source/popup.html" });
          }
      });
  }
});
