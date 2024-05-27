import path from 'path'
import {bold, italic, underline} from '@colors/colors/safe'

export function installationFilesFound(
  cert: string,
  key: string,
  outputDir: string
) {
  return (
      `\nRunning secure local connection via ${bold('mkcert')}. ` +
      `Certificate files found:\n` +
      `├─ ${underline(path.join(outputDir, cert))}\n` +
      `└─ ${underline(path.join(outputDir, key))}`
  )
}

export function certificateCreatedSuccessfully(
  cert: string,
  key: string,
  outputDir: string
) {
  return (
    `\nSuccess! ${bold('cert')} and ${bold('key')} files successfuly created:\n` +
    `├─ ${underline(path.join(cert.startsWith('/') ? '' : outputDir, cert))}\n` +
    `└─ ${underline(path.join(key.startsWith('/') ? '' : outputDir, key))}`
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

export function isFirstInstall() {
  return (
    `\nThis installation requires a secure local connection. ` +
    `Generating a new localhost certificate via ${bold('mkcert')}...`
  )
}

export function maybeSudoApprove() {
  return (
    `\nNote that certificate installations need manual user approval.\n` +
    `If your system prompts for a password, please enter it to continue.\n` +
    `This is a required step to install the certificate into your keychain.\n\n` +
    `Read more about this process at ${underline('https://github.com/FiloSottile/mkcert')}.`
  )
}

export function noVersionMkcertNotFound() {
  return `Could not get current version. ${bold(bold('mkcert'))} does not exist.`
}

export function noGenerateMkcertNotFound(names: string) {
  return `Could not generate certificate for ${names}. ${bold(bold('mkcert'))} does not exist.`
}

export function mkcertIsRunning() {
  return `Found ${bold(bold('mkcert'))} binary. Running...`
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
