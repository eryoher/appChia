module.exports = {
  entry : {
    app: './src/index.js'
  },
  output:{
    path: __dirname + '/build',
    filename:'bundle.js',
    publicPath: '/'
  },
  resolve:{
    extensions: ['.jsx', '.js']
  },
  devtool: 'source-map',
  devServer:{
    host:'192.168.0.100',
    port: 8081,
    inline: true,
    historyApiFallback: true,
    contentBase: './',
    https: false
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      },
      {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192'
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.woff2$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/octet-stream' },
      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=image/svg+xml' }
    ]
  }
}
