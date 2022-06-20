const displayText = document.querySelector('.display-text');
const keys = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const clearKey = document.getElementById('clear');

let input1 = 0; 
let input2 = "";
currentOperation = "";

function add(n1, n2){
    return n1+n2
}

function subtract(n1, n2){
    return n1-n2
}

function multiply(n1, n2){
    return n1*n2
}

function divide(n1, n2){
    return n1/n2
}

function remainder(n1, n2){
    return n1%n2
}

function updateDisplay(e){
    input2 += e.target.innerText;
    displayText.textContent = input2;
    lightOffOperators()
}

function clearDisplay(){
    lightOffOperators()
    input1 = "";
    input2 = "";
    displayText.textContent = 0;
}

function lightUpOperator(e){
    currentOperation = e.target.id
    checkForOperation()
    lightOffOperators()
    e.target.classList.add("active")
}

function checkForOperation(){
    if (input2 !== ""){
        input1 = performOperation(+input1, +input2, currentOperation);
        input2 = "";
        displayText.textContent = input1;

    };
}

function performOperation(num1, num2, operation){
    switch (operation){
        case "add":
            return add(num1, num2)
        case "subtract":
            return subtract(num1, num2)
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


keys.forEach(key => key.addEventListener('click', updateDisplay))
operators.forEach(operator => operator.addEventListener('click', lightUpOperator))
clearKey.addEventListener("click", clearDisplay)
