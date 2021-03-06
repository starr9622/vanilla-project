let path = require('path');

module.exports = {
    mode: "development",
    entry : "./src/index.js",
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist"
    },
    module:{
        rules:[{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use:{
                loader: 'babel-loader',
                options :{
                    presets: [
                        ['@babel/preset-env',{
                            "targets":{
                                'browsers' : ["last 2 versions", "ie 9"]
                            },
                            // "debug" : true
                        }]
                    ]
                }
            }
        }]
    }
}