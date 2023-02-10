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

function infixToPostfix(s) {
  const list = s.split(' ');
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
  return outputList.join(' ');
}

function postfixToAnswer(s) {
  const list = s.split(' ');
  const stack = [];
  for (const item of list) {
    if (isNumber(item)) stack.push(item);
    else {
      const n2 = stack.pop();
      const n1 = stack.pop();
      const ans = evaluate(n1, n2, item);
      stack.push(ans);
    }
  }
  return ((stack.length === 1) ? stack[0] : NaN);
}
