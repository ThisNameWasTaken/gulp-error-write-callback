const { src, dest, watch, series } = require('gulp');
const flatMap = require('gulp-flatmap');
const browserSync = require('browser-sync').create();

const parseHtml = flatMap((stream, file) => {
  // do some work ...

  return stream;
});

const html = () =>
  src('src/**/**.html')
    .pipe(parseHtml) // doing it like this throws an error
    // .pipe(
    //   // doing it like this works
    //   flatMap((stream, file) => {
    //     // do some work ...

    //     return stream;
    //   })
    // )
    .pipe(dest('dist'));

const watchDev = done => {
  watch('src/**/*.html', html);

  browserSync.init({
    port: 5555,
    server: './dist',
  });

  return done();
};

const start = series(html, watchDev);

module.exports = {
  start,
};
