import { cp, readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

const clientDirectory = 'dist/client'
const publishDirectory = 'dist'

const externallyHostedAssets = [
  'projects/mine/demo.mp4',
  'projects/glitch-code/demo.mp4',
]

for (const asset of externallyHostedAssets) {
  await rm(join(clientDirectory, asset), { force: true })
  await rm(join(publishDirectory, asset), { force: true })
}

for (const entry of await readdir(clientDirectory)) {
  await cp(join(clientDirectory, entry), join(publishDirectory, entry), {
    recursive: true,
    force: true,
  })
}

console.log('Cloudflare output prepared in both dist and dist/client')
