/* Backend functions--------------------------------------------------------- */
const priority = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
};

function isNumber(s) {
  if (s[0] === '.' || (s[0] >= '0' && s[0] <= '9')) return true;
  if (s.length > 1 && s[1] >= '0' && s[1] <= '9') return true;
  return false;
}

function evaluate(n1, n2, op) {
  switch (op) {
    case '+':
      return n1 + n2;
    case '-':
      return n1 - n2;
    case '*':
      return n1 * n2;
    default:
      return n1 / n2;
  }
}

function infixToPostfix(list) {
  const outputList = [];
  const opStack = [];
  for (const item of list) {
    if (isNumber(item)) outputList.push(item);
    else {
      const crtPriority = priority[item];
      while (opStack.length && priority[opStack[opStack.length - 1]] >= crtPriority) {
        outputList.push(opStack.pop());
      }
      opStack.push(item);
    }
  }
  while (opStack.length) outputList.push(opStack.pop());
  return outputList;
}

function postfixToAnswer(list) {
  const stack = [];
  for (const item of list) {
    if (isNumber(item)) stack.push(item);
    else {
      const n2 = +stack.pop();
      const n1 = +stack.pop();
      const ans = evaluate(n1, n2, item);
      stack.push(String(ans));
    }
  }
  return ((stack.length === 1) ? stack[0] : NaN);
}

/* Frontend functions-------------------------------------------------------- */
/* Some global variables */
let tokenStore = [];
const buttonMapper = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  period: '.',
  plus: '+',
  minus: '-',
  times: '*',
  divide: '/',
};
let digitString = '';
let displayString = '';
let isNextClear = false;

/* Update display */
const displayText = document.getElementById('display');
function updateDisplay(s) {
  displayText.textContent = s;
}

/* Event for pressing digit btn */
const digits = document.querySelectorAll('.digit');
digits.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (isNextClear) {
      digitString = '';
      displayString = '';
      isNextClear = false;
    }
    digitString += buttonMapper[e.target.id];
    displayString += buttonMapper[e.target.id];
    updateDisplay(displayString);
  });
});

/* Event for pressing op btn */
const operators = document.querySelectorAll('.operator');
operators.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    isNextClear = false;
    if (!digitString.length) return;
    // Don't do anything when op pressed first, or pressed consecutively
    tokenStore.push(digitString); // Store this number
    digitString = ''; // Clear this number
    tokenStore.push(buttonMapper[e.target.id]);
    displayString += buttonMapper[e.target.id];
    updateDisplay(displayString);
  });
});

/* Event for pressing equal btn */
const equal = document.getElementById('equal');
equal.addEventListener('click', () => {
  if (tokenStore.length > 1) { // Else do nothing
    if (!digitString.length) displayString = 'NaN'; // Operator then equal
    else {
      tokenStore.push(digitString);
      const ans = postfixToAnswer(infixToPostfix(tokenStore));
      displayString = ans;
      tokenStore = []; // Can continue to push
      digitString = ans;
    }
    isNextClear = true;
    updateDisplay(displayString);
  }
});

/* Event for pressing clear btn */
const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
  tokenStore = [];
  digitString = '';
  displayString = '';
  updateDisplay(displayString);
});
