import { describe, expect, it } from "vitest";
import { getMarkdownPath } from '../shard'
import { resolve } from "path";

describe('get markdown file path', () => {
  it('get test file path when path is mockFile ', async () => {
    const filePath = await getMarkdownPath('scripts/test/mockFile/')
    expect(filePath).toEqual([resolve(process.cwd(), 'scripts/test/mockFile/test.md')])
  })
})
