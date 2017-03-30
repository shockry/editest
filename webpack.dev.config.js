const webpack =  require('webpack');


/* This is a config file that handles compiling web workers and injecting them
 * into the public folder to be able to reference them at run time
 */

// Note: Until we figure out a nicer way to handle web worker compilation,
// web worker files aren't being watched
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
    }
};
