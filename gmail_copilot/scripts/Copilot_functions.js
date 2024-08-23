const apiUrl = "https://email-generator-api-18639de3ae0d.herokuapp.com/generate_email/";


document.getElementById('runButton').addEventListener('click', () => {
    document.getElementById('spinner').style.display = 'inline-block';
    const userInput = document.getElementById('inputBox').value;
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_prompt: userInput })
    })
    
    .then(response => response.json())
    .then(data => {
        final_email_subject = data.email_subject.replace(/\n/g, "<br>").replace(/\n\n/g, "<br>").replaceAll("^\"|\"$", "");
        final_email_body = data.email_body.replace(/\n/g, "<br>").replace(/\n\n/g, "<br>").replaceAll("^\"|\"$", "");
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // Check if the content script has already been injected
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: injectIfNotExists,
                args: [final_email_subject, final_email_body]  
            });
        });
        document.getElementById('SubjectOutput').innerHTML = final_email_subject;
        document.getElementById('BodyOutput').innerHTML = final_email_body;
        document.getElementById('spinner').style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').textContent = 'Error: ' + error;
    });
});

function injectIfNotExists(finalBody, finalSubject) {
    if (!window.hasInjectedCopilotScript) {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === "composeEmail") {
                startComposeEmail(request.subject, request.text);
            }
        });
        window.hasInjectedCopilotScript = true;
    }

    startComposeEmail(finalBody, finalSubject);
}
function copyText(elementId, buttonId) {
    var textToCopy = document.getElementById(elementId).innerHTML.replace(/<br\s*\/?>/gi, '\n');
    
    var buttonImg = document.getElementById(buttonId);
    buttonImg.src = "../images/CheckMark.png"; 

    setTimeout(function() {
            buttonImg.src = "../images/CopyText.png";
        }, 1000);
            
    navigator.clipboard.writeText(textToCopy);
}

// First copy button
document.getElementById('CopyButton1').addEventListener('click', () => {
    copyText('SubjectOutput', 'ButtonImage1');
});

// Second copy button
document.getElementById('CopyButton2').addEventListener('click', () => {
    copyText('BodyOutput', 'ButtonImage2');
});