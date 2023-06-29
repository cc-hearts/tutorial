/**
 * @author heart
 * @description 因为 val会被加到数组末尾 因此他一定是一个右节点
 * @Date 2022-08-30
 */
import { TreeNode } from './trie/trieClass'
export function insertIntoMaxTree(
  root: TreeNode | null,
  val: number
): TreeNode | null {
  // 根据遍历root 获取最大的跟节点 与 val比较
  if (root === null) return null
  let preNode: TreeNode | null = root
  let result: TreeNode = root
  if (val > root.val) {
    // 以val为跟节点
    result = new TreeNode(val, root, null)
  } else {
    let rightNode = root.right
    if (rightNode === null) {
      root.right = new TreeNode(val, null, null)
    }
    while (rightNode !== null) {
      if (val > rightNode.val) {
        preNode.right = new TreeNode(val, rightNode, null)
        break
      } else if (rightNode.right === null) {
        rightNode.right = new TreeNode(val, null, null)
        break
      } else {
        preNode = rightNode
        rightNode = rightNode.right
      }
    }
  }
  return result
}
