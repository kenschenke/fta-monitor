const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new CopyWebpackPlugin([
            {from: './src/build/index.html', flatten:true},
            {from: './src/build/signalr.js', flatten:false}
        ])
    ],
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            // {
            //     test: /(\.html|\.txt)$/,
            //     loader: 'raw-loader'
            // }
        ]
    }
    // plugins: [
        // new CopyWebpackPlugin([
        //     {from: 'src/duxautocomplete.css', to: 'duxautocomplete.css', flatten:true}
        // ])
    // ]
};
