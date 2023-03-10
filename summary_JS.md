# Summary JS

## New Built-in Functions/ Methods Encountered

### 20230123_Stopwatch

1.  `windows.onload = function() {}`

    - "This is used with the window element to execute a script after the
      webpage has completely loaded."
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
   - `|` means "or" as usual

### 20230213_Drum

1. Audio control

   - For html part, need to have the `audio` element:
     <audio src="" id="" data-key=""><audio>
     Normally just dump all the audio elements at the end of html before the
     `body` closing tag.
   - To play, reset the `currentTime`, then play. If not resetting, multiple
     of them will play together like echo.
     ```
     const audioElement = document.querySelector("")
     audioElement.currentTime = 0;
     audioElement.play();
     ```

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
   - You therefore need two event listeners, one to trigger change, the other to
     remove.

4. `keydown` event

   - Do something when a key is pressed:
     `node.addEventListener('keydown', this.doSomething.bind(this))`
   - To get keycode, `e.keyCode`

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

7. General `data-` attribute and `dataset` property

   - "The data- attribute is a way to store custom data attributes on HTML
     elements."
   - To access the value of data- using JS, you can use the `dataset` property
     of the element.
     `<div id="hi" data-action: "save">Hello world</div>`
     `const element = document.getElementById("hi);`
     `const action = element.dataset.action;`
     `element.dataset.action` will look for element's `data-action` attribute
     value. The action can be replaced with other name as well.

### 20230220_GuessColor

1. Remove all children nodes of a node

   - Use `while` loop:
     `while (parent.firstChild) parent.firstChild.remove()`

2. Tips on dealing with `this` context in modular JS

   - Most braindead way is to always use arrow function in `.addEventListener`.
     You wrote the functions first in the normal way, then, instead of putting
     the `this.myFunction` as an arg into `.addEventListener`, write an arrow
     function that leads to the execution of the `this.myFunction`.
   - Better practice is of course to use `.bind()` if you have only one thing
     to do if the event triggering, for better readability.

3. `getRandomNumber` input

   - This kind of return is common to get a random integer:
     `return low + Math.floor(Math.random() * (high - low))`
     In the argument, say if you want to get any integer in the range 3 to 11
     inclusive, your second argument should be 12 but not 11, due to the
     `Math.floor` function which excludes 12 from the return range.

4. `removeEventListener('click', fnHandler)`

   - e.g. when correct answer selected, you want to stop the user from
     selecting other answer. This can be used, the `fnHandler` must be the same
     function that you input when adding the event listener.
   - For modular JS, this is difficult to implement because of the `this`.
     Instead, simple maintain a global bool, and make the `fnHandler` triggers
     only if the global bool is false, which means the correct answer not yet
     selected.
   - The answer achieves this by changing the color of all grids into that of
     final answer; it checks the answer by getting the string for
     node.style.backgroundColor declaration then compare; therefore, after the
     right answer selected, clicking any of the remaining grid will not trigger
     different action since all grids will have color equal to the answer.

### 20230227_Hangman

1.  Objects talking

    - In a function, there are two objects. You want a method in first object to
      interact with the second object. How?
    - Pass the second object as arg into the method. Therefore, the method in
      the first object will need an arg.

2.  Button clickable only once

    - Change the `disabled` property of the node
    - `const node = document.querySelector("button")`
      `node.addEventListener("click", () => node.disabled = true)`
    - The display style will also change when a button is disabled
    - To enable again, e.g. when start a new game, just set to false for all:
      `for (const node of nodeList) node.disabled = false`

3.  Disable all buttons when current game finished

    - In your event listener callback function, execute only when the game result
      is still not resolved.
    - e.g. for FT3 game,
      `actionBtns.forEach(node => node.addEventListener('click', () => {if (score < 3) ... }))`
      Then when the game has been resolved, the callback function will just do
      nothing.

4.  Canvas stickman

    - You must have a `<canvas>` element in html to begin with:
      `<canvas>Browser does not support HTML5 Canvas element.</canvas>`
    - General strategy  
      You have a series of action; e.g. each action draw a circle, then the next
      draw a line representing left hand, then draw a line representing right
      hand. For each "frame", you need to define a function that draw the correct
      stuff. Then, pass all the functions (each representing a frame) into an
      array, then loop through the array to show the process of drawing the
      stickman. That being said, there are some built-in functions in canvas that
      you must be familiar in order to use the canvas.
    - `getContext`  
      The target will be a canvas node. The argin is the "rendering context";
      this will specify the type of rendering context to obtain. The most
      commonly used context types are `2d` which is self-explanatory, or `webgl`
      which is useful for 3d graphics and animations, stands for web graphics
      language. Example call:
      ```
      const canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      ```
      After you get the correct context, you can then invoke methods present in
      the context. Here, our context is 2d, hence many built-in functions
      available for drawing 2d objects will be available for us as in:
      `ctx.fillRect(10, 10, 100, 100)`
      which draws a rectangle.
    - Define your pen, after get the right context

      ```
      ctx.beginPath();
      ctx.strokeStyle = '#fff'; // Use white pen
      ctx.linewidth = 2; // The tip is this wide
      ```

    - `ctx.beginPath()`  
      This is used to begin a new path on the canvas. "A path in the canvas is a
      series of connected lines, curves, and other shapes that can be drawn using
      various drawing functions provided by the canvas API."

      ```
      ctx.beginPath();
      ctx.arc(60, 25, 10, 0, Math.pi * 2, true); // Draw a circle
      ctx.stroke();
      ```

      So, at first, you let it know you want to start a path, then you define a
      path, then you ask to draw the outline of the defined path with
      `ctx.stroke()`.

    - Draw straight line
      You can define this kind of function:

      ```
      drawStraightLine(fromX, fromY, toX, toY) {
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
      }
      ```

      Again, define the shape first, then stroke out the outline of the define
      shape.

    - When should you `ctx.beginPath()`?  
      `ctx.beginPath()` will clear any previously defined path. If you are
      drawing multiple shapes, call this before each shape to ensure that they
      are drawn as separate entities.
      ```
      ctx.beginPath();
      // Define shape here
      ctx.stroke();
      ctx.beginPath();
      // Define second shape here
      ctx.stroke();
      ```
      When you want to change your pen, you need to `ctx.beginPath()` after you
      change the marker.
