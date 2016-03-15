Tiny wrapper around webpack's CommonsChunkPlugin that makes it easier to create a "vendor bundle" for dependencies in `node_modules/` or `proj/vendor`.

## Usage

Basic usage:

```js
const createVendorChunk = require('webpack-create-vendor-chunk');

module.exports = {
  entry: {
    app: 'app/main.js',
  },

  output: {
    path: 'public/',
    filename: '[name].bundle.js'
  },

  plugins: [
    createVendorChunk()
  ],
};
```

Will create `public/vendor.bundle.js` in your output.

Multiple entry point bundles:


```js
const createVendorChunk = require('webpack-create-vendor-chunk');

module.exports = {
  entry: {
    one: 'app/one.js',
    two: 'app/two.js',
  },

  output: {
    path: 'public/',
    filename: '[name].bundle.js'
  },

  plugins: [
    createVendorChunk({
      name: 'one.vendor',
      chunks: ['one'],
    }),

    createVendorChunk({
      name: 'two.vendor',
      chunks: ['two'],
    })
  ],
};
```

Will create `public/one.vendor.bundle.js` and `public/two.vendor.bundle.js` containing the vendored dependencies for each entry point.

## Todo

- [ ] Common bundle for dependencies shared by multiple entry points (not sure if this is possible)
- [ ] Configure vendored folders
