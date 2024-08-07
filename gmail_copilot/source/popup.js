document.getElementById('runButton').addEventListener('click', () => {
    const userInput = document.getElementById('inputBox').value;

    fetch('http://127.0.0.1:8000/health', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').textContent = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').textContent = 'Error: ' + error;
    });
});
