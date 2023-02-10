const priority = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
};

function infixToPostfix(s) {
  const list = s.split(' ');
  const outputList = [];
  const opStack = [];
  for (const item of list) {
    if (item[0] === '.' || (item[0] >= '0' && item[0] <= '9')) outputList.push(item);
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
