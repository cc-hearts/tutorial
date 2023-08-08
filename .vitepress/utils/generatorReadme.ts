import { readFile, readdir, writeFile } from 'node:fs/promises'
import { basename, dirname, join, relative } from 'node:path'
import { glob } from 'glob'
import { getDirectory } from './getItems.js'
import matter from 'gray-matter'
import { existsSync } from 'node:fs'
async function getFilesByPath(path: string) {
  return await glob(`${path}/**/*.md`, {
    ignore: '**/{README,index}.md',
  })
}

async function getTitle(path: string) {
  const md = await readFile(path, 'utf-8')
  const { data } = matter(md)
  if (typeof data === 'string') return data
  if (data.title) return data.title
  const filename = basename(path)
  return filename.split('.md')[0]
}

async function grepMdFile(path: string) {
  const filesPath = await getFilesByPath(path)
  const fileInfo = await Promise.all(
    filesPath.map(async (filePath) => {
      const relativePath = getRelativePath(filePath, path)
      const title = await getTitle(filePath)
      return { path: relativePath, title }
    })
  )
  const ctx = fileInfo.map((item) => `- [${item.title}](${item.path})`)
  const [titleName] = path.split('/').slice(-1)
  const md =
    `---
title: ${titleName}
---` +
    '\n' +
    ctx.join('\n')
  return md
}

function getRelativePath(curPath: string, rootPath: string) {
  return `./${relative(rootPath, curPath)}`
}
async function write(path: string, ctx: string) {
  await writeFile(path, ctx)
  console.log(`write ${path} success`)
}
async function generatorMarkdownReadMe() {
  const dirs = await getDirectory()

  dirs.forEach(async (dir) => {
    const md = await grepMdFile(join(process.cwd(), dir.name))
    write(join(process.cwd(), dir.name, 'README.md'), md)
  })
}
generatorMarkdownReadMe()

async function getSecondContent(path: string) {
  const filesPath = await getFilesByPath(path)
}

async function recursiveDir(path: string, filterNames = ['README.md']) {
  const dirs = await readdir(path, { withFileTypes: true })
  const files = dirs
    .filter((dir) => !dir.isDirectory())
    .filter((dir) => filterNames.includes(dir.name))
  const categories = dirs.filter((dir) => dir.isDirectory())
}
