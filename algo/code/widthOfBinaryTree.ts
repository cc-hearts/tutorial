import { TreeNode } from './trie/trieClass'
/**
 * @author heart
 * @description
 * @Date 2022-08-27
 */
// 注意数据类型溢出的问题
export function widthOfBinaryTree(root: TreeNode | null): number {
  // 二叉树的层级遍历
  // 先构造满二叉树
  // 之后层级计算宽度
  const list: Array<{ code: bigint; node: TreeNode }> = []
  if (root === null) return 0
  let ans = -1n
  list.push({ code: 1n, node: root })
  while (list.length > 0) {
    //
    let min: bigint = 0n,
      max: bigint = 0n
    const length = list.length
    for (let i = 0; i < length; i++) {
      const data = list.shift()!
      if (i === 0) {
        min = data?.code
      }
      if (i === length - 1) {
        max = data.code
      }
      if (data.node.left) {
        list.push({ code: 2n * data.code, node: data.node.left })
      }
      if (data.node.right) {
        list.push({ code: data.code * 2n + 1n, node: data.node.right })
      }
    }
    // ans = Math.max(ans, max - min + 1)
    if (max - min + 1n > ans) {
      ans = max - min + 1n
    }
  }
  return Number(ans)
}
