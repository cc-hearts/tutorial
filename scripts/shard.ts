import glob from 'glob'
import { resolve } from 'path'

export function getMarkdownPath(filePath: string): Promise<Array<string>> {
  return new Promise((res) => {
    const path = resolve(process.cwd(), filePath, '**/*.{md,}')
    glob(path, (err, files) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(`${path} is:`, files)
      res(files)
    })
  })
}
