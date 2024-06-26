import os from 'os'
import fs from 'fs'
import path from 'path'
import {exec} from 'child_process'
import {type PluginOptions} from '../types'
import getBinaryData from './get-binary-data'
import downloadBinary from './download-binary'
import * as messages from '../messages'

const mkCert = process.platform === 'win32' ? 'mkcert.exe' : 'mkcert'
const DOWNLOADED_MKCERT_BINARY_PATH = path.resolve(__dirname, mkCert)

function getDefaultHosts() {
  const interfaceDict = os.networkInterfaces()
  const addresses: string[] = []

  for (const key in interfaceDict) {
    const interfaces = interfaceDict[key]

    if (interfaces) {
      for (const item of interfaces) {
        const family = item.family

        if (family === 'IPv4') {
          addresses.push(item.address)
        }
      }
    }
  }

  return ['localhost', ...addresses]
}

export default class Mkcert {
  private readonly options: PluginOptions

  constructor(options: PluginOptions) {
    this.options = options
  }

  private getBinary() {
    return fs.existsSync(DOWNLOADED_MKCERT_BINARY_PATH)
      ? DOWNLOADED_MKCERT_BINARY_PATH
      : undefined
  }
  private async downloadBinary() {
    messages.startingMkcertDownload()

    const sourceInfo = await getBinaryData()

    if (!sourceInfo || !sourceInfo?.downloadUrl) {
      console.error(messages.noDownloadInfoSkipInit())

      return
    }

    await downloadBinary(sourceInfo?.downloadUrl, DOWNLOADED_MKCERT_BINARY_PATH)
  }

  private async upgradeMkcertBinary() {
    console.log(messages.upgradingMkcert())

    const sourceInfo = await getBinaryData()

    if (!sourceInfo) {
      console.error(messages.noDownloadInfoSkipUpdate())

      return
    }
  }

  private async runBinary(userDefinedHosts: string[]) {
    if (!fs.existsSync(DOWNLOADED_MKCERT_BINARY_PATH)) {
      await this.downloadBinary()
    } else if (this.options.autoUpgrade) {
      await this.upgradeMkcertBinary()
    } else {
      console.log(messages.mkcertIsRunning())
    }

    const defaultHosts = getDefaultHosts()
    const definedHosts = [...new Set([...defaultHosts, ...userDefinedHosts])]
    const hosts = definedHosts.filter((item) => !!item)
    return hosts
  }

  private createCertificate(
    hosts: string[],
    keyPath: string,
    certPath: string
  ) {
    const names = hosts.join(' ')
    const mkcertBinary = this.getBinary()

    if (!mkcertBinary) {
      console.log(messages.noGenerateMkcertNotFound(names))

      process.exit(1)
    }

    if (!fs.existsSync(path.dirname(keyPath))) {
      fs.mkdirSync(path.dirname(certPath))
    }

    if (!fs.existsSync(path.dirname(certPath))) {
      fs.mkdirSync(path.dirname(certPath))
    }

    const cmd =
      `"${mkcertBinary}" -install ` +
      `-key-file "${keyPath}" ` +
      `-cert-file "${certPath}" ${names}`

    exec(cmd, {
      env: {
        ...process.env,
        JAVA_HOME: undefined
      }
    })
  }

  public async installCertificate(userDefinedHosts: string[]) {
    if (!fs.existsSync(this.options.outputDir)) {
      fs.mkdirSync(this.options.outputDir, {recursive: true})
    }

    const keyPath = path.resolve(this.options.outputDir, this.options.key)
    const certPath = path.resolve(this.options.outputDir, this.options.cert)

    const forceOptionEnabled = this.options.force
    const firstInstall = !(fs.existsSync(certPath) && fs.existsSync(keyPath))

    if (forceOptionEnabled) {
      console.log(messages.forceCertRegenerate())
    }

    if (firstInstall || forceOptionEnabled) {
      const hosts = await this.runBinary(userDefinedHosts)
      this.createCertificate(hosts, keyPath, certPath)
    }
  }
}
