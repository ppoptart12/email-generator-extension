const apiUrl = "https://email-generator-api-18639de3ae0d.herokuapp.com/generate_email/";
const dropdowns = document.querySelectorAll('.dropdown');


dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    const dropdownId = selected.getAttribute('id'); 

    const savedValue = localStorage.getItem(dropdownId);
    if (savedValue) {
        selected.innerText = savedValue;
        options.forEach(option => {
            option.classList.remove('active');
            if (option.innerText === savedValue) {
                option.classList.add('active');
            }
        });
    }

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

            localStorage.setItem(dropdownId, option.innerText);
        });
    });
});

document.getElementById('runButton').addEventListener('click', () => {
    const userInput = document.getElementById('inputBox').value;
    localStorage.setItem("savedUserInput", userInput);

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
        final_email_subject = data.email_subject
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
        localStorage.setItem('emailBody', data.email_body);

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

 
const savedUserInput = localStorage.getItem("savedUserInput");
if (savedUserInput) {
    document.getElementById('inputBox').value = savedUserInput;
}
