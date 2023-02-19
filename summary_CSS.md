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
     mixin taking in arg: `@mixin corners ($radius) {}`
   - To call, in the declaration `@include corners (5px)`, where the thing in
     parentheses are the arg
   - `$` means placeholder in SCSS
   - Example:
     `@mixin box-shadow($x, $y, $blur, $color) {box-shadow: $x $y $blur $color}`
     The mixin declaration can set more than one property, here, not just
     box-shadow. This is very useful when you sure those properties will often
     occur together.
     Then in the declaration for the element you want to style it:
     `.my-element {@include box-shadow(2px, 2px, 5px, #888)}`

3. SCSS syntax: `&`

   - "Used in nested selectors to refer to the outer selector", e.g. `&:hover`
   - Example
     `.button {background-color: blue; &:hover {background-color: green;}}`

4. General

   - Include specification on all similar properties for accessibility of all
     browser engines, e.g.
     `-moz-border-radius`, `-webkit-border-radius`, `border-radius`,
     `-khtml-border-radius`. This can be done conveniently with mixins in SCSS.
     Those prefixes are vendor prefixes used in CSS to indicate which browser
     engines a particular CSS property applies to. "Vendor prefixes were
     introduced to allow browser vendors to experiment with new CSS features
     before they were standardized, so that web dev could begin using them
     before they were supported in all browsers." `-moz` for Firefox (Mozilla),
     `-webkit` for Safari and Chrome (WebKit), and `-ms` for Internet Explorer
     (Microsoft) (`khtml` is for Konqueror, but Konqueror has switched to using
     WebKit, so `khtml` has become obsolete)

### 20230130_Clock

1. Strategy: vertical centering

   - Without using flexbox
   - Use absolute position, then that item will be referenced WRT its parent:
     `{position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%)}`
   - When you `top: 50%; left: 50%;`, you move the upper left corner of your
     element to center of its element (which is not you want). Note the % here
     are WRT parent box dimension.
   - When you `transform: translateX(-50%) translateY(-50%)`, you move that
     element to left 50% of its own width, then upwards 50% of its own height.
     With this, you correct the position of the element. Note the % here are WRT
     moving element.
   - In CSS, the positive x-direction is towards horizontal right; the positive
     y-direction is towards vertical downward, rather counter-intuitively. You
     want to move upward not downward, so translateY(-50%).
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

3. Strategy: button text bold when button being clicked

   - Use the :active pseudo-class
   - `button:active {font-weight: bold;}`

4. Strategy: vertical centering of text in an element
   - Just use `padding-top`

### 20230213_Drum

1. HTML element: `kbd`

   - Keyboard input element
   - "Represents a span of inline text denoting textual user input from a
     keyboard, voice input, or any other text entry device"
   - The text content of the element will appear in keyboard font.
     Furthermore, you can style that element in CSS, e.g. add border and white
     background-color to make the elements resemble real key caps.

2. HTML attribute: `data-key`

   - Suppose you want to bind different keyboard keys to different elements in
     your HTML. One obvious way is to do one-by-one, add event listener
     one-by-one.
   - More effectively, you can use the `data-key` attribute in HTML. For
     example,
     `<button data-key="65">Press A</button>`
     In this example, that attribute is set to 65. Every key in keyboard has
     certain keycode associated with it. The A key has keycode value of 65. The
     value of the `data-key` attribute can be retrieved using JS, which could
     then be used to perform some action based on the value of the key.
   - For example, when a key is pressed, we can get the key code of the key
     pressed. With the key code, we can make changes on element which has
     `data-key` set equal to the key code of the key pressed. With this
     strategy, you do not need to set event listener one-by-one.
   - Different elements in one html can have the `data-key` attribute set to a
     common value.

3. Strategy: flying effect

   - When the hi-hat button is pressed, the hi-hat will tilt, mimicking it being
     struck. How do you simulate that animation?
   - Because you want the hi-hat to move independently of the main image (the
     whole drum kit), this means you need multiple images.
   - Enclose all images within a container. For the container, take
     `position: relative`, while for the images set `position: absolute`,
     then adjust the position between images using `top` `bottom` `left`
     `right` property. The images set will not be position relative to their
     closest ancestor with `position: relative`.
   - Because of this, you need to make the container to be statically-sized,
     else when the window is resized everything will be out of position.
   - Then for tilting, take `transform: rotate() scale()` and set the
     appropriate `transition` as well of course.

4. Strategy: panel not too small, else overflow

   - Sometimes when your viewport is small, because your container has been set
     in units of vw and vh, the container will be too small, making overflow of
     content. To solve this, limit the lower limit of the container size using
     the CSS `max` function:
     `body {width: max(100vw, 1000px); height: max(100vh, 700px);}`
     With this, when the viewport is too small, scroll bar will be added in
     place of overflow.
   - The static-type values depend on the minimum size of your content. They
     must be large enough for overflow not to happen.
