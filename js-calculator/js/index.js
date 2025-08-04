const OPERATIONS = {
  SUM: "sum",
  SUB: "sub",
  MUL: "mul",
  DIV: "div",
};

const store = {
  result: 0,
  operation: null,
  input: "",
};

function updateInput() {
  const inputElement = document.getElementById("input");
  let value = inputElement.value;

  if (value.length > 10) value = value.slice(0, 10);

  if (!isNaN(value) || /^-?\d+\.?\d*$/.test(value)) {
    store.input = value;
  }
}

function chooseOperation(op) {
  updateInput();

  if (store.input !== "") {
    store.result = parseFloat(store.input);
    store.input = "";
    document.getElementById("input").value = "";
  }

  store.operation = op;
  updateResultDisplay(`${store.result} ${getOperationSymbol(op)}`);
}

function calculate() {
  updateInput();

  const a = parseFloat(store.result);
  const b = parseFloat(store.input);
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
    default:
      result = b;
  }

  store.result = result;
  store.input = "";
  store.operation = null;

  updateResultDisplay(result);
  document.getElementById("input").value = "";
}

function updateResultDisplay(text) {
  const inputEl = document.getElementById("input");
  inputEl.value = text;
}

function getOperationSymbol(op) {
  switch (op) {
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
