chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      if (tab.url.includes('https://mail.google.com/')) {
        chrome.action.setPopup({ tabId: tabId, popup: 'gmail_copilot/source/popup.html' });
      } else {
        chrome.action.setPopup({ tabId: tabId, popup: 'gmail_copilot/source/not_gmail_tab.html' });
      }
    }
  });
  
  chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
      if (tab.url) {
        if (tab.url.includes('https://mail.google.com/')) {
          chrome.action.setPopup({ tabId: activeInfo.tabId, popup: 'gmail_copilot/source/popup.html' });
        } else {
          chrome.action.setPopup({ tabId: activeInfo.tabId, popup: 'gmail_copilot/source/not_gmail_tab.html' });
        }
      } else {
        chrome.action.setPopup({ tabId: activeInfo.tabId, popup: 'gmail_copilot/source/not_gmail_tab.html' });
      }
    });
  });
  