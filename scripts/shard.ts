import {glob} from 'glob'
import { resolve } from 'path'

export function getMarkdownPath(filePath: string): Promise<Array<string>> {
  return new Promise(async (res) => {

    const path = resolve(process.cwd(), filePath, '**/*.{md,}')
    try {
      console.log(path);
      const files = await glob(path)
      res(files)
    } catch(e) {
      console.log('error', e);
    }
  })
}
