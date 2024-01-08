# Calculator

* [Live Demo](https://ajwjung.github.io/calculator/)

## Objective

To create a browser version of a calculator using HTMl, CSS, and JavaScript. Full details can be found on [The Odin Project's page](https://www.theodinproject.com/lessons/foundations-calculator).

### Specifications

**Requirements**

1. The calculator should have all the basic math functions:
    * Add
    * Subtract
    * Multiply
    * Divide

2. The calculator should include a display screen and buttons for:
    * Each digit
    * Each of the above functions
    * An "Equals" key
    * A "Clear" key

The calculator should not evaluate more than a single pair of numbers at a time. For instance, if the calculation was `12 + 7 - 5` then the calculator should first do `12 + 7`, display the result of that calculation (`19`), then use it as the first number in the next calculation (`19 - 5`).

**Optional**

1. Allow users to enter floating point numbers, but make sure the decimal button is disabled if there's already one in the display

2. Use CSS to make the calculator look nice

3. Add a "backspace" button, so the user can undo if they click the wrong number

4. Add keyboard support

## Using the Calculator

**Update:** The calculator was revamped and now allows keyboard support for the following keys:
- `+` for addition
- `-` for subtraction
- `*` for multiplication
- `/` for division
- `Esc` for clearing/resetting the calculator (equivalent to the "AC" button)
- `Backspace` for deleting the last entered number
- `Enter` for finalizing the calculation (equivalent to the `=` button)

The screen will also now automatically resize the number so it fits within the container instead of cutting off at 9 digits.

This is a basic calculator that can perform basic operations (addition, subtraction, multiplication, and division). Floating numbers are currently not accepted input values.

## Author's Notes

This project was quite enjoyable because I got more practice using event listeners and really had to think about the logic needed to make the calculator work. I also got a glimpse of what it's like to work on a bigger project and having new bugs introduced each time you try to fix something.

The main challenge I faced was trying to make the calculator properly calculate the input depending on the order of buttons pressed. Some example scenarios:
* If the series of clicks was `5 + =`, then the calculator should use the first number (`n1`) as the second number (`n2`) and return the total (`10`).
* If the series of clicks was `5 x 2 =`, then the calculator should return the final product (`10`). 
* If the series of clicks was `5 = x 2 =`, then the calculator should calculate as if the input was `5 x 2` without breaking.

**Next Steps**

At this time, my calculator currently does not allow the user to input floating point numbers. I will likely implement this feature later on when I've thought about how to change the UI in a nice way that can accommodate a new button.
