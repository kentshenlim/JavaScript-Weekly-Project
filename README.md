# JavaScript-Weekly-Project

Nothing much; just to get my hands dirty with JavaScript. The project
inspirations are from [Mikke Goes
Coding](https://mikkegoes.com/javascript-projects-for-beginners/).

## 20230123_Stopwatch

### Overview

- Use `setInterval(func, interval)` to execute counting function that will
  increase a global count and update display. The interval set in `setInterval`
  will determine the "frame rate".
- Execute the counting function per 10 ms => 0.01 s, therefore, each function
  call will increase the count by 1.
- When the count reaches 100, set to 0, then increase the number of seconds by
  one.
- Use `clearInterval(ID)` to stop the repeated execution.

### Answer reference

- [Cathy Dutton](https://codepen.io/cathydutton/pen/xxpOOw)

## 20230130_Clock

### Overview

- Involve the `Date` JS object to get time.
- Use `setTimeout(func, 1000)` in the function body, then call the function
  once. In this way, the function will recursively call itself every second,
  updating the time every second.
- For difference between `setInterval` and `setTimeout` in this application, see
  the JS summary for this week.

### Answer reference

- [Aaron Farrar](https://codepen.io/afarrar/pen/JRaEjP)

## 20230206_Calculator

### Overview

- Store the input token as array, then convert the infix expression to postfix,
  then evaluate the answer with postfix. This way takes into account precedence
  rule easily without much thinking.
- Alternatively, treat division first, by locating the divide symbol in string
  or array. Then splice by converting the previous, symbol, and next number into
  answer. Repeat this until no division symbol found, then repeat the whole
  process for multiplication, subtraction and addition in that order.

### Answer reference

- [Vikas Lalwani](https://codepen.io/lalwanivikas/details/eZxjqo)

## 20230213_Drum

### Overview

- For flying effect, use multiple images, positioned with `position: relative/absolute`,
  then transform by toggling class with `keydown` and `transitionend`.
- Audio element controlled with html `<audio>` and the js functions
  `audioNode.currentTime` and `audioNode.play`.
- Linking between elements and keys are achieved by setting `data-key` attribute
  on the elements in html. In JS, get the keyCode, then use attribute selector
  to get the right element. This means the value of the attribute must be equal
  to the keyCode value (which is not free to be changed).
- First time trying modular pattern!

### Answer reference

- [Arun Michael Dsouza](https://codepen.io/amdsouza92/pen/xdooWa)

## 20230220_GuessColor

### Overview

- Used `float: left` in layout.
- For different number of opt depending on level of difficulty, answer just
  `display: none`, as if they disappear, and don't add event listener to them
  (use the length of colorOpt). Self attempt removes and creates elements,
  rather tediously.
- The random color generated can be passed as RGB string conveniently, which can
  then be passed into string as RHS of `.style.backgroundColor` declaration.
  Don't really need an array of `Array(3)`.
- To disable further selection after correct answer chosen, change the color of
  remaining opt to be the same as final answer, then clicking them again will
  not lead to wrongAnswerResponse invocation, then the page appears as if
  nothing happens.

### Answer reference

- [Michelle Huang](https://codepen.io/itsmhuang/pen/oxaReK)
