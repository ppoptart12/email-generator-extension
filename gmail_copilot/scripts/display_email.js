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
    navigator.clipboard.writeText(textToCopy);
}

// Second copy button
document.getElementById('copyButton').addEventListener('click', () => {
    copyText('BodyOutput', 'copyButton');
});

document.getElementById('return').addEventListener('click', () =>{
    window.location.href = "gmail_tab.html";
});

document.getElementById('settings').addEventListener('click', () =>{
    
});
