const add = (n1, n2) => parseInt(n1) + parseInt(n2);

const subtract = (n1, n2) => n1 - n2;

const multiply = (n1, n2) => n1 * n2;

const divide = (n1, n2) => n1 / n2;

const operate = function(n1, n2, operator) {
    switch (operator) {
        case "+":
            return add(n1, n2);
        case "-":
            return subtract(n1, n2);
        case "×":
            return multiply(n1, n2);
        case "÷":
            return divide(n1, n2);
        default:
            return "ERROR: Unknown operator"
    }
}

function resizeToFit() {
    let fontSize = window.getComputedStyle(displayWindow).fontSize;
    display.style.fontSize = (parseFloat(fontSize) - 1) + "px";

    if (display.clientHeight >= displayWindow.clientHeight) {
        resizeToFit();
    }
}

/*
Add event listeners to buttons
- If button.textContent == "blah", 
    then change display.textContent to button.textContent
- For serial clicks: need a temporary variable to hold the string of numbers

For each button, when clicked...
- Get the textContent
- If textContent is...
    a) "AC"
        - clear the storage array
        - display "0" on screen
    b) "="
        - append full number string to array
        - perform calculation on the last 2 numbers
        - display calculated value 
    c) A number
        - concatenate number to temp string
        - display the temp string
    d) An operator
        - append full number string
        - perform calculation on the last 2 numbers
        - display calculated value
*/

const display = document.querySelector(".display-text");
const displayWindow = document.querySelector(".display-window");
const buttons = document.querySelectorAll("button");

let allClicks = [];
let tempString = "";

buttons.forEach(btn => {
    btn.addEventListener("click", displayText);
})

function checkLength(arr) {
    if (arr.length == 3) return true;
}

function getShortString(num) {
    const str = num + ""; // convert number to string

    return (str.length > 9) ? str.slice(0, 9) : str;
}

// For operator clicks only
function doOperation(arr) {
    if (checkLength(arr)) {
        const [n1, operator, n2] = arr;

        total = operate(n1, n2, operator);
        allClicks = []; // reset the list
        allClicks.push(total); // add the new total
        display.textContent = getShortString(total);
    }
}

// For equal sign clicks only
function doFinalCalculation(arr) {
    const [n1, operator, n2] = arr;
    total = operate(n1, n2, operator);
    allClicks[0] = total;
    display.textContent = getShortString(total);
}

function displayText(e) {
    const click = e.target.textContent;

    switch (click) {
        case "AC":
            allClicks = [];
            tempString = "";
            display.textContent = "0";
            break;
        case "=":
            if (tempString.length == 0) {
                allClicks.push(allClicks[0]); // use n1 as n2
                doFinalCalculation(allClicks);
                console.log(`No temp string: ${allClicks}`);
            } else if (tempString.length > 0) {
                allClicks.push(tempString);
                tempString = "";
                doFinalCalculation(allClicks);
                console.log(`Yes temp string: ${allClicks}`);
            }
            // display.textContent = allClicks.join("");
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            if (allClicks.length == 0) {
                allClicks.push(tempString);
                tempString = "";
                allClicks.push(click);
            } else if (allClicks.length == 2) {
                allClicks.push(tempString);
                tempString = "";
                doFinalCalculation(allClicks);
                allClicks[1] = click;
            } else if (allClicks.length == 3) {
                allClicks[2] = tempString;
                tempString = "";
                doFinalCalculation(allClicks);
                allClicks[1] = click;
            }
            break;
        case "0":
            tempString += click;
            display.textContent = "0";
            break;
        default:
            tempString += click;
            display.textContent = tempString;
            break;
    }
}

/*
Things to fix 
- Equals sign only performing calculation the first time it's clicked
- Need to handle event if multiple operators clicked in succession
- Entering 0 changes display to 0 even though it's being registered properly
- Punching in multiple 0s before another number leaves leading zeroes on screen
*/