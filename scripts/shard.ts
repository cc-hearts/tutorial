import { glob } from 'glob'
import { resolve } from 'path'

export async function getMarkdownPath(filePath: string): Promise<Array<string>> {
  const path = resolve(process.cwd(), filePath, '**/*.{md,}')
  try {
    const files = await glob(path)
    return files
  } catch (e) {
    console.log('error', e);
  }
}
