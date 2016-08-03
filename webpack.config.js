var webpack = require('webpack');
module.exports = {

    entry: './index.js',
    module: {
        loaders: [{
            test: /\.js/,

            exclude: [
                /node_modules/,
                /bower_components/
            ],

            loader: "babel-loader"

        }]
    },
    output: {
        path: './dist',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            

            output: {
                comments: false
            }



        })

    ]

};
