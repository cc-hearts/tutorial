/**
 * @author heart
 * @description
 * @Date 2022-07-31
 */

import { TreeNode } from './trie/trieClass'
function maxLevelSum(root: TreeNode | null): number {
  let result = -Infinity
  if (!root) return result
  // 深度优先遍历
  const countTreeNode: TreeNode[] | null = []
  countTreeNode.push(root)
  let num = 1
  let resultNum = 1
  while (countTreeNode.length > 0) {
    let length = countTreeNode.length
    let counts = 0
    while (length > 0) {
      const node = countTreeNode.shift()!
      counts += node.val
      if (node.left) {
        countTreeNode.push(node.left)
      }
      if (node.right) {
        countTreeNode.push(node.right)
      }
      length--
    }
    console.log(result, counts)
    if (result < counts) {
      resultNum = num
      result = counts
    }
    num++
  }
  return resultNum
}
