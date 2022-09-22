const add = (n1, n2) => n1 + n2;

const subtract = (n1, n2) => n1 - n2;

const multiply = (n1, n2) => n1 * n2;

const divide = (n1, n2) => n1 / n2;

const operate = function(n1, n2, operator) {
    switch (operator) {
        case "+":
            return add(n1, n2);
        case "-":
            return subtract(n1, n2);
        case "*":
            return multiply(n1, n2);
        case "/":
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

const display = document.querySelector(".display-text");
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
    btn.addEventListener("click", clickHandler);
})
