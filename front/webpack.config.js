const path = require('path');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    NODE_MODULES: path.resolve(__dirname, 'node_modules'),
    AP_FLUX: path.resolve(__dirname, 'node_modules/ap-flux'),
    AP_REACT_BOOTSTRAP: path.resolve(__dirname, 'node_modules/ap-react-bootstrap'),
    SRC: path.resolve(__dirname, 'src')
}

const webpack = require('webpack');

module.exports = {

    entry: path.join(paths.SRC, 'index.jsx'),

    output: {
        path: paths.DIST,
        filename: 'auxpro.bundle.js'
    },

    plugins: [
         new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ],

    devServer: {
        host: '0.0.0.0',
		historyApiFallback: true,
        port: 8080
    },

    resolve: {
        modules: ['node_modules', './src'],
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    paths.SRC,
                    paths.AP_FLUX,
                    paths.AP_REACT_BOOTSTRAP
                ],
                use: [ 'babel-loader' ]
            },
            { 
                test: /node_modules\/jquery\/.+\.(jsx|js)$/,
                loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
            },
            { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            },
            { 
                test: /\.scss$/, 
                loader: 'style-loader!css-loader!sass-loader'
            },
            { 
                test: /\.(png|jpg)$/, 
                loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?mimetype=application/vnd.ms-fontobject'
            },
            {
                test: /\.woff/,
                loader: 'url-loader?mimetype=application/font-woff'
            }, {
                test: /\.woff2/,
                loader: 'url-loader?mimetype=application/font-woff2'
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?mimetype=application/x-font-ttf'
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
  },
};
