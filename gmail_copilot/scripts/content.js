if (!window.hasAddedComposeListener) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "composeEmail") {
          startComposeEmail(request.text);
      }
  });
  window.hasAddedComposeListener = true;
}

function startComposeEmail(text) {
  const composeButton = document.querySelector('.T-I.T-I-KE.L3');
  if (composeButton) {
      composeButton.click();

      // Delay the pasting function to allow the compose window to open
      setTimeout(() => {
          // Select all currently open compose windows
          const emailBodies = document.querySelectorAll('div[aria-label="Message Body"]');
          if (emailBodies.length > 0) {
              // Focus on the latest (most recent) compose window
              const latestEmailBody = emailBodies[emailBodies.length - 1];
              latestEmailBody.focus();
              
              // Insert HTML formatted text
              insertHTMLIntoBody(latestEmailBody, text);
          } else {
              alert("Email body not found!");
          }
      }, 1000); // Adjust delay as necessary
  } else {
      alert("Compose button not found!");
  }
}

function insertHTMLIntoBody(emailBody, htmlText) {
  // Insert HTML directly, preserving the formatting with <br> tags
  emailBody.innerHTML += htmlText;
}
