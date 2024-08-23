const words = ["Whats on your mind?"];
const randomIndex = Math.floor(Math.random() * words.length);
document.getElementById("UserGreeting").innerHTML = words[randomIndex];
