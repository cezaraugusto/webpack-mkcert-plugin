import fs from 'fs'
import path from 'path'
import {PluginOptions} from './types'
import Mkcert from './binary/mkcert'
import * as messages from './messages'
import {Compiler} from 'webpack'

const DEFAULT_OUTPUT_DIR = path.resolve(__dirname, 'certs')
const DEFAULT_HOSTS = ['localhost']
const DEFAULT_KEY_FILENAME = 'dev.key'
const DEFAULT_CERT_FILENAME = 'dev.cert'
const DEFAULT_AUTO_UPGRADE = false
const DEFAULT_FORCE = false

export default class MkcertWebpackPlugin {
  private readonly options: PluginOptions

  // @ts-ignore
  constructor(options: PluginOptions = {} as any) {
    this.options = {
      hosts: options.hosts || DEFAULT_HOSTS,
      key: options.key || DEFAULT_KEY_FILENAME,
      cert: options.cert || DEFAULT_CERT_FILENAME,
      outputDir: options.outputDir || DEFAULT_OUTPUT_DIR,
      autoUpgrade: options.autoUpgrade || DEFAULT_AUTO_UPGRADE,
      force: options.force || DEFAULT_FORCE
    }
  }

  private async ensureCertificates() {
    const {force, key, cert, hosts, outputDir} = this.options
    const certPath = path.join(outputDir, cert)
    const keyPath = path.join(outputDir, key)

    const isFirstInstall = !fs.existsSync(certPath) && !fs.existsSync(keyPath)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {recursive: true})
    }

    if (isFirstInstall) {
      console.log(messages.isFirstInstall())
      console.log(messages.maybeSudoApprove())
    }

    if (!isFirstInstall && !force) {
      // No need to install the certificate. User has it already.
      // We should proceed only if force option is enabled.
      // if (process.env.EXTENSION_ENV === 'development') {
        console.log(messages.installationFilesFound(cert, key, outputDir))
      // }
      return
    }

    try {
      const mkcert = new Mkcert(this.options)
      await mkcert.installCertificate(hosts || [])

      console.log(
        messages.certificateCreatedSuccessfully(
          cert.toString(),
          key.toString(),
          outputDir
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  public apply(compiler: Compiler) {
    compiler.hooks.afterCompile.tapPromise('MkcertWebpackPlugin', async () => {
      try {
        await this.ensureCertificates()
      } catch (error) {
        console.error(error)
      }
    })
  }
}
