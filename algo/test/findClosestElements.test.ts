import { findClosestElements } from '../code/findClosestElements'
import { it, expect } from 'vitest'
it('case ', () => {
  expect(findClosestElements([1, 2, 3, 4, 5], 4, 3)).toEqual([1, 2, 3, 4])
  expect(findClosestElements([0, 1, 1, 1, 2, 3, 6, 7, 8, 9], 9, 4)).toEqual([
    0, 1, 1, 1, 2, 3, 6, 7, 8,
  ])
  expect(findClosestElements([-2, -1, 1, 2, 3, 4, 5], 7, 3)).toEqual([
    -2, -1, 1, 2, 3, 4, 5,
  ])
  expect(findClosestElements([1, 1, 1, 10, 10, 10], 1, 9)).toEqual([10])
})
