const displayText = document.querySelector('.display-text');
const clearKey = document.getElementById('clear');

let textToDisplay = ""; 

function updateDisplay(e){
    textToDisplay += e.target.innerText;
    displayText.textContent = textToDisplay;
}

function clearDisplay(){
    textToDisplay = "";
    displayText.textContent = 0;
}

const keys = Array.from(document.querySelectorAll(".number"));
keys.forEach(key => key.addEventListener('click', updateDisplay, {
    capture: true
}))
clearKey.addEventListener("click", clearDisplay)
