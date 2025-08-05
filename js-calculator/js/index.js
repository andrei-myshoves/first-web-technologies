const OPERATIONS = {
  SUM: "SUM",
  SUB: "SUB",
  MUL: "MUL",
  DIV: "DIV",
};

const store = {
  result: null,
  input: 0,
  operation: null,
  displayText: "0",
};

const inputElement = document.getElementById("input");
const displayElement = document.getElementById("display");
const operationButtons = document.querySelectorAll(".calculator-button");
const equalsButton = document.getElementById("equals");

inputElement.value = "0";
displayElement.textContent = "0";

inputElement.addEventListener("input", () => {
  let raw = inputElement.value;

  if (raw.length > 10) {
    raw = raw.slice(0, 10);
    inputElement.value = raw;
  }

  if (raw === "" || raw === "-") {
    store.input = 0;
    updateDisplay();
    return;
  }

  const number = Number(raw);
  if (!isNaN(number)) {
    store.input = number;
    updateDisplay();
  }
});

operationButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const operation = btn.dataset.operation;
    handleOperation(operation);
  });
});

equalsButton.addEventListener("click", () => {
  calculateResult();
});

function handleOperation(operationName) {
  if (store.input !== null) {
    if (store.result === null) {
      store.result = store.input;
    } else if (store.operation !== null) {
      store.result = compute(store.result, store.input, store.operation);
    }
    store.operation = operationName;
    store.input = 0;
    inputElement.value = "0";
    updateDisplay();
  } else if (store.result !== null) {
    store.operation = operationName;
    updateDisplay();
  }
}

function calculateResult() {
  if (store.operation && !isNaN(store.input)) {
    const a = store.result;
    const b = store.input;
    let result;

    switch (store.operation) {
      case OPERATIONS.SUM:
        result = a + b;
        break;
      case OPERATIONS.SUB:
        result = a - b;
        break;
      case OPERATIONS.MUL:
        result = a * b;
        break;
      case OPERATIONS.DIV:
        result = b !== 0 ? a / b : "Ошибка";
        break;
    }

    if (result === "Ошибка") {
      store.displayText = "Ошибка деления на 0";
      store.result = null;
    } else {
      result = +result.toFixed(10);
      store.result = result;
      store.displayText = result.toString();
    }

    store.input = 0;
    store.operation = null;
    inputElement.value = "";
    displayElement.textContent = store.displayText;
  }
}

function updateDisplay() {
  if (store.result !== null && store.operation !== null && store.input !== null) {
    displayElement.textContent = `${store.result} ${getOperationSymbol(store.operation)} ${store.input}`;
  } else if (store.result !== null && store.operation !== null) {
    displayElement.textContent = `${store.result} ${getOperationSymbol(store.operation)}`;
  } else {
    displayElement.textContent = store.input.toString();
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
