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
