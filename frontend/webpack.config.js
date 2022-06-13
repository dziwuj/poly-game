var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path")

module.exports = {
    entry: {
        game: "./src/routes/game.js",
        utility: './src/routes/utility.js',
        rooms: './src/routes/rooms.js',
        lobby: './src/routes/lobby.js',
        scoreboard: './src/routes/scoreboard.js',
        settings: './src/routes/settings.js'
    },
    output: {
        filename: 'js/[name].js', // bundle.js to wynik kompilacji projektu przez webpacka
        path: path.join(__dirname, "../dist")
        // sourceMapFilename: "./js/[name].js.map",
    },
    // devtool: "source-map",
    mode: 'development', // none, development, production
    devServer: {
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            title: "menu",
            template: './src/html/index.html',
            chunks: ['utility'],

        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'game.html',
            title: "game",
            template: './src/html/game.html',
            chunks: ['game'],

        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'settings.html',
            title: "settings",
            template: './src/html/settings.html',
            chunks: ['utility', 'settings'],

        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'scoreboard.html',
            title: "scoreboard",
            template: './src/html/scoreboard.html',
            chunks: ['utility', 'scoreboard'],

        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'rules.html',
            title: "rules",
            template: './src/html/rules.html',
            chunks: ['utility'],

        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'rooms.html',
            title: "rooms",
            template: './src/html/rooms.html',
            chunks: ['utility', 'rooms'],

        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'lobby.html',
            title: "lobby",
            template: './src/html/lobby.html',
            chunks: ['utility', 'lobby'],

        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: 'head', // insert style tag inside of <head>
                            injectType: 'singletonStyleTag' // this is for wrap all your style in just one style tag
                        },
                    },
                    "css-loader"
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'assets/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(glb|gltf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'models'
                    }
                }]
            }
        ],

    },
};