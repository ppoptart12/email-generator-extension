chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const contentDiv = document.getElementById('content');
    if (tab.url.includes('https://mail.google.com/')) {
      fetch(chrome.runtime.getURL('gmail_copilot/source/gmail_tab.html'))
        .then(response => response.text())
        .then(data => {
          contentDiv.innerHTML = data;
          executeScript('gmail_copilot/scripts/Copilot_functions.js');
          executeScript('gmail_copilot/scripts/word_selection.js');
        });
    } else {
      fetch(chrome.runtime.getURL('gmail_copilot/source/not_gmail_tab.html'))
        .then(response => response.text())
        .then(data => {
          contentDiv.innerHTML = data;
        });
    }
  });
  

  function executeScript(scriptPath) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(scriptPath);
    script.onload = function() {
      this.remove(); // Clean up after script execution
    };
    (document.head || document.documentElement).appendChild(script);
  }