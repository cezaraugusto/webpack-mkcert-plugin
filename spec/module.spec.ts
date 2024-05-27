import fs from 'fs'
import path from 'path'
import webpack from 'webpack'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const outputDir = path.resolve(
  process.cwd(),
  'demo/secure-server/dist/cert-custom-path'
)
const cert = 'my-custom-dev.cert'
const key = 'my-custom-dev.key'

jest.setTimeout(60000) // Increase the timeout to 60 seconds

describe('webpack-mkcert-plugin', () => {
  let compiler: webpack.Compiler

  beforeAll((done) => {
    const webpackConfig = require(
      path.resolve(process.cwd(), 'demo/secure-server/webpack.config.js')
    )
    compiler = webpack(webpackConfig)
    compiler.run((err, stats) => {
      if (err || stats?.hasErrors()) {
        console.error(err || stats?.toJson().errors)
        done.fail('Webpack build failed')
      } else {
        done()
      }
    })
  })

  afterAll((done) => {
    if (compiler) {
      compiler.close((closeErr) => {
        if (closeErr) {
          console.error(closeErr)
          done.fail('Webpack close failed')
        } else {
          done()
        }
      })
    } else {
      done()
    }
  })

  test('should output certificate files', async () => {
    const certPath = path.join(outputDir, cert)
    const keyPath = path.join(outputDir, key)

    await delay(10000) // Wait for 5 seconds

    expect(fs.existsSync(certPath)).toBe(true)
    expect(fs.existsSync(keyPath)).toBe(true)
  })

  test('certificate files should contain expected strings', async () => {
    const certPath = path.join(outputDir, cert)
    const keyPath = path.join(outputDir, key)

    await delay(10000) // Wait for 5 seconds

    const certContent = fs.readFileSync(certPath, 'utf-8')
    const keyContent = fs.readFileSync(keyPath, 'utf-8')

    expect(certContent).toContain('-----BEGIN CERTIFICATE-----')
    expect(keyContent).toContain('-----BEGIN PRIVATE KEY-----')
  })
})
