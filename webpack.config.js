const 
devMode = process.env.NODE_ENV !== 'production',
path = require("path"),
CleanWebpackPlugin = require("clean-webpack-plugin"),
HtmlWebpackPlugin = require("html-webpack-plugin"),
ExtractTextPlugin = require("extract-text-webpack-plugin");

const JSLoader = {
    test: /\.js$/,
    exclude: [/node_modules/, /bin/],
    use: {
        loader: "babel-loader",
        options: {
            presets: ["env"]
        }
    }
};

const ESLintLoader = {
    test: /\.js$/,
    enforce: 'pre',
    exclude: [/node_modules/, /bin/],
    use: {
        loader: 'eslint-loader',
        options: {
            configFile: __dirname + '.eslintrc'
        },
    }
};
  
const SCSSLoader = {
    test: /\.s[ca]ss$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
            "css-loader",
            "sass-loader"
        ]
    })
}

const ImageLoader = {
    test: /\.(png|jpg|gif)$/,
    use: [
        {
            loader: "file-loader"
        }
    ]
}

const FontLoader = {
    test: /\.(ttf|woff(2)?|svg|eot)$/,
    use: [
        {
            loader: "file-loader",
            options: {
                name: "[name].[ext]",
                outputPath: "fonts"
            }
        }
    ]
}

module.exports = env => {
    return {
        entry: {
            "app": "./src/app/index.js",
            "stream": "./src/stream/index.js"
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "build")
        },
        devtool: "source-map",
        module: {
            rules: [
                SCSSLoader,
                JSLoader,
                // ESLintLoader,
                ImageLoader,
                FontLoader
            ]
        },
        plugins: [
            new ExtractTextPlugin("[name].css"),
            new CleanWebpackPlugin(["build"]),
            new HtmlWebpackPlugin({
                title: `Streaming`,
                chunks: ["app"],
                template: "./src/index.html",
                filename: "./app.index.html"
            }),
            new HtmlWebpackPlugin({
                title: `Streaming`,
                chunks: ["stream"],
                template: "./src/index.html",
                filename: "./stream.index.html"
            })
        ]
    }
}