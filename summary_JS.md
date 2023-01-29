# Summary JS

## New Built-in Functions/ Methods Encountered

### 20230123_Stopwatch

1.  `windows.onload = function() {}`
    - "This is used with the window element to execute a script after the webpage has
      completely loaded."
    - Basically, put all variable initialization and function declaration as a
      function body of the function at RHS.
2.  `setInterval(function, interval)`
    - The function will be executed repeatedly, with interval = interval between
      two successive executions.
    - interval is in ms
    - "Returns an interval ID which uniquely identifies the interval, so you can
      remove it later by calling `clearInterval(ID)`."
    - Typical call `Interval = setInterval(repeatMe, 10)`
3.  `setTimeout(function, interval)`
    - "Execute a function, after waiting a specified number of ms."
4.  `clearInterval(ID)`
    - The ID is the output from `setInterval()`
    - For example, after executing one function, the `setInterval(func, 10)`
      will start to count for 10 ms before executing the `func` again. If you
      call `clearInterval(ID)`, the timer internal to the `setInterval()` will
      be reset to 0. You then need to call the `setInterval` again to repeat the
      func execution.
