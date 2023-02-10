/* Backend functions */
const priority = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
};

function isNumber(s) {
  return s[0] === '.' || (s[0] >= '0' && s[0] <= '9');
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
      while (opStack.length && priority[opStack[opStack.length - 1]] <= crtPriority) {
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

/* Frontend functions */
/* Some global variables */
const tokenStore = [];
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
const isNextClear = false;

/* Button effect */
const displayText = document.getElementById('display');
function updateDisplay(s) {
  displayText.textContent = s;
}

const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');

digits.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    digitString += buttonMapper[e.target.id];
    displayString += buttonMapper[e.target.id];
    updateDisplay(displayString);
  });
});

operators.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (!digitString.length) return;
    // Don't do anything when op pressed first, or pressed consecutively
    tokenStore.push(digitString); // Store this number
    digitString = ''; // Clear this number
    tokenStore.push(buttonMapper[e.target.id]);
    displayString += buttonMapper[e.target.id];
    updateDisplay(displayString);
  });
});
