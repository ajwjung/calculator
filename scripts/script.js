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
            if (n2 == 0) {
                body.style.backgroundColor = "coral";
                return "really :/";
            }
            return divide(n1, n2);
        default:
            return "ERROR: Unknown operator"
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

const body = document.querySelector("body");
const display = document.querySelector(".display-text");
const displayWindow = document.querySelector(".display-window");
const buttons = document.querySelectorAll("button");

let allClicks = [];
let tempString = "";

buttons.forEach(btn => {
    btn.addEventListener("click", displayText);
})

function getShortString(num) {
    const str = num + ""; // convert number to string

    return (str.length > 9) ? str.slice(0, 9) : str;
}

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
            body.style.backgroundColor = "rgb(129, 199, 211)";
            allClicks = [];
            tempString = "";
            display.textContent = "0";
            break;
        case "=":
            if (allClicks.length == 0) {
                if (tempString.length > 0) {
                    console.log(`Temp: ${tempString}`)
                    allClicks.push(tempString);
                    display.textContent = tempString;
                    tempString = "";
                }
            } else if (allClicks.length == 2) {
                if (tempString.length > 0) {
                    allClicks.push(tempString);
                    tempString = "";
                    doFinalCalculation(allClicks);
                } else {
                    allClicks.push(allClicks[0]);
                    doFinalCalculation(allClicks);
                };
            } else if (allClicks.length == 3) {
                if (tempString.length > 0) {
                    allClicks[2] = tempString;
                    console.log(allClicks);
                    tempString = "";
                    doFinalCalculation(allClicks);
                }
            }
            // display.textContent = allClicks.join("");
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            if (allClicks.length == 0) {
                if (tempString.length > 0) {
                    allClicks.push(tempString);
                    tempString = "";
                    allClicks.push(click);
                }
            } else if (allClicks.length == 1) {
                allClicks.push(click);
            } else if (allClicks.length == 2) {
                if (tempString.length > 0) {
                    allClicks.push(tempString);
                    tempString = "";
                    doFinalCalculation(allClicks);
                    allClicks[1] = click;
                }
            } else if (allClicks.length == 3) {
                if (tempString.length > 0) {
                    allClicks[2] = tempString;
                    tempString = "";
                    doFinalCalculation(allClicks);
                    allClicks[1] = click;
                    console.log(allClicks);
                } else {
                    allClicks[1] = click;
                }
            }
            break;
        case "0":
            if (tempString.length == 0) {
                tempString += click;
                display.textContent = "0";
            } else if (tempString == "0") {
                display.textContent = click;
            } else {
                tempString += click;
                display.textContent = tempString;
            }
            break;
        default:
            if (tempString == "0") {
                tempString = "";
                tempString += click;
                display.textContent = tempString;
            } else {
                tempString += click;
                display.textContent = tempString;
            }
            break;
    }
}
