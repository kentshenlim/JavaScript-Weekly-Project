# Summary CSS (and HTML) (and SCSS)

## Techniques

### 20230123_Stopwatch

1. SCSS syntax: `$name`

   - This allows you to define reusable var in SCSS.
   - `$orange: #ffa600` is equivalent to CSS `* {--ORANGE: #ffa600}`
   - As an aside, to define global variables in plain CSS, you should have
     defined it under the root element instead; the variables defined will be
     inheritable by default: `:root {--ORANGE: #ffa600}`
   - To use it, simply `color: $orange`, equivalent to CSS `color: var(--ORANGE)`

2. SCSS syntax: `@mixin` and `@include`

   - While `$name` allows you to predefine **value**, `@mixin` and `@include`
     allow you to predefine **declaration**, or even set of **declarations**.
   - "Mixins allow you to define styles that can be re-used throughout your
     stylesheet".
   - This is especially useful when there is a number of similar properties with
     different prefixes like -webkit or -moz (due to different browser engines)
     that you need to define, and reused over and over again throughout the
     stylesheet.
   - You can even set up mixin taking in arg for customizable values:
     `@mixin corners ($radius) {}`
     Note the arg always starts with dollar sign to let know that it is a
     placeholder.
   - To call, in the declaration `@include corners (5px)`, where the things in
     parentheses are the arg
   - `$` means placeholder in SCSS
   - Example:
     `@mixin box-shadow($x, $y, $blur, $color) {box-shadow: $x $y $blur $color}`
     The mixin declaration can set more than one property, here, not just
     box-shadow. This is very useful when you are certain those properties will
     often occur together.
     Then in the declaration for the element you want to style it use the
     `@include` keyword:
     `.my-element {@include box-shadow(2px, 2px, 5px, #888)}`

3. SCSS syntax: `&`

   - "Used in nested selectors to refer to the outer selector", e.g. `&:hover`
   - More precisely, `&` is just a reference to the parent selector. This is
     needed only when you are using pseudo-class selectors. See SCSS nesting
     next.
   - Example
     `.button {background-color: blue; &:hover {background-color: green;}}`
   - This saves you from the need to write out `.button:hover{}` declaration
     separately from the `.button{}`.
   - Don't simply add space, e.g. `& :hover` will mean `parent :hover`, which
     means the descendants of the elements selected by parent, but not the
     parent elements themselves.

4. SCSS nesting

- Say you have `.container`, and there is `h1` and `div` in it. In SCSS, to
  style them, you can just:
  ```
  .container {
    h1 {
      color: red;
    }
    div {
      color: blue;
    }
  }
  ```
  Note how the selectors are nested within another selector. You do not need
  to repeat `.container` multiple times.
- For "normal" selectors like this, no `&` is needed. For pseudo-class, not
  the case, because pseudo-class selector must be attached to a selector to be
  valid CSS.

5. General good practice

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
     WebKit, so `khtml` has become obsolete).

### 20230130_Clock

1. Strategy: vertical centering

   - Without using flexbox
   - Use absolute position, then that item will be referenced WRT its parent:
     `{position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%)};`
     which means you might need to change the parent to non-static position like
     `{position: relative}`
   - When you `top: 50%; left: 50%;`, you move the upper left corner of your
     element to center of its element (which is not you want). Note the % here
     are WRT **parent-box** dimension.
   - When you `transform: translateX(-50%) translateY(-50%)`, you move that
     element to left 50% of **its own width**, then upwards 50% of
     **its own height**. With this, you correct the position of the element.
     Note the % here are WRT moving element.
   - In CSS, the positive x-direction is towards horizontal right; the positive
     y-direction is towards vertical downward, rather counter-intuitively. You
     want to move upward not downward, so `translateY(-50%)`.
   - Complexity because the "reference point/ pivot" of an element is not always
     its center.

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
   - This works for other elements too, like `h1` which is not deemed clickable

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
     appropriate `transition` as well of course. In JS remember to add event
     listener to listen for `transitionend` event, to tilt back the image.

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

