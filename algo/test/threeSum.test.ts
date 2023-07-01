import { threeSum } from '../code/threeSum'
import { it, expect } from 'vitest'
it('case 1', () => {
  expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([
    [-1, -1, 2],
    [-1, 0, 1],
  ])
})

it('case 2 [0,1,1]', () => {
  expect(threeSum([0, 1, 1])).toEqual([])
})

it('case 3 [0,0,0]', () => {
  expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]])
})
