const path=require('path');
const extractTextPlugin=require('extract-text-webpack-plugin');
const htmlPlugin=require('html-webpack-plugin');
module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/bundle.js',
        // publicPath:'http://10.66.103.9:1717/'
    },
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true, //服务端压缩是否开启
        port:1717
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // use:['style-loader','css-loader'],
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    }
                ]
                // use:extractTextPlugin.extract({
                //     fallback:'style-loader',
                //     use:'css-loader'
                // })//css分离
            },
            {
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500,
                        outputPath:'images/'
                    }
                }]
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader:'style-loader'
                    },{
                        loader:'css-loader'
                    },{
                        loader:'less-loader'
                    }
                ]
            }
        ]
    },
    plugins:[
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true//是对html文件进行压缩
            },
            hash:true,//为了开发中js有缓存效果
            template:'./src/index.html'
        }),
        // new extractTextPlugin('css/index.css')//css分离
    ],
};