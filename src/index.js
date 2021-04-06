const state = {
  number: '',
  storedNumber: '',
  functionType: '',
};

const updateDisplay = () => {
  // const display = document.querySelector('.screen');
  // display.value = state.number || state.storedNumber;
  const display = document.querySelector('h2');
  display.innerHTML = state.number || state.storedNumber;
};

const handleClearValue = () => {
  state.number = '';
  state.storedNumber = '';
  state.functionType = '';
  updateDisplay();
};

const handleSetDisplayValue = (currNum) => {
  const { number } = state;
  if ((!number.includes('.') || currNum !== '.') && number.length < 8) {
    state.number = `${(number + currNum).replace(/^0+/, '')}`;
  }
  updateDisplay();
};

const handleSetStoredValue = () => {
  const { number } = state;
  state.storedNumber = number;
  state.number = '';
  updateDisplay();
};

const handleSetCalcFunction = (type) => {
  const { number, storedNumber } = state;
  if (number) {
    state.functionType = type;
    handleSetStoredValue();
  }
  if (storedNumber) {
    state.functionType = type;
  }
};

const handleToggleNegative = () => {
  const { number, storedNumber } = state;
  if (number) {
    if (number > 0) {
      state.number = `-${number}`;
    } else {
      const positiveNumber = number.slice(1);
      state.number = positiveNumber;
    }
  } else if (storedNumber > 0) {
    state.storedNumber = `-${storedNumber}`;
  } else {
    const positiveNumber = storedNumber.slice(1);
    state.storedNumber = positiveNumber;
  }
  updateDisplay();
};

const handleBackButton = () => {
  const { number } = state;
  if (number !== '') {
    state.number = number.slice(0, number.length - 1);
    updateDisplay();
  }
};

const doMath = () => {
  const { number, storedNumber, functionType } = state;
  if (number && storedNumber) {
    switch (functionType) {
      case '+':
        state.storedNumber = `${parseFloat(storedNumber) + parseFloat(number)}`;
        break;
      case '-':
        state.storedNumber = `${parseFloat(storedNumber) - parseFloat(number)}`;
        break;
      case '/':
        state.storedNumber = `${parseFloat(storedNumber) / parseFloat(number)}`;
        break;
      case '*':
        state.storedNumber = `${parseFloat(storedNumber) * parseFloat(number)}`;
        break;
      default:
        break;
    }
    state.number = '';
    updateDisplay();
  }
};

const buttons = document.querySelectorAll('.number');
const clearButton = document.querySelector('.clear');
const toggleNegativeButton = document.querySelector('.toggle-negative');
const backButton = document.querySelector('.back');
const functionButtons = document.querySelectorAll('.func');
const equalButton = document.querySelector('.equal');

buttons.forEach((button) =>
  button.addEventListener('click', (e) => handleSetDisplayValue(e.target.value))
);

clearButton.addEventListener('click', handleClearValue);

toggleNegativeButton.addEventListener('click', handleToggleNegative);

backButton.addEventListener('click', handleBackButton);

functionButtons.forEach((button) =>
  button.addEventListener('click', (e) => handleSetCalcFunction(e.target.value))
);

equalButton.addEventListener('click', doMath);
