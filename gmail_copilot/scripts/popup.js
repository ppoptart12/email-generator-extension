chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const contentDiv = document.getElementById('content');
  
    if (tab.url.includes('https://mail.google.com/')) {
      fetch(chrome.runtime.getURL('gmail_copilot/source/gmail_tab.html'))
        .then(response => response.text())
        .then(data => {
          contentDiv.innerHTML = data;
        });
    } else {
      fetch(chrome.runtime.getURL('gmail_copilot/source/not_gmail_tab.html'))
        .then(response => response.text())
        .then(data => {
          contentDiv.innerHTML = data;
        });
    }
  });
  