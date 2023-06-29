function validateStackSequences(pushed: number[], popped: number[]): boolean {
  const stack: number[] = []
  let count = 0
  while (pushed.length > 0) {
    const ans = pushed.shift()!
    if (count < popped.length && ans === popped[count]) {
      count++
      while (stack.length > 0) {
        if (stack[stack.length - 1] === popped[count]) {
          count++
          stack.pop()
        } else break
      }
      continue
    }
    ans !== undefined && stack.push(ans)
  }
  return stack.length === 0
}

// console.log(validateStackSequences([2, 0, 1], [1, 0, 2]))
// console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]))
