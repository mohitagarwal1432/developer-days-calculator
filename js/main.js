const allButtons = document.getElementsByClassName("keys");
const operations = ["+", "-", "*", "/"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const displayInput = document.querySelector("#displayInput");
const displayEquation = document.querySelector("#displayEquation");

var number1 = 0;
var number2 = 0;
var operator = "";
var clearInput = 0;
var clearInputOperator = 1; //if operator was set in last step

for (let i = 0; i < allButtons.length; i++) {
    let button = allButtons[i];
    button.addEventListener("click", () => {
        handleButtonClick(event);
    });
}

function handleButtonClick(e) {
    let ele = e.target;
    let button = ele.innerText;
    // console.log(button)
    if (digits.includes(button)) {
        console.log("digit");
        onDigitPress(button);
    } else if (operations.includes(button)) {
        onOperationPress(button);
    } else if (button == "C") {
        onClearPress();
    } else if (button == "=") {
        onEqualPress();
    } else if (button == "←") {
        onBackSpacePress();
    } else if (button == "R") {
        onResetPress();
    } else {
        alert("Invalid button pressed");
    }
}

function onResetPress(button = "R") {
    displayEquation.innerText = "";
    displayInput.innerText = "0";
    resetParameters();
}
function onClearPress(button = "C") {
    displayInput.innerText = "0";
}
function onBackSpacePress(button = "←") {
    displayInput.innerText = displayInput.innerText.slice(0, displayInput.innerText.length - 1);
    if (displayInput.innerText.length == 0) {
        displayInput.innerText = "0";
    }
    clearInput = 0;
}

function onOperationPress(button) {
    // operator = button;
    if (clearInputOperator) {
        let oldText = displayEquation.innerText.slice(0, displayEquation.innerText.length - 1);
        oldText = oldText.length ? oldText : "0";
        displayEquation.innerText = oldText + button;
        operator = button;
        return;
    }

    let input = parseFloat(displayInput.innerText);
    computeResult();

    clearInput = 1;
    clearInputOperator = 1;
    displayInput.innerText = number1;
    displayEquation.innerText += input + button;
    number2 = number1;
    operator = button;
}

function onEqualPress(button = "=") {
    if (clearInput) {
        displayEquation.innerText = "";
        clearInput = 0;
        return;
    }
    computeResult();
    displayInput.innerText = number1;
    displayEquation.innerText = "";
    clearInput = 1;
    resetParameters();
}

function computeResult() {
    number1 = parseFloat(displayInput.innerText);
    switch (operator) {
        case "+":
            number1 = number2 + number1;
            break;
        case "-":
            number1 = number2 - number1;
            break;
        case "*":
            number1 = number2 * number1;
            break;
        case "/":
            number1 = number2 / number1;
            break;
    }
}

function onDigitPress(button) {
    if (displayInput.innerText == "0" || clearInput == 1) {
        displayInput.innerText = button;
        clearInput = 0;
        clearInputOperator = 0;
    } else {
        displayInput.innerText += button;
    }
}

function resetParameters() {
    number1 = 0;
    number2 = 0;
    operator = "";
}
