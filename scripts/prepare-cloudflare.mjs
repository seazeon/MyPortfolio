import { cp, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const clientDirectory = 'dist/client'
const publishDirectory = 'dist'

for (const entry of await readdir(clientDirectory)) {
  await cp(join(clientDirectory, entry), join(publishDirectory, entry), {
    recursive: true,
    force: true,
  })
}

console.log('Cloudflare output prepared in both dist and dist/client')
