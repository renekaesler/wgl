const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './showcase/index.js',
  devServer: {
    contentBase: `${__dirname}/showcase`
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vert|frag)$/,
        loader: 'shader-loader',
        options: {
          glsl: {
            chunkPath: `${__dirname}/src/shader/glsl`
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'showcase/index.html' })
  ]
};