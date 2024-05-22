export interface MkcertPluginInterface {
  manifestPath: string
  include?: string[]
  exclude?: string[]
}

export interface PluginOptions {
  outputDir: string
  key: string
  cert: string
  hosts?: string[]
  force?: boolean
  autoUpgrade?: boolean
}

export interface CreateCertificateOptions {
  autoUpgrade: boolean
  certFilePath: string
  force: boolean
  keyFilePath: string
}

export interface GitHubData {
  name: string
  tag_name: string
  assets: Array<{name: string; browser_download_url: string}>
}
