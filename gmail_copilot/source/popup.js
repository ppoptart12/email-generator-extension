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
        data = data.replace(/\n/g, "<br>");
        data = data.replace(/\n\n/g, "<br>");
        data = data.replaceAll("^\"|\"$", "");

        document.getElementById('output').innerHTML = data;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').textContent = 'Error: ' + error;
    });
});

function copyText() {
    var textToCopy = document.getElementById("output").innerHTML.replace(/<br\s*\/?>/gi, '\n');
    

    var buttonImg = document.getElementById("ButtonImage");
    buttonImg.src = "../images/CheckMark.png"; // Change to the green checkmark image

    setTimeout(function() {
            buttonImg.src = "../images/CopyText.png";
        }, 1000);
            
    // Use the modern Clipboard API to copy text to the clipboard
    navigator.clipboard.writeText(textToCopy)
}

document.getElementById('CopyButton').addEventListener('click', () => {
    copyText()
});
