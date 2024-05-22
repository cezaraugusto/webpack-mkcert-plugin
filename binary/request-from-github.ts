import https from 'https'
import * as messages from '../messages'

const MAX_REDIRECTS = 5

interface RequestOptions {
  url: string
  headers?: Record<string, string>
  responseType: 'json' | 'arrayBuffer'
  redirectAttempts?: number
}

interface GitHubData {
  name: string
  tag_name: string
  assets: Array<{name: string; browser_download_url: string}>
}

export default async function requestFromGitHub({
  url,
  headers,
  responseType,
  redirectAttempts = 0
}: RequestOptions): Promise<GitHubData | Buffer> {
  const packageJson = require('../package.json')

  return await new Promise((resolve, reject) => {
    const responseBuffer: Uint8Array[] = []

    const request = https.get(
      url,
      {
        headers: {
          'User-Agent': `webpack-mkcert-plugin/v${packageJson.version}`,
          Accept: 'application/json, text/plain, */*',
          ...headers
        },
        timeout: 10000
      },
      (response) => {
        const {headers: resHeaders, statusCode} = response

        // Handle redirects.
        if (
          statusCode &&
          resHeaders.location &&
          statusCode >= 300 &&
          statusCode <= 399
        ) {
          if (redirectAttempts >= MAX_REDIRECTS) {
            reject(new Error(messages.tooManyRedirects(MAX_REDIRECTS, url)))
            return
          }

          requestFromGitHub({
            url: resHeaders.location,
            headers,
            responseType,
            redirectAttempts: redirectAttempts + 1
          })
            .then(resolve)
            .catch(reject)
          return
        }

        response.on('data', (chunk: Uint8Array) => {
          responseBuffer.push(chunk)
          if (url.includes('/download/')) {
            messages.onDataMsg(chunk)
          }
        })

        response.on('end', () => {
          const arrayBuffer = Buffer.concat(responseBuffer)

          switch (responseType) {
            case 'json':
              try {
                const jsonResponse = JSON.parse(arrayBuffer.toString())
                resolve(jsonResponse as GitHubData)
              } catch (error: any) {
                reject(
                  new Error(`Failed to parse JSON response: ${error.message}`)
                )
              }
              break
            case 'arrayBuffer':
              resolve(arrayBuffer)
              break
            default:
              reject(new Error(`Unsupported response type: ${responseType}`))
          }
        })

        response.on('error', (error) => {
          reject(new Error(`Request failed: ${error.message}`))
        })
      }
    )

    request.on('timeout', () => {
      request.destroy()
      reject(new Error('Request timed out'))
    })

    request.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`))
    })
  })
}
