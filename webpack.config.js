var config = {
   entry: './client/index.js',
  
   output: {
      path:'./public/',
      filename: 'index.js',
   },
  
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
               presets: ['es2015', 'react']
            }
         },
         { 
           test: /\.css$/, 
           loader: 'style-loader!css-loader'
         }
         ,
         {
           test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
           loader: 'url-loader?limit=10000&mimetype=application/font-woff'
         },
         {
           test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
           loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
         },
         {
           test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
           loader: 'file-loader'
         },
         {
           test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
           loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
         }
      ]
   }
}

module.exports = config;