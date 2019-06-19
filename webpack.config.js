const path = require('path');

module.exports = {
  entry: "./src/index.jsx",
  output: {
    publicPath: '/public/',
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },

  // devServer: {
  //   inline: true,
  //   port: 8082
  // },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "awesome-typescript-loader"
          },

          {
            test: /jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/env', '@babel/react'],
            }
          },

          {
            test:/\.css$/, 
            use: ['style-loader', 'css-loader']
          },

          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
          },
      ]
  },
  node: {
    fs: "empty"
 }
};