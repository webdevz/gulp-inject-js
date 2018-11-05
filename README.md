# gulp-inject-js

Inject js file to html

## Install

```shell
npm install gulp-inject-js --save-dev
```

## Usage

```javascript
const gulp = require('gulp');
const injectJS = require('gulp-inject-js');

gulp.task('inject-js', function() {
  gulp.src('src/*.html')
    .pipe(injectJS())
    .pipe(gulp.dest('dist'));
});
```

In the html file, specify the **relative** path to JS

```html
<html>
  ...
  <!-- inject-js scripts/script.js -->
  ...
</html>
```