### 20230220_GuessColor

1. Hide elements

   - `display: none;`: This removes the element from the layout, which means
     layout shift might happen if you have already written in the element in
     your html and style the layout. **Can** interact with JS.
   - `visibility: hidden;`: This **does not** remove the element from the
     layout so layout shift will not happen. **Can** interact with JS. Pointer
     events like hover **will not** happen because hidden.
   - `opacity: none;`: This **does not** remove the element from the layout.
     **Can** interact with JS. Pointer events **can** happen.
   - So there are two distinguishing criteria: layout shift and pointer events.
   - Based on above then, what is the point of having `display: none`
     element? One feature that uses this is to hide elements on different screen
     sizes, allowing you to create responsive designs that adapt to different
     devices. You don't want layout change, no JS interaction and no pointer
     event.
   - If an element has `display: none`, it can still interact with JS because
     it is present in the DOM (but if you use JS to change its visual
     appearance, remember to change the `display: none` for you to observe the
     change). However, if an element's parent has `display: none`, you won't
     see the children of the parent in DOM, which means you will not be able to
     use JS to interact with the children of an element with `display: none;`.

2. CSS property: `text-transform: uppercase;`

   - This is better than all caps in html because: accessibility, consistency,
     ease of maintenance (no need edit all words in html if want to change),
     separation of concerns (visual display should be controlled by CSS;
     content should be controlled by html; capitalization is visual).

3. CSS property: `float`

   - `float: left;` causes the element to be moved to the left of the
     container and any subsequent content will wrap around it on the right-hand
     side. e.g. set a width on an external container, set a calculated width on
     the children, e.g. if 3 children per row divided by three, then
     `float: left` on all the children. The three children will be on the same
     row side-by-side even if they have `display: block`.
   - Old-fashioned, should use `flex` or `grid`.

### 20230227_Hangman

1. Grid items wrap to multiple lines depending on the width of grid-container

   - The declarations:

   ```
   ul.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 10px;
    list-style: none;
    padding: 0;
   }
   ul.grid-container > li {
    text-align: center;
   }
   ```

   "These keywords tell the browser to handle the column sizing and element
   wrapping for us so that the elements will wrap into rows when the width is
   not large enough to fit them in without any overflow."

   - `repeat()` first arg is the number of times to be repeated, here is
     `auto-fit` asking for however many that will fit into the row; second arg
     is the size that you want to repeat that many times, described by the
     `minmax()` CSS function here.
   - `200px` is the minimum width of column.
   - `1fr` ensures that if there is remnant space (e.g. if width of
     grid-container is 700px and min is 200px, there will be 100px remnant),
     that space will be distributed over the three columns that already fit.
   - What if you want the height to always be equal to the width of each grid
     item?
     `grid-item {aspect-ratio: 1 / 1}`

2. Sizing for best user experiences

   - Button height and width: `max(%, 44px)` (10-15 mm fingertip); `44px` often
     too big, let's do 75% `33px`
   - Button spacing: `8-10px`

3. Text-align of element not at center when element size reduced

   - Check padding of that element; when size too small the padding will be
     significant. Set it to zero.

4. Putting global var in CSS

   - Inheritable, so put under `:root{}` but not `*{}`
   - Old mistake

5. Double underline

   - `.uu {text-decoration: underline double}`  
     With the extra `double` value

6. `canvas` html element

   - "An html element that provides a way to create and manipulate graphics and
     animations on a webpage using JS. It allows you to draw shapes, lines,
     images, and text more programmatically."
   - "Provides a bitmap canvas that can be manipulated with JS."
   - "Has a width and height att that specifies the size of the canvas in
     pixels. Once the canvas is created, you can use JS to draw graphics on it
     using various methods amd properties provided by the canvas API."
   - Typical call:
     `<canvas id="first-canvas">Browser does not support HTML5 Canvas</canvas>`
   - Can: draw shapes, draw images, add text, create animations, manipulate
     pixels.
