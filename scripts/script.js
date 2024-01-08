const body = document.querySelector("body");
const display = document.querySelector(".display-text");
const displayWindow = document.querySelector(".display-window");
const buttons = document.querySelectorAll("button");

let allClicks = [];
let tempString = "";

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
    /* 
    The function takes an array of two values and an operator
    and calculates the total, then displays the total rounded to two decimal places.
    */
    
    const [n1, operator, n2] = arr;
    const total = operate(n1, n2, operator);

    allClicks[0] = total;
    display.textContent = total.toFixed(2);
    shrinkTextToFitContainer(total.toString().length);
}

function shrinkTextToFitContainer(strLength) {
    /* 
    The function compares the text box's width with its parent's width
    and shrinks the text's font size if its width exceeds its parent's.

    If the string's length is less than 9 characters long,
    then resize back up to default font size.
    */

    let fontSize = parseInt(
        getComputedStyle(display).getPropertyValue('font-size')
    );
    const parentWidth = parseInt(
        getComputedStyle(display.parentElement).getPropertyValue('width')
    );
    const DEFAULT_FONT_SIZE = 55;

    while (display.offsetWidth > parentWidth) {
        display.style.fontSize = fontSize + "px";
        fontSize -= 1;
    }

    if (strLength <= 9) {
        display.style.fontSize = `${DEFAULT_FONT_SIZE}px`;
    }
}

function handleDelete(strLength) {
    /* 
    The function handles deleting the last pressed button's value/action 
    from screen and from the existing calculation 
    */
    if (strLength > 1) {
        tempString = tempString.slice(0, strLength - 1);
        display.textContent = tempString;
        shrinkTextToFitContainer(strLength);
    } else if (strLength == 1) {
        tempString = "0";
        display.textContent = tempString;
        shrinkTextToFitContainer(strLength);
    }
}

function handleClear() {
    /* 
    The function handles clearing the display and the existing calculation.
    */
    
    body.style.backgroundColor = "rgb(129, 199, 211)";
    allClicks = [];
    tempString = "";
    display.textContent = "0";
}

function handleEquals(strLength, arrLength) {
    if (arrLength == 0) {
        if (strLength > 0) {
            allClicks.push(tempString);
            display.textContent = tempString;
            shrinkTextToFitContainer(strLength);
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
}

function handleMathOperation(strLength, arrLength, click) {
    /* 
    The function takes the current (running) string's length
    and the length of the array holding all existing calculations
    to perform the newest calculation.
    */

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
        } else {
            allClicks[1] = click;
        }
    }
}

function handleZeroCalculation(strLength, click) {
    /* 
    The function handles calculations involving zero:
        1. User clicks on 0 when calculator is already cleared
        2. User clicks on 0 twice in a row when calculator is already cleared
        3. User clicks on 0 after clicking on other buttons
    
    In scenario 2, we don't want to append 0 again so we simply display the number.
    */
    if (strLength == 0) {
        tempString += click;
        display.textContent = "0";
    } else if (tempString == "0") {
        display.textContent = click;
    } else {
        tempString += click;
        display.textContent = tempString;
    }
}

function handleDefault(click) {
    /* 
    The function handles clicks for numbered buttons
    and displays them to the calculator "screen".
    */
    
    if (tempString == "0") {
        tempString = "";
        tempString += click;
        display.textContent = tempString;
        shrinkTextToFitContainer(tempString.length);
    } else {
        tempString += click;
        display.textContent = tempString;
        shrinkTextToFitContainer(tempString.length);
    }
}

function displayTextOnClick(e) {
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
            handleDelete(strLength);
            break;
        case "AC":
            handleClear();
            break;
        case "=":
            handleEquals(strLength, arrLength);
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMathOperation(strLength, arrLength, click);
            break;
        case "0":
            handleZeroCalculation(strLength, click);
            break;
        default:
            handleDefault(click);
            break;
    }
}

function displayTextOnKeydown(e) {
    /*
    The function works exactly like displayTextOnClick() but handles key presses. 
    */

    const pressedKey = e.code;
    const strLength = tempString.length;
    const arrLength = allClicks.length;

    body.style.backgroundColor = "rgb(129, 199, 211)";

    if (e.shiftKey) {
        // Multiply button was pressed
        if (pressedKey === "Digit8") {
            handleMathOperation(strLength, arrLength, "×");            
        } else if (pressedKey === "Equal") {
            // Plus button was pressed
            handleMathOperation(strLength, arrLength, "+");   
        }
    } else {
        if (pressedKey === "Backspace") {
            handleDelete(strLength);
        } else if (pressedKey.includes("Digit")) {
            // A mumber button was pressed
            handleDefault(pressedKey.slice(-1));
        } else if (pressedKey === "Minus") {
            // Minus button was pressed
            handleMathOperation(strLength, arrLength, "-");
        } else if (pressedKey === "Slash") {
            // Divide button was pressed
            handleMathOperation(strLength, arrLength, "÷");
        } else if (pressedKey === "Equal" || pressedKey === "Enter") {
            handleEquals(strLength, arrLength);
        } else if (pressedKey === "Digit0") {
            handleZeroCalculation(strLength, pressedKey.slice(-1));
        } else if (pressedKey === "Escape") {
            handleClear();
        }
    }  
}

// Event listeners to make the calculator's buttons functional
buttons.forEach(btn => {
    btn.addEventListener("click", displayTextOnClick);
});

window.addEventListener("keydown", displayTextOnKeydown);