const apiUrl = "https://email-generator-api-18639de3ae0d.herokuapp.com/generate_email/";
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    select.addEventListener('click', () =>{
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});

document.getElementById('runButton').addEventListener('click', () => {
    const userInput = document.getElementById('inputBox').value;
    document.getElementById('loadingScreen').classList.remove('hidden');

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            user_prompt: userInput, 
            email_length: document.getElementById('length').innerText.slice(2), 
            email_tone: document.getElementById('tone').innerText.slice(2)})
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
        localStorage.setItem('emailSubject', final_email_subject);
        localStorage.setItem('emailBody', final_email_body);

        window.location.href = "generated_email.html";

        document.getElementById('loadingScreen').classList.add('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').textContent = 'Error: ' + error;

        document.getElementById('loadingScreen').classList.add('hidden');
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

