"use strict";
//Function to change Theme
function changeTheme(event, args) {
  const themeValue = event.target.value;

  if (themeValue === "1") {
    getTheme1(args);
  }
  if (themeValue === "2") {
    getTheme2(args);
  }
  if (themeValue === "3") {
    getTheme3(args);
  }
}

//get First Theme
function getTheme1(args) {
  const {
    body,
    selectTheme,
    buttons,
    resultContainer,
    calculator,
    calculatorBtn,
    delResetBtn,
    equalBtn,
  } = args;
  body.classList.remove("body-th2", "body-th3");
  body.classList.add("body-th1");
  selectTheme.classList.remove("select-theme-th2", "select-theme-th3");
  selectTheme.classList.add("select-theme-th1");
  buttons.forEach((btn) => {
    btn.classList.remove("input-th2", "input-th3");
    btn.classList.add("input-th1");
  });
  resultContainer.classList.remove(
    "result-container-th2",
    "result-container-th3"
  );
  resultContainer.classList.add("result-container-th1");

  calculator.classList.remove("calc-th2", "calc-th3");
  calculator.classList.add("calc-th1");

  calculatorBtn.forEach((btn) => {
    btn.classList.remove("calc-container__btn-th2", "calc-container__btn-th3");
    btn.classList.add("calc-container__btn-th1");
  });

  delResetBtn.forEach((btn) => {
    btn.classList.remove("del-btn-th2", "del-btn-th3");
    btn.classList.add("del-btn-th1");
  });

  equalBtn.classList.remove("th2-equal-btn", "th3-equal-btn");
  equalBtn.classList.add("th1-equal-btn");
}

//get Second Theme
function getTheme2(args) {
  const {
    body,
    selectTheme,
    buttons,
    resultContainer,
    calculator,
    calculatorBtn,
    delResetBtn,
    equalBtn,
  } = args;
  body.classList.remove("body-th1", "body-th3");
  body.classList.add("body-th2");
  selectTheme.classList.remove("select-theme-th1", "select-theme-th3");
  selectTheme.classList.add("select-theme-th2");
  buttons.forEach((btn) => {
    btn.classList.remove("input-th1", "input-th3");
    btn.classList.add("input-th2");
  });
  resultContainer.classList.remove(
    "result-container-th1",
    "result-container-th3"
  );
  resultContainer.classList.add("result-container-th2");

  calculator.classList.remove("calc-th1", "calc-th3");
  calculator.classList.add("calc-th2");

  calculatorBtn.forEach((btn) => {
    btn.classList.remove("calc-container__btn-th1", "calc-container__btn-th3");
    btn.classList.add("calc-container__btn-th2");
  });

  delResetBtn.forEach((btn) => {
    btn.classList.remove("del-btn-th1", "del-btn-th3");
    btn.classList.add("del-btn-th2");
  });

  equalBtn.classList.remove("th1-equal-btn", "th3-equal-btn");
  equalBtn.classList.add("th2-equal-btn");
}

//get Third Theme
function getTheme3(args) {
  const {
    body,
    selectTheme,
    buttons,
    resultContainer,
    calculator,
    calculatorBtn,
    delResetBtn,
    equalBtn,
  } = args;
  body.classList.remove("body-th1", "body-th2");
  body.classList.add("body-th3");
  selectTheme.classList.remove("select-theme-th2", "select-theme-th1");
  selectTheme.classList.add("select-theme-th3");
  buttons.forEach((btn) => {
    btn.classList.remove("input-th2", "input-th1");
    btn.classList.add("input-th3");
  });
  resultContainer.classList.remove(
    "result-container-th1",
    "result-container-th2"
  );
  resultContainer.classList.add("result-container-th3");

  calculator.classList.remove("calc-th1", "calc-th2");
  calculator.classList.add("calc-th3");

  calculatorBtn.forEach((btn) => {
    btn.classList.remove("calc-container__btn-th1", "calc-container__btn-th2");
    btn.classList.add("calc-container__btn-th3");
  });

  delResetBtn.forEach((btn) => {
    btn.classList.remove("del-btn-th1", "del-btn-th2");
    btn.classList.add("del-btn-th3");
  });

  equalBtn.classList.remove("th1-equal-btn", "th2-equal-btn");
  equalBtn.classList.add("th3-equal-btn");
}

function tokenize(expression) {
  const regex = /(\d+(\.\d+)?|[+\-*/()])/g;
  return expression.match(regex) || [];
}

//evaluate Expression
function evaluateExpression(expression) {
  expression = expression.replace(/x/g, "*");
  const tokens = tokenize(expression);
  const operandStack = [];
  const operatorStack = [];
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === "+" || token === "-" || token === "*" || token === "/") {
      while (
        operatorStack.length > 0 &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        applyOperator(operandStack, operatorStack);
      }

      operatorStack.push(token);
    } else {
      let number = parseFloat(token);
      operandStack.push(number);
    }
  }

  while (operatorStack.length > 0) {
    applyOperator(operandStack, operatorStack);
  }

  return operandStack.pop();
}

// Apply operators
function applyOperator(operandStack, operatorStack) {
  const operator = operatorStack.pop();
  const operand2 = operandStack.pop();
  const operand1 = operandStack.pop();

  switch (operator) {
    case "+":
      operandStack.push(operand1 + operand2);
      break;
    case "-":
      operandStack.push(operand1 - operand2);
      break;
    case "*":
      operandStack.push(operand1 * operand2);
      break;
    case "/":
      operandStack.push(operand1 / operand2);
      break;
  }
}
export { changeTheme, evaluateExpression };
