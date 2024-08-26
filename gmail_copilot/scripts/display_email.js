// display_email.js

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the email content from localStorage
    const emailSubject = localStorage.getItem('emailSubject');
    const emailBody = localStorage.getItem('emailBody');

    // Insert the content into the appropriate elements
    document.getElementById('SubjectOutput').innerHTML = emailSubject || 'No subject generated';
    document.getElementById('BodyOutput').innerHTML = emailBody || 'No email body generated';
});

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

document.getElementById('return').addEventListener('click', () =>{
    window.location.href = "gmail_tab.html";
});

document.getElementById('settings').addEventListener('click', () =>{
    
});
document.getElementById('inputBox').value = localStorage.getItem("savedUserInput", userInput);
