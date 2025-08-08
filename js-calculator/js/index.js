const OPERATIONS = {
  SUM: "SUM",
  SUB: "SUB",
  MUL: "MUL",
  DIV: "DIV",
};

const operationSymbols = {
  SUM: "+",
  SUB: "−",
  MUL: "×",
  DIV: "÷",
};

const buttonsContainer = document.querySelector(".calculator__buttons");
const equalsButton = document.getElementById("equals");

Object.keys(OPERATIONS).forEach((operationKey) => {
  const button = document.createElement("button");
  button.classList.add("calculator-button");
  button.dataset.operation = OPERATIONS[operationKey];
  button.textContent = operationSymbols[operationKey];

  buttonsContainer.insertBefore(button, equalsButton);
});

const store = {
  input: 0,
  operation: null,
  displayText: "0",
};

let previousValue = null;

const inputElement = document.getElementById("input");
const displayElement = document.getElementById("display");
const operationButtons = document.querySelectorAll(".calculator-button");
const clearButton = document.getElementById("clear");

inputElement.value = "0";
displayElement.textContent = "0";

inputElement.addEventListener("input", handleInput);

function handleInput() {
  let raw = inputElement.value;

  if (raw.length > 10) {
    return;
  }

  if (raw === "" || raw === "-") {
    store.input = 0;
    store.displayText = "0";
    updateDisplay();
    return;
  }

  const number = Number(raw);
  if (!isNaN(number)) {
    store.input = number;
    store.displayText = raw;
    updateDisplay();
  }
}

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const operation = button.dataset.operation;
    handleOperation(operation);
  });
});

equalsButton.addEventListener("click", calculateResult);

clearButton.addEventListener("click", () => {
  previousValue = null;
  store.input = 0;
  store.operation = null;
  store.displayText = "0";

  inputElement.value = "";
  displayElement.textContent = "0";
});

function handleOperation(operationName) {
  if (store.input !== null) {
    if (previousValue === null) {
      previousValue = store.input;
    } else if (store.operation !== null) {
      previousValue = compute(previousValue, store.input, store.operation);
    }
    store.operation = operationName;
    store.input = 0;
    inputElement.value = "0";
    updateDisplay();
  } else if (store.displayText !== null) {
    store.operation = operationName;
    updateDisplay();
  }
}

function calculateResult() {
  if (store.operation !== null) {
    if (store.operation === OPERATIONS.DIV && store.input === 0) {
      store.displayText = "Ошибка деления на 0";
      previousValue = null;
    } else {
      previousValue = compute(previousValue, store.input, store.operation);
      store.displayText = previousValue.toString();
    }
    store.operation = null;
    store.input = 0;
    inputElement.value = "0";
    updateDisplay();
  }
}
function updateDisplay() {
  if (store.operation !== null) {
    displayElement.textContent = `${store.displayText} ${getOperationSymbol(store.operation)} ${store.input}`;
  } else {
    displayElement.textContent = store.displayText;
  }
}

function compute(a, b, operation) {
  switch (operation) {
    case OPERATIONS.SUM:
      return a + b;
    case OPERATIONS.SUB:
      return a - b;
    case OPERATIONS.MUL:
      return a * b;
    case OPERATIONS.DIV:
      return b !== 0 ? a / b : "Ошибка";
    default:
      return b;
  }
}

function getOperationSymbol(operation) {
  switch (operation) {
    case OPERATIONS.SUM:
      return "+";
    case OPERATIONS.SUB:
      return "−";
    case OPERATIONS.MUL:
      return "×";
    case OPERATIONS.DIV:
      return "÷";
    default:
      return "";
  }
}
