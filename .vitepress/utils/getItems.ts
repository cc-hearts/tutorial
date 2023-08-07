import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
export async function getDirectory(path: string = '') {
  const filterDirNames = ['docs', 'node_modules']
  let dirs = await readdir(join(process.cwd(), path), { withFileTypes: true })
  return dirs
    .filter((dir) => dir.isDirectory())
    .filter(
      (dir) => !dir.name.startsWith('.') || filterDirNames.includes(dir.name)
    )
}
export async function getItems() {
  const dirs = await getDirectory()
  return dirs.map((val) => ({ text: val.name, link: `/${val.name}/README.md` }))
}
