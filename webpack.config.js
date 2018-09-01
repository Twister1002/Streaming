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
  
const SCSSLoader = {
    test: /\.(sc|sa)ss$/,
    use: [
        "style-loader",
        "css-loader",
        "sass-loader"
    ]
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
        entry: ["./src/index.js"],
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "bin"),
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
            // extractCSS,
            new CleanWebpackPlugin(["bin"]),
            new HtmlWebpackPlugin({
                title: `Streaming`,
                template: "src/index.html"
            })
        ]
    }
}