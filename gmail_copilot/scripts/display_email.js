// display_email.js

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the email content from localStorage
    const emailSubject = localStorage.getItem('emailSubject');
    const emailBody = localStorage.getItem('emailBody');

    // Insert the content into the appropriate elements
    document.getElementById('SubjectOutput').innerHTML = emailSubject || 'No subject generated';
    document.getElementById('BodyOutput').innerHTML = emailBody || 'No email body generated';
});
