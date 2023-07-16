"use strict";
import { changeTheme, evaluateExpression } from "./utils.js";

const body = document.querySelector("body");
const selectTheme = document.querySelector(".select-theme-container");
const resultContainer = document.querySelector(".result-container");
const calculator = document.querySelector(".calc");
const calculatorBtn = document.querySelectorAll(".calc-container__btn");
const delResetBtn = document.querySelectorAll(".del-reset-btn");
const equalBtn = document.querySelector(".equal-btn");
const buttons = document.querySelectorAll(".button");
const calculatorInput = document.querySelector(".calc-container");
const calculatorResults = document.querySelector(".calc-last-container");
const args = {
  body,
  selectTheme,
  buttons,
  resultContainer,
  calculator,
  calculatorBtn,
  delResetBtn,
  equalBtn,
};
let inputTxt = resultContainer.textContent;
let isDecimalAllowed = true;

//toggle theme Buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.style.opacity = "0";
    });

    button.style.opacity = "1";
  });
});

selectTheme.addEventListener("click", (event) => {
  changeTheme(event, args);
});
calculatorInput.addEventListener("click", handleCalculatorInputs);

calculatorResults.addEventListener("click", handleCalculatorResults);

//handle Calculator Inputs
function handleCalculatorInputs(event) {
  if (event.target.value === undefined) {
    return;
  }

  const value = event.target.value;

  if (value === ".") {
    handleDecimalInput();
  } else if (value === "del") {
    handleDeleteInput();
  } else if (value === "+" || value === "-" || value === "*" || value === "/") {
    handleOperatorInput(value);
  } else {
    handleNumberInput(value);
  }

  resultContainer.textContent = resultContainer.textContent.replace(/\*/g, "x");
}

//handle Calculator Results
function handleCalculatorResults(event) {
  if (event.target.value === undefined) {
    return;
  }
  if (event.target.value === "reset") {
    inputTxt = "";
    resultContainer.textContent = inputTxt;
  }
  if (event.target.value === "equal") {
    if (
      inputTxt.endsWith("+") ||
      inputTxt.endsWith("-") ||
      inputTxt.endsWith("*") ||
      inputTxt.endsWith("/")
    ) {
      inputTxt = inputTxt.slice(0, -1);
    }
    const result = evaluateExpression(inputTxt);
    if (Number.isInteger(result)) {
      resultContainer.textContent = result;
    } else {
      resultContainer.textContent = result.toFixed(2);
    }
    inputTxt = resultContainer.textContent;
    isDecimalAllowed = true;
  }
}

// Handle Numbers Input
function handleNumberInput(value) {
  inputTxt += value;
  resultContainer.textContent = inputTxt;

  if (isNaN(value)) {
    const expression = inputTxt.slice(0, -1);
    const result = evaluateExpression(expression);
    resultContainer.textContent = result;
  }
}

// Handle Operators Input
function handleOperatorInput(value) {
  if (inputTxt === "" && value === "+") {
    return;
  }

  if (
    inputTxt.endsWith("+") ||
    inputTxt.endsWith("-") ||
    inputTxt.endsWith("*") ||
    inputTxt.endsWith("/")
  ) {
    return;
  }

  inputTxt += value;
  resultContainer.textContent = inputTxt;
  isDecimalAllowed = value === ".";
}

// Handle Decimal Numbers Input
function handleDecimalInput() {
  const lastToken = inputTxt.split(/(\+|\-|\*|\/)/).pop();
  if (!lastToken.includes(".")) {
    resultContainer.textContent = inputTxt;
    isDecimalAllowed = false;
  }
}

// Delete input
function handleDeleteInput() {
  inputTxt = inputTxt.slice(0, -1);
  resultContainer.textContent = inputTxt;
}
