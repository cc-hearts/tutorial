import { TreeNode } from './trie/trieClass'
/**
 * @author heart
 * @description https://leetcode.cn/problems/complete-binary-tree-inserter/
 * @Date 2022-07-25
 */

class CBTInserter {
  root: TreeNode
  constructor(root: TreeNode | null) {
    this.root = root || new TreeNode(0)
  }

  insert(val: number): number {
    // 层序遍历
    let queue: TreeNode[] = []
    queue.push(this.root)
    while (queue.length > 0) {
      const node = queue.shift()!
      if (node.left === null) {
        node.left = new TreeNode(val)
        return node.val
      } else queue.push(node.left)
      if (node.right === null) {
        node.right = new TreeNode(val)
        return node.val
      } else queue.push(node.right)
    }
    return -1
  }

  get_root(): TreeNode | null {
    return this.root
  }
}
