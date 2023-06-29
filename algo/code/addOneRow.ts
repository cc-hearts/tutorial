import { TreeNode } from './trie/trieClass'

/**
 * @author heart
 * @description
 * @Date 2022-08-05
 * @see https://leetcode.cn/problems/add-one-row-to-tree/
 */

/**
 * 给定整数 depth，对于深度为 depth - 1 的每个非空树节点 cur ，创建两个值为 val 的树节点作为 cur 的左子树根和右子树根。
 * cur 原来的左子树应该是新的左子树根的左子树。
 * cur 原来的右子树应该是新的右子树根的右子树。
 * 如果 depth == 1 意味着 depth - 1 根本没有深度，那么创建一个树节点，值 val 作为整个原始树的新根，而原始树就是新根的左子树。
 */
export function addOneRow(
  root: TreeNode | null,
  val: number,
  depth: number
): TreeNode | null {
  // bfs 遍历递归题目
  if (!root) return null
  if (depth === 1) {
    const node = new TreeNode(val, root)
    return node
  }
  let count = 1
  // depth === 2
  const queue: TreeNode[] = [] // 存储树节点的值
  queue.push(root)
  while (queue.length > 0) {
    // 获取层级递归
    const length = queue.length
    for (let i = 0; i < length; i++) {
      const value: TreeNode = queue.shift()!
      if (count === depth - 1) {
        // 获取当前的节点的左子树和右子树
        const leftNode = new TreeNode(val, value?.left, null)
        const rightNode = new TreeNode(val, null, value?.right)
        if (value) {
          value.left = leftNode
          value.right = rightNode
        }
      }
      if (value.left) queue.push(value.left)
      if (value.right) queue.push(value.right)
    }
    if (count === depth - 1) break
    count++
  }
  return root
}
