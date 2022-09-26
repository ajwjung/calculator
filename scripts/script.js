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

const add = (n1, n2) => parseInt(n1) + parseInt(n2);
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n1 / n2;

function operate(n1, n2, operator) {
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

function doFinalCalculation(arr) {
    const [n1, operator, n2] = arr;
    total = operate(n1, n2, operator);
    allClicks[0] = total;
    display.textContent = getShortString(total);
}

function displayText(e) {
    /*
    The function updates tempString and allClicks and may perform calculation
    depending on the button clicked
        - tempString holds the current (running) number
        - allClicks holds up to 3 elements: [n1, operator, n2]
    */

    const click = e.target.textContent;
    const strLength = tempString.length;
    const arrLength = allClicks.length;

    body.style.backgroundColor = "rgb(129, 199, 211)";

    switch (click) {
        case "←":
            if (strLength > 1) {
                tempString = tempString.slice(0, strLength - 1);
                display.textContent = tempString;
            } else if (strLength == 1) {
                tempString = "0";
                display.textContent = tempString;
            }
            break;
        case "AC":
            body.style.backgroundColor = "rgb(129, 199, 211)";
            allClicks = [];
            tempString = "";
            display.textContent = "0";
            break;
        case "=":
            if (arrLength == 0) {
                if (strLength > 0) {
                    allClicks.push(tempString);
                    display.textContent = tempString;
                    tempString = "";
                }
            } else if (arrLength == 2) {
                if (strLength > 0) {
                    allClicks.push(tempString);
                    tempString = "";
                    doFinalCalculation(allClicks);
                } else {
                    allClicks.push(allClicks[0]);
                    doFinalCalculation(allClicks);
                };
            } else if (arrLength == 3) {
                if (strLength > 0) {
                    allClicks[2] = tempString;
                    tempString = "";
                    doFinalCalculation(allClicks);
                }
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            if (arrLength == 0) {
                if (strLength > 0) {
                    allClicks.push(tempString);
                    tempString = "";
                    allClicks.push(click);
                }
            } else if (arrLength == 1) {
                allClicks.push(click);
            } else if (arrLength == 2) {
                if (strLength > 0) {
                    allClicks.push(tempString);
                    tempString = "";
                    doFinalCalculation(allClicks);
                    allClicks[1] = click;
                }
            } else if (arrLength == 3) {
                if (strLength > 0) {
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
            if (strLength == 0) {
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
