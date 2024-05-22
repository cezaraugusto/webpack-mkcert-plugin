import path from 'path'
import {bold, italic, underline} from '@colors/colors/safe'

export function filesAlreadyExist(
  cert: string,
  key: string,
  outputDir: string
) {
  return `Files "${bold(cert)}" and "${bold(key)}" found in ${underline(outputDir)}. Proceeding...`
}

export function certificateCreatedSuccessfully(
  cert: string,
  key: string,
  outputDir: string
) {
  return (
    `Success! ${bold('cert')} and ${bold('key')} files successfuly created:\n` +
    `├─ ${underline(path.join(cert.startsWith('/') ? '' : outputDir, cert))}\n` +
    `└─ ${underline(path.join(key.startsWith('/') ? '' : outputDir, key))}\n`
  )
}

export function startingMkcertDownload() {
  return `Starting ${bold(bold('mkcert'))} download...`
}

export function noDownloadInfoSkipInit() {
  return `Can't get download information for ${bold(bold('mkcert'))}. Skipping init step...`
}

export function upgradingMkcert() {
  return `${italic('autoUpgrade')} option is enabled. Upgrading ${bold(bold('mkcert'))}...`
}

export function noDownloadInfoSkipUpdate() {
  return `Could not get download information of ${bold(bold('mkcert'))}. Skipping update step...`
}

export function mkcertIsLatest(current: string) {
  return `${bold(bold('mkcert'))} is up-to-date @ v${bold(current)}.`
}

export function noNetworkConnection() {
  return (
    `Could not get remote ${bold(bold('mkcert'))} information. ` +
    `Ensure you are connected to the internet and try again.`
  )
}

export function forceCertRegenerate() {
  return `${italic('force')} option is enabled. Regenerating certificate...`
}

export function noVersionMkcertNotFound() {
  return `Could not get current version. ${bold(bold('mkcert'))} does not exist.`
}

export function noGenerateMkcertNotFound(names: string) {
  return `Could not generate certificate for ${names}. ${bold(bold('mkcert'))} does not exist.`
}

export function mkcertIsRunning(version: string) {
  return `Running ${bold(bold('mkcert'))}@${bold(version)}...`
}

export function tooManyRedirects(redirects: number, url: string) {
  return `Too many redirects (${bold(redirects.toString())}). Last URL: ${underline(url)}.`
}

export function onDataMsg(chunk: any) {
  return `on(data): ${chunk}`
}

export function downloadingMkcert(downloadUrl: string) {
  return `Downloading the ${bold(bold('mkcert'))} binary from ${underline(downloadUrl)}...`
}

export function mkcertSavedSuccessfully(filePath: string) {
  return `Download successful. ${bold(bold('mkcert'))} binary saved to ${underline(filePath)}`
}
