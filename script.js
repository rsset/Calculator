const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firsValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener("click", function (e) {
    const element = e.target;

    if (!element.matches("button")) return;
    
    if (element.classList.contains("operator")) {
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains("decimal")) {
        inputDecimal(element.value);
        return;
    }

    if (element.classList.contains("clear")) {
        claer();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(operator % waitingForSecondValue){
        operator = nextOperator;
        return;
    }
    
    if (firsValue == null) {
        firsValue = value;
    }

    else if(operator) {
        const result = calculate(firsValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firsValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    if(operator === "+"){
        return first + second;
    }

    else if(operator === "-"){
        return first - second;
    }

    else if(operator === "*"){
        return first * second;
    }

    else if(operator === "/"){
        return first / second;
    }
    return second;
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    }

    else{
        displayValue = displayValue === "0"? num: displayValue + num;
    }
}

function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += "."   
    }
}

function claer() {
    displayValue = "0";
}