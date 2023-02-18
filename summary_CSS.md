# Summary CSS (and HTML) (and SCSS)

## Techniques

### 20230123_Stopwatch

1. SCSS syntax: `$name`

   - This allows you to define global var in SCSS.
   - `$orange: #ffa600` is equivalent to CSS `* {--ORANGE: #ffa600}`
   - To use it, simply `color: $orange`, equivalent to CSS `color: var(--ORANGE)`

2. SCSS syntax: `@mixin` and `@include`

   - "Mixins allow you to define styles that can be re-used throughout your
     stylesheet".
   - This is especially useful when there are a number of similar properties
     (due to different engines) that you need to define. You can even set up
     mixin taking in an arg: `@mixin corners ($radius) {}`
   - To call, in the declaration `@include corners (5px)`
   - `$` means placeholder in SCSS

3. SCSS syntax: `&`

   - "Used in nested selectors to refer to the outer selector", e.g. `&:hover`

4. General

   - Include specification on all similar properties, e.g.
     `-moz-border-radius`, `-webkit-border-radius`, `border-radius`,
     `-khtml-border-radius`. This can be done conveniently with mixins in SCSS.

### 20230130_Clock

1. Vertical centering

   - Without using flexbox
   - Use absolute position, then that item will be referenced WRT its parent:
     `{position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%)}`
   - When you `left: 50%; right: 50%;`, you move the upper left corner of your
     element to center of its element (which is not you want). Note the % here
     are WRT parent box dimension.
   - When you `transform: translateX(-50%) translateY(-50%)`, you move that
     element to left 50% of its own width, then upwards 50% of its own height.
     With this, you correct the position of the element. Note the % here are WRT
     moving element.
   - Complexity because the "reference point/ pivot" of an element is not always
     its center.
   - Sometimes need to pair with `position: relative` instead.

### 20230206_Calculator

1. CSS property: `user-select`

   - In some websites, when you try to highlight the text, they do not allow you
     to. This can be set using the `user-select` property.
   - "The `user-select` property controls whether the user can select text."
   - To disallow selection,
     `user-select: none; -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none;`

2. CSS property: `overflow-x`

   - `overflow-x: auto;` adds scrollbar when exceed along x-direction, else
     don't add
   - `overflow-x: scroll;` always adds scrollbar even not overflow

3. Button text bold when button being clicked

   - Use the :active pseudo-class
   - `button:active {font-weight: bold;}`

4. Vertical centering of text in an element
   - Just use `padding-top`

### 20230213_Drum

1. HTML element: `kbd`

   - Keyboard input element
   - "Represents a span of inline text denoting textual user input from a
     keyboard, voice input, or any other text entry device"
   - The text content of the element will appear in keyboard font.
     Furthermore, you can style that element in CSS, e.g. add border and white
     background-color to make the elements resemble real key caps.
