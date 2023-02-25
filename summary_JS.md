# Summary JS

## New Built-in Functions/ Methods Encountered

### 20230123_Stopwatch

1.  `windows.onload = function() {}`

    - "This is used with the window element to execute a script after the webpage has
      completely loaded."
    - Basically, put all variable initialization and function declaration as a
      function body of the function at RHS.
    - The `windows.onload` is used to wait for the rest of the page to load,
      then only the script.js (or anything enclosed by the `windows.onload`)
      will be executed. This is however redundant with the usage of `defer`
      keyword.
    - Both `defer` and `windows.onload` could cause a delay in the user
      experience because the JS will not execute until the entire page has
      loaded. If you want the JS to be executed when the initial HTML document
      has been completely loaded and parsed without waiting for external
      resources to finish loading, use `DOMContentLoaded`:
      `document.addEventListener("DOMContentLoaded", function)`

2.  `setInterval(function, interval)`

    - The function will be executed repeatedly, with interval = interval between
      two successive executions.
    - interval is in ms (does not allow s, unlike CSS transition)
    - "Returns an interval ID which uniquely identifies the interval, so you can
      remove it later by calling `clearInterval(ID)`."
    - Typical call `Interval = setInterval(repeatMe, 10)`
    - Note the first execution is after the interval, but not just after the
      line has been executed.

3.  `setTimeout(function, interval)`

    - "Execute a function, after waiting a specified number of ms."

4.  `clearInterval(ID)`

    - The ID is the output from `setInterval()`
    - For example, after executing one function, the `setInterval(func, 10)`
      will start to count for 10 ms before executing the `func` again. If you
      call `clearInterval(ID)`, the timer internal to the `setInterval()` will
      be reset to 0. You then need to call the `setInterval` again to repeat the
      func execution.

### 20230130_Clock

1. `setTimeout(function, interval)` recursive call

   - When is this useful against `setInterval`? Best illustrated by comparing
     stopwatch and timer.
   - Invoking `setInterval` will start the timer, then execute the function
     every time after the timer reaches that interval. The execution is not
     immediate, meaning at least one interval must have finished to get the
     first execution.
   - `setInterval` is fine for stopwatch, because you want to add one only
     after that 0.01 s (the interval set).
   - `setInterval` however, is less ideal for timer. This is because the
     function will execute for the first time only when that interval set is
     reached. If the interval is 1s, this means you will stuck with your
     original time in HTML for 1s (if any, if nothing then it will appear blank
     for 1s), but what we want is instant update, as soon as the HTML loads.
   - By having the `setTimeout` in the body (at the end) of an updateDisplay
     function, and then outside the function invoking the function once, when
     the HTML loads, the function will be invoked immediately once, giving
     immediate time. After the interval in `setTimeout` reaches, that function
     will be called recursively again.

### 20230206_Calculator

1. Regex split string by a selection of char

   - Say want to split a string into array by any of `+`, `-`, `*`, `/`
   - s.split(/\+|\-|\*|\//g)
   - `|` means or as usual

### 20230213_Drum

1. Audio control

   - For html part, need to have the `audio` element:
     <audio src="" id="" data-key=""><audio>
     Normally just dump all the audio elements at the end of html before the
     `body` closing tag.
   - To play, reset the `currentTime`, then play. If not resetting, multiple
     of them will play together like echo.
     `const audioElement = document.querySelector("")`
     `audioElement.currentTime = 0;`
     `audioElement.play();`

2. `this` keyword in two scenarios when binding events in modular JS

   - `nodeList.forEach(item => item.addEventListener("click", this.callback))`
     For this case, the `this` keyword in the scope of the `callback` will be
     referring to the item to which the event listener is being attached to,
     therefore, you will need binding:
     `nodeList.forEach(item => item.addEventListener('click', this.callback.bind(this)))`
   - `window.addEventListener('keydown', () => {this.callback1(); this.callback2()})`
     In this case, you are passing an arrow function, and the body of arrow
     function involves invoking some other functions. The `this` will be
     referring to the object containing the methods itself, but not the object
     to which the event is being attached to; therefore binding is not needed.
   - Why is that so? Probably because the function invocation passed in as
     argument, when called, is just a function invocation but not a method
     invocation. The this will then be referring to the event. For the arrow
     function, arrow function always follows lexical scope, the lexical scope
     has `this` = object itself.

3. Returning to initial state after transition end: `transitionend`

   - You will typically control the change in appearance of an element by adding
     an active class during transition and removing it after transition.
   - CSS: set the transition property to make the transition process slower so
     visible: `transition: all ease-in-out 0.5s`
   - Trigger the change when trigger encountered, e.g. a click, set in JS:
     `node.addEventListener('click', this.triggerChange)`
     `triggerChange() {this.style.classList.toggle('active')}`
   - Trigger the removal of the class when the transition end, with another
     event listener:
     `node.addEventListener('transitionend", this.removeChange)`
     `removeChange() {this.style.classList.toggle('active')}`
   - You therefor need two event listeners, one to trigger change, the other to
     remove.

4. `keydown` event

   - Do something when a key is pressed:
     `node.addEventListener('keydown', this.doSomething.bind(this))`

5. `e` keyword

   - You need to specify the `e` keyword when defining function. However, when
     passing the function into event listener, need not specify the `e` as
     input (you cannot pass invocation anyway). But that's fine because when
     you still call `e` in the body of the function the correct event can be
     recognized.

6. `data-key` control
   - Get the key code from event listener with `e.keyCode`
   - Get the display element in html with query selector on attribute selector:
     `const node = document.querySelector('div[data-key="${e.keyCode}"]')`
     Note replace the outermost quote with backtick! Here we are using markdown.
   - Similarly for the audio element, replacing the div by audio.
