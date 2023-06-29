import { TreeNode } from './trie/trieClass'

function deepestLeavesSum(root: TreeNode | null): number {
  let result = 0
  if (!root) return result
  // 二叉树的层级遍历
  let array: TreeNode[] = []
  array.push(root)
  while (array.length !== 0) {
    result = 0
    const length = array.length
    for (let i = 0; i < length; i++) {
      const data = array.shift()!
      if (data?.left) array.push(data.left)
      if (data?.right) array.push(data.right)
      result += data.val
    }
  }
  return result
}
