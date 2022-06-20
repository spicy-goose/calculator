const displayText = document.querySelector('.display-text');
const keys = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equalKey = document.getElementById('equal');
const clearKey = document.getElementById('clear');
const signChange = document.getElementById('sign-change');


let input1 = ""; 
let input2 = "";
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
    if (input2 !== "" && currentOperation !== ""){
        input1 = performOperation(input1, input2, currentOperation);
        input2 = "";
        displayText.textContent = input1;
        return
    }else if(input2 !== ""){
    input1 = input2;
    input2 = "";
    displayText.textContent = input1;
    return
    }
}
function getResult(){
    checkForOperation();
    input1 = "";
    input2 = "";
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
    if (input2.includes('-') == false && input2 != false){
        input2 = `-${input2}`;
        displayText.textContent = input2;
        return
    }else if (input2 != false){
        input2 = `${Math.abs(+input2)}`;
        displayText.textContent = input2;
        return
    }
    return
}


keys.forEach(key => key.addEventListener('click', updateDisplay));
operators.forEach(operator => operator.addEventListener('click', lightUpOperator));
clearKey.addEventListener("click", clearDisplay);
equalKey.addEventListener("click", getResult);
signChange.addEventListener("click", changeSign);