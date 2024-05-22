import fs from 'fs'
import path from 'path'
import requestFromGithub from './request-from-github'
import * as messages from '../messages'

export default async function downloadBinary(
  downloadUrl: string,
  binaryOutputPath: string
) {
  console.log(messages.downloadingMkcert(downloadUrl))

  const data = await requestFromGithub({
    url: downloadUrl,
    headers: {},
    responseType: 'arrayBuffer'
  })

  // Create the directory if it doesn't exist.
  const dirPath = path.dirname(binaryOutputPath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {recursive: true})
  }

  // Write the file to the specified path.
  fs.writeFileSync(binaryOutputPath, data as Buffer)
  fs.chmodSync(binaryOutputPath, 0o777)

  console.log(messages.mkcertSavedSuccessfully(binaryOutputPath))
}
