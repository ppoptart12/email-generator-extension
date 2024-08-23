if (!window.hasAddedComposeListener) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "composeEmail") {
            startComposeEmail(request.subject, request.text);
        }
    });
    window.hasAddedComposeListener = true;
}

function startComposeEmail(subjectText, bodyText) {
    const composeButton = document.querySelector('.T-I.T-I-KE.L3');
    if (composeButton) {
        composeButton.click();

        setTimeout(() => {
            const drafts = document.querySelectorAll('.AD [role="dialog"]');
            const latestDraft = drafts[drafts.length - 1]; // Select the most recent draft

            if (latestDraft) {
                const subjectInput = latestDraft.querySelector('input[name="subjectbox"]');
                if (subjectInput) {
                    subjectInput.focus();
                    subjectInput.value = subjectText;
                } else {
                    console.log("Subject line not found!");
                    return; 
                }

                // Insert body text with an additional delay
                setTimeout(() => {
                    const emailBody = latestDraft.querySelector('div[aria-label="Message Body"]');
                    if (emailBody) {
                        emailBody.focus();
                        insertHTMLIntoBody(emailBody, bodyText);
                    } else {
                        console.log("Email body not found!");
                    }
                }, 150); // Small delay before inserting the body text
            } else {
                console.log("No draft found!");
            }
        }, 200); // Slightly longer delay to ensure the compose window is ready
    } else {
        console.log("Compose button not found!");
    }
}

function insertHTMLIntoBody(emailBody, htmlText) {
    // Insert HTML directly, preserving the formatting with <br> tags
    emailBody.innerHTML += htmlText;
}
