const path = require("path"),
CleanWebpackPlugin = require("clean-webpack-plugin"),
HtmlWebpackPlugin = require("html-webpack-plugin");
// MiniCssExtractPlugin = require("mini-css-extract-plugin"),
// ExtractTextPlugin = require("extract-text-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production'
// const extractCSS = new ExtractTextPlugin("style.bundle.css");

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
  
// const CSSLoader = {
//     test: /\.css$/,
//     use: extractCSS.extract([
//         // MiniCssExtractPlugin.loader,
//         // "css-hot-loader",
//         // "style-loader",
//         "css-loader",
//         {
//             loader: "postcss-loader",
//             options: {
//                 config: {
//                     path: __dirname + "/postcss.config.js"
//                 }
//             }
//         }
//     ])
// }

const ImageLoader = {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
        {
            loader: "file-loader"
        }
    ]
}

module.exports = env => {
    return {
        entry: ["babel-polyfill", "./src/index.js"],
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "bin"),
            // publicPath: "dist/"
        },
        devtool: "source-map",
        module: {
            rules: [
                // CSSLoader,
                JSLoader,
                // ESLintLoader,
                ImageLoader
            ]
        },
        plugins: [
            // extractCSS,
            new CleanWebpackPlugin(["bin"]),
            new HtmlWebpackPlugin({
                title: `Streaming`,
                template: "src/index.html"
            })
        ]
    }
}