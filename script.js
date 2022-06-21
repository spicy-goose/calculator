const displayText = document.querySelector('.display-text');
const keys = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equalKey = document.getElementById('equal');
const clearKey = document.getElementById('clear');
const signChange = document.getElementById('sign-change');
const backspace = document.querySelector('.backspace');

let memory = ""; 
let input = "";
let currentOperation = "";

function add(n1, n2){
    return n1+n2
}

function subtract(n1, n2){
    return (n1 === "")? n2: +n1-n2
}

function multiply(n1, n2){
    return n1*n2
}

function divide(n1, n2){
    if (n2 == 0) {
        return "ERROR"
    }
    return n1/n2
}

function remainder(n1, n2){
    return n1%n2
}

function updateDisplay(e){
    if (currentOperation == ""){
        memory = "";  //Resets the calculator memory if typing with no operations pending
    }
    //disables users from inputting multiple dots
    if (input.includes(".") && e.target.innerText == ".") return undefined; 
    if (input === "0") input = "" 
    input += e.target.innerText;
    displayText.textContent = input;
    lightOffOperators()
}

function clearDisplay(){
    lightOffOperators()
    memory = "";
    input = "";
    currentOperation = "";
    displayText.textContent = 0;
}

function lightUpOperator(e){
    checkForOperation()
    currentOperation = e.target.id;
    lightOffOperators()
    e.target.classList.add("active")
}

function checkForOperation(){
    if (input !== "" && currentOperation !== ""){
        memory = performOperation(memory, input, currentOperation);
        output()
        return
    }else if(input !== ""){
        memory = input;
        output()
    }
}

function output(){
    input = "";
    if  (memory.toString().includes(".")) {
        memory = Number(+memory).toFixed(9);
    }
    if (memory == "ERROR"){
        clearDisplay()
        displayText.textContent = "Try calling MIT?";
        return
    }
    displayText.textContent = memory;
    return
}

function getResult(){
    checkForOperation();
    currentOperation = "";
    input = "";
}

function performOperation(num1, num2, operation){
    switch (operation){
        case "add":
            return add(+num1, +num2)
        case "subtract":
            return subtract(num1, +num2)
        case "multiply":
            return multiply(num1, num2)
        case "divide":
            return divide(num1, num2)
        case "remainder":
            return remainder(num1, num2)
    }
}

function lightOffOperators(){
    return operators.forEach(operator => {
        if (operator.classList.contains('active')) operator.classList.remove("active") 
    });
}

function isAnyOperatorActive(){
    return operators.some(operator => operator.classList.contains('active'))
}

function changeSign(){
    if (input.includes('-') == false && input != false){
        input = `-${input}`;
        displayText.textContent = input;
        return
    }else if (input != false){
        input = `${Math.abs(+input)}`;
        displayText.textContent = input;
        return
    }
    return
}

function removeLastCharacter(){
    if (input.length > 1){
        input = input.substring(0,input.length-1);
        displayText.textContent = input;
    }else {
        input = "0";
        displayText.textContent = input;
    }
    return
}

function handleKeyPress(e){
    //selects key that matches keycode
    const keyToPress = document.querySelector(`button[data-key = "${e.key.toLowerCase()}"]`)
    if (keyToPress){
        keyToPress.click()
    }
    return 
}


keys.forEach(key => key.addEventListener('click', updateDisplay));
operators.forEach(operator => operator.addEventListener('click', lightUpOperator));
clearKey.addEventListener("click", clearDisplay);
equalKey.addEventListener("click", getResult);
signChange.addEventListener("click", changeSign);
backspace.addEventListener("click", removeLastCharacter)
document.addEventListener('keydown', handleKeyPress)