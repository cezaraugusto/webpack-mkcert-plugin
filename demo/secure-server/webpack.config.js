const path = require('path')
const MkcertWebpackPlugin = require('../../dist/module').default

module.exports = {
  mode: 'development',
  entry: './index.ts',
  context: path.resolve(__dirname),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: require.resolve('ts-loader'),
        exclude: /node_modules/,
        options: {
          // Skip type checking for test builds.
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new MkcertWebpackPlugin({
      // The directory where the generated files will be stored.
      // Defaults to ./certs.
      outputDir: path.join(__dirname, './dist/cert-custom-path'),
      // The name of the certificate file.
      // An absolute path can also be provided.
      // Defaults to dev.cert.
      cert: 'my-custom-dev.cert',
      // The name of the key file.
      // An absolute path can also be provided.
      // Defaults to dev.key.
      key: 'my-custom-dev.key',
      // A list of custom hosts to include in the certificate.
      // Defaults to ['localhost'] plus the local IP addresses.
      hosts: ['localhost', 'my-site.local'],
      // If set to true, forces the regeneration of the certificate
      // files even if they already exist. Defaults to false.
      force: true,
      // If set to true, automatically upgrades the mkcert binary to
      // the latest version before generating certificates. Defaults to false.
      autoUpgrade: true
    })
  ]
}
