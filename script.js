const display = document.querySelector(".displayNumber");
const buttons = document.querySelectorAll(".button-key button");

let firstValue = null;
let operator = null;
let waitingForSecond = false;

function updateDisplay(value) {
  display.textContent = value;
}

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "x") return a * b;
  if (op === "÷") return a / b;

  return b;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // AC
    if (value === "AC") {
      updateDisplay("0");
      firstValue = null;
      operator = null;
      waitingForSecond = false;
      return;
    }

    // +/- toggle
    if (value === "+/-") {
      if (display.textContent !== "0") {
        updateDisplay(
          (parseFloat(display.textContent) * -1).toString()
        );
      }
      return;
    }

    // %
    if (value === "%") {
      updateDisplay(
        (parseFloat(display.textContent) / 100).toString()
      );
      return;
    }

    // Operators
    if (["+", "-", "x", "÷"].includes(value)) {
      if (firstValue !== null && !waitingForSecond) {
        const result = calculate(firstValue, display.textContent, operator);
        updateDisplay(result);
        firstValue = result;
      } else {
        firstValue = display.textContent;
      }

      operator = value;
      waitingForSecond = true;
      return;
    }

    // Equal
    if (value === "=") {
      if (firstValue !== null && operator !== null) {
        const result = calculate(firstValue, display.textContent, operator);
        updateDisplay(result);
        firstValue = null;
        operator = null;
        waitingForSecond = false;
      }
      return;
    }

    // Decimal
    if (value === ".") {
      if (!display.textContent.includes(".")) {
        updateDisplay(display.textContent + ".");
      }
      return;
    }

    // Numbers
    if (waitingForSecond) {
      updateDisplay(value);
      waitingForSecond = false;
    } else {
      updateDisplay(
        display.textContent === "0"
          ? value
          : display.textContent + value
      );
    }
  });
});