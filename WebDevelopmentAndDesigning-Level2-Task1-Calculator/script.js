const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let isSecondNumber = false;

// ---------------- Numbers ----------------

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (!isSecondNumber) {

            firstNumber += button.textContent;
            display.value = firstNumber;

        } else {

            secondNumber += button.textContent;
            display.value = secondNumber;

        }

    });

});

// ---------------- Decimal ----------------

decimalButton.addEventListener("click", () => {

    if (!isSecondNumber) {

        if (!firstNumber.includes(".")) {

            firstNumber = firstNumber === ""
                ? "0."
                : firstNumber + ".";

            display.value = firstNumber;
        }

    } else {

        if (!secondNumber.includes(".")) {

            secondNumber = secondNumber === ""
                ? "0."
                : secondNumber + ".";

            display.value = secondNumber;
        }

    }

});

// ---------------- Operators ----------------

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        // No first number entered
        if (firstNumber === "") return;

        // Operator chaining
        if (secondNumber !== "") {

            calculate();

        }

        operator = button.textContent;
        isSecondNumber = true;

    });

});

// ---------------- Equal ----------------

equalButton.addEventListener("click", () => {

    if (
        firstNumber === "" ||
        secondNumber === "" ||
        operator === ""
    ) {
        return;
    }

    calculate();

});

// ---------------- Calculate ----------------

function calculate() {

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    let result = 0;

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":

            if (num2 === 0) {

                display.value = "Cannot divide by zero";

                reset();

                return;
            }

            result = num1 / num2;
            break;

        default:
            return;
    }

    display.value = result;

    firstNumber = result.toString();
    secondNumber = "";
    operator = "";
    isSecondNumber = false;

}

// ---------------- Clear ----------------

clearButton.addEventListener("click", () => {

    reset();
    display.value = "";

});

// ---------------- Backspace ----------------

backspaceButton.addEventListener("click", () => {

    if (!isSecondNumber) {

        firstNumber = firstNumber.slice(0, -1);
        display.value = firstNumber;

    } else {

        secondNumber = secondNumber.slice(0, -1);
        display.value = secondNumber;

    }

});

// ---------------- Reset ----------------

function reset() {

    firstNumber = "";
    secondNumber = "";
    operator = "";
    isSecondNumber = false;

}