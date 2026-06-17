[npm-version-image]: https://img.shields.io/npm/v/webpack-mkcert-plugin.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/webpack-mkcert-plugin
[npm-downloads-image]: https://img.shields.io/npm/dm/webpack-mkcert-plugin.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/webpack-mkcert-plugin
[action-image]: https://github.com/cezaraugusto/webpack-mkcert-plugin/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/webpack-mkcert-plugin/actions

> Use certificates for webpack that are trusted by your local machine, avoiding browser security warnings during development.

# webpack-mkcert-plugin [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

<img src="https://github.com/cezaraugusto/extension.js/assets/4672033/96a5be49-582b-49c1-ab6d-947f4d56255e">

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
