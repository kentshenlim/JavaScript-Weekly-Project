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
    - interval is in ms
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
