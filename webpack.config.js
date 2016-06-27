module.exports = {
  entry: [
    './js/components/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  output: {
    filename: "bundle.js"
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    port: 3000,
    publicPath: '/',
  },
}