[action-image]: https://github.com/cezaraugusto/webpack-mkcert-plugin/workflows/CI/badge.svg
[action-url]: https://github.com/cezaraugusto/webpack-mkcert-plugin/actions?query=workflow%3ACI
[npm-image]: https://img.shields.io/npm/v/webpack-mkcert-plugin.svg
[npm-url]: https://npmjs.org/package/webpack-mkcert-plugin

# webpack-mkcert-plugin [![workflow][action-image]][action-url] [![npm][npm-image]][npm-url]

> Use certificates that are trusted by your local machine, avoiding browser security warnings during development. 🤝

## What does this plugin do?

This plugin simplifies the process of setting up HTTPS for your webpack development server by automatically generating and managing SSL certificates using [mkcert](https://github.com/FiloSottile/mkcert).

## Install

```sh
npm install webpack-mkcert-plugin --save-dev
```

## Usage

Check the [demo](./demo) folder for a sample Webpack configuration.

```js
// webpack.config.js
const path = require('path')
const MkcertPlugin = require('webpack-mkcert-plugin')


module.exports = {
  // Optional: Allow external connections
  host: '0.0.0.0',
  server: {
    type: 'https',
    options: {
      key: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.key')),
      cert: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.cert'))
    }
  }
  // ...other webpack config,
  plugins: [
    // See below a list of all available options.
    new MkcertPlugin({
      outputDir: path.join(__dirname, 'certs'),
    })
  ]
}
```

## Options

```ts
new MkcertPlugin({
  // The directory where the generated files will be stored.
  // Defaults to ./certs.
  outputDir: path.join(__dirname, './dist/cert-custom-path'),
  // The name of the certificate file.
  // Defaults to dev.cert.
  cert: 'my-custom-dev.cert',
  // The name of the key file.
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
```

## License

MIT (c) Cezar Augusto.
