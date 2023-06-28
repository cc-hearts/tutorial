import { readFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { getMarkdownPath } from './shard.js'

const filePath = 'docs/configuration'
const excludeFileName = ['index.md']

export function readYamlFontMatterTitle(path: string) {
  let ctx = readFileSync(path, 'utf-8')
  const matchYamlFontMatter = /---([\s\S]*)---/
  const matchTitle = /title\:/g

  const matcher = ctx.match(matchYamlFontMatter)

  if (matcher) {
    const yamlList = matcher[1].split('\n').filter((val) => val)

    for (let each of yamlList) {
      if (matchTitle.test(each)) {
        return each.split(':')[1].trim()
      }
    }
  }
  return null
}

async function readMdFileName(path: string) {
  const fileList = await getMarkdownPath(path)
  const markDownNames: string[] = []

  fileList.forEach((each) => {
    if (/\.md$/.test(each)) {
      const [fileName] = each.split('/').slice(-1)
      if (fileName && !excludeFileName.includes(fileName))
        markDownNames.push(each)
    }
  })

  return markDownNames
}

/**
 * 这里的path 只用于一个文件夹
 * @param {string} dirPath
 */
async function generateToc(dirPath: string) {
  const mdNames = await readMdFileName(dirPath)
  return mdNames
    .map((mdName) => {
      const title = readYamlFontMatterTitle(mdName)
      return `- [${title}](.${mdName.replace(
        resolve(process.cwd(), filePath),
        ''
      )})`
    })
    .join('\n')
}

const dirPath = resolve(fileURLToPath(import.meta.url), '../..', filePath)

console.log(await generateToc(dirPath))
