# Gulp error

## The error I get

```diff
- Error: write after end
-     at writeAfterEnd (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_writable.js:288:12)
-     at DestroyableTransform.Writable.write (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_writable.js:332:20)
-     at DestroyableTransform.ondata (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_readable.js:619:20)
-     at DestroyableTransform.emit (events.js:182:13)
-     at DestroyableTransform.EventEmitter.emit (domain.js:460:23)
-     at addChunk (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_readable.js:291:12)
-     at readableAddChunk (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_readable.js:278:11)
-     at DestroyableTransform.Readable.push (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_readable.js:245:10)
-     at DestroyableTransform.Transform.push (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_transform.js:148:32)
-     at Pumpify.onReadable (D:\Web-Projects\gulp-error-write-callback\node_modules\to-through\index.js:25:14)
- Emitted 'error' event at:
-     at DestroyableTransform.onerror (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_readable.js:640:52)
-     at DestroyableTransform.emit (events.js:182:13)
-     at DestroyableTransform.EventEmitter.emit (domain.js:442:20)
-     at writeAfterEnd (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_writable.js:290:10)
-     at DestroyableTransform.Writable.write (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_writable.js:332:20)
-     [... lines matching original stack trace ...]
-     at readableAddChunk (D:\Web-Projects\gulp-error-write-callback\node_modules\readable-stream\lib\_stream_readable.js:278:11)
```

## Steps to reproduce the problem

Run `npm start`.

**Note:** Do not forget to install all dependencies with `npm install`.

## Current way of fixing the error

Change this

```js
const parseHtml = flatMap((stream, file) => {
  // do some work ...

  return stream;
});

const html = () =>
  src('src/**/**.html')
    .pipe(parseHtml) // doing it like this throws an error
    .pipe(dest('dist'));
```

To this

```js
const html = () =>
  src('src/**/**.html')
    .pipe(
      // does not throw any errors
      flatMap((stream, file) => {
        // do some work ...

        return stream;
      })
    )
    .pipe(dest('dist'));
```

## Expected behavior

Both code snippets should work just fine. I do not see why naming the callback should raise any errors.
v
