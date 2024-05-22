import requestFromGitHub from './request-from-github'
import * as messages from '../messages'
import {type GitHubData} from '../types'

function getPlatformId() {
  switch (process.platform) {
    case 'win32':
      return 'windows-amd64.exe'

    case 'linux':
      return process.arch === 'arm64'
        ? 'linux-arm64'
        : process.arch === 'arm'
          ? 'linux-arm'
          : 'linux-amd64'

    case 'darwin':
      return 'darwin-amd64'

    default:
      throw new Error('Unsupported platform')
  }
}

export default async function getBinaryData() {
  const requestOptions = {
    url: `https://api.github.com/repos/FiloSottile/mkcert/releases/latest`,
    headers: {Accept: 'application/vnd.github+json'},
    responseType: 'json' as 'json'
  }

  const data = (await requestFromGitHub(requestOptions)) as GitHubData
  const assetItems = data.assets.find(({name}) =>
    name.includes(getPlatformId())
  )
  const downloadUrl = assetItems?.browser_download_url
  const version = data.tag_name

  if (!(downloadUrl && version)) {
    console.error(messages.noNetworkConnection())
    return undefined
  }

  return {
    downloadUrl,
    version
  }
}
