/**
 * @author heart
 * @description
 * @Date 2022-09-02
 * @see https://leetcode.cn/problems/longest-univalue-path/
 */

import { TreeNode } from './trie/trieClass'

export function longestUnivaluePath(root: TreeNode | null): number {
  if (!root) return 0
  const map = new Map<number, number>()
  const mapSet = (key: number, value: number) => {
    if (map.has(key)) {
      map.set(key, Math.max(map.get(key)!, value))
    } else map.set(key, value)
  }
  const dfs = (node: TreeNode): [number, number] => {
    if (node.left === null && node.right === null) {
      return [node.val, 1]
    }
    let leftV = 1,
      rightV = 1,
      val = 1 // val 用于判断当前节点为跟节点的值
    if (node.left) {
      const [leftKey, leftValue] = dfs(node.left)
      if (leftKey === node.val) {
        // 相等 则 + 1
        leftV += leftValue
        val += leftValue
        mapSet(leftKey, leftValue)
      } else mapSet(leftKey, leftValue)
    }

    if (node.right) {
      const [rightKey, rightValue] = dfs(node.right)
      if (rightKey === node.val) {
        rightV += rightValue
        val += rightValue
        mapSet(rightKey, Math.max(leftV, rightV))
      } else mapSet(rightKey, rightValue)
    }
    mapSet(node.val, val)
    return [node.val, Math.max(leftV, rightV)]
  }

  const [rootKey, rootValue] = dfs(root)
  mapSet(rootKey, rootValue)

  let result = 0
  for (const [_, value] of map) {
    result = Math.max(value, result)
  } // Reflect.apply(map.set, null, [parentNumber, Math.max(count, map.has(parentNumber) ? Reflect.apply(map.get, null, ['parentNumber']) : count)])
  return result - 1
}

// 优化版本
export function longestUnivaluePath2(root: TreeNode | null): number {
  let max = 0
  const dfs = (root: TreeNode | null): number => {
    if (root === null) return 0
    // ans 作为返回 因此只能取值左右分支的最大值 cur 作为当前的最大节点数 则可以取左右分支总和 去与最大值比较
    let ans = 0,
      cur = 0,
      l = dfs(root.left),
      r = dfs(root.right)
    if (root.left && root.left.val === root.val) {
      ;(cur = l + 1), (ans = l + 1)
    }
    if (root.right && root.right.val === root.val) {
      cur += r + 1
      ans = Math.max(r + 1, ans)
    }
    max = Math.max(max, cur)
    return ans
  }
  dfs(root)
  return max
}
