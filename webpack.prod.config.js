const webpack =  require('webpack');


/* This is a config file that handles compiling web workers and injecting them
 * into the public folder to be able to reference them at run time
 */

module.exports = {
    entry: {
      averageColorsWorker: __dirname+'/src/workers/averageColorsWorker.js',
      filtersWorker: __dirname+'/src/workers/filtersWorker.js'
    },
    output: {
        path: __dirname+'/public/workers',
        filename: "[name].js"
    },
    module: {
      loaders: [
          {
            test: /\.js$/,
            loader: "babel",
            query: {
            presets: ['env'],
            }
          }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
    ]
};
