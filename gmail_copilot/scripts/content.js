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

      setTimeout(() => {
          const emailBodies = document.querySelectorAll('div[aria-label="Message Body"]');
          if (emailBodies.length > 0) {
              const latestEmailBody = emailBodies[emailBodies.length - 1];
              latestEmailBody.focus();
              
              insertHTMLIntoBody(latestEmailBody, text);
          } else {
              alert("Email body not found!");
          }
      }, 500); 
  } else {
      alert("Compose button not found!");
  }
}

function insertHTMLIntoBody(emailBody, htmlText) {
  // Insert HTML directly, preserving the formatting with <br> tags
  emailBody.innerHTML += htmlText;
}
