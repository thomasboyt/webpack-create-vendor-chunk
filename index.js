var webpack = require('webpack');
var path = require('path');
var cwd = process.cwd();

function isVendorPath(modulePath) {
  var vendorPaths = [
    path.resolve(cwd, 'node_modules'),
    path.resolve(cwd, 'vendor'),
  ];

  for (var i in vendorPaths) {
    if (modulePath.indexOf(vendorPaths[i]) === 0) {
      return true;
    }
  }

  return false;
}

function shouldVendor(module) {
  return module.resource &&
         isVendorPath(module.resource) &&
         // non-js output isn't vendored because this could potentially interfere with
         // ExtractTextPlugin
         /\.js$/.test(module.resource);
}

function createVendorChunk(options) {
  return new webpack.optimize.CommonsChunkPlugin({
    name: options.name || 'vendor',
    chunks: options.chunks,
    minChunks: shouldVendor
  });
}

module.exports = createVendorChunk;
