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

- Involve the `Date` JS object to get time.
- Use `setTimeout(func, 1000)` in the function body, then call the function
  once. In this way, the function will recursively call itself every second,
  updating the time every second.
- For difference between `setInterval` and `setTimeout` in this application, see
  the JS summary for this week.

### Answer reference

- [Aaron Farrar](https://codepen.io/afarrar/pen/JRaEjP)
