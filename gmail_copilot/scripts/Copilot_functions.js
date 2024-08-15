const apiUrl = "https://email-generator-api-18639de3ae0d.herokuapp.com/generate_email/";

document.getElementById('runButton').addEventListener('click', () => {
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
        final_body = data.replace(/\n/g, "<br>").replace(/\n\n/g, "<br>").replaceAll("^\"|\"$", "");

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // Check if the content script has already been injected
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: injectIfNotExists,
                args: [final_body]  
            });
        });
        document.getElementById('output').innerHTML = final_body;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').textContent = 'Error: ' + error;
    });
});

function injectIfNotExists(finalBody) {
    if (!window.hasInjectedCopilotScript) {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === "composeEmail") {
                startComposeEmail(request.text);
            }
        });
        window.hasInjectedCopilotScript = true;
    }

    startComposeEmail(finalBody);
}

function copyText() {
    var textToCopy = document.getElementById("output").innerHTML.replace(/<br\s*\/?>/gi, '\n');
    

    var buttonImg = document.getElementById("ButtonImage");
    buttonImg.src = "../images/CheckMark.png"; 

    setTimeout(function() {
            buttonImg.src = "../images/CopyText.png";
        }, 1000);
            
    navigator.clipboard.writeText(textToCopy)
}

document.getElementById('CopyButton').addEventListener('click', () => {
    copyText()
});
