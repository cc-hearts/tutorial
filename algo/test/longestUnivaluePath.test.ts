import { generatorTree } from '../code/trie/trieClass'
var {
  longestUnivaluePath,
  longestUnivaluePath2,
} = require('../code/longestUnivaluePath')

it('[5, 4, 5, 1, 1, null, 5]', () => {
  expect(longestUnivaluePath(generatorTree([5, 4, 5, 1, 1, null, 5]))).toEqual(
    2
  )
  expect(longestUnivaluePath2(generatorTree([5, 4, 5, 1, 1, null, 5]))).toEqual(
    2
  )
})

it('[1, 4, 5, 4, 4, 5]', () => {
  expect(longestUnivaluePath(generatorTree([1, 4, 5, 4, 4, 5]))).toEqual(2)
  expect(longestUnivaluePath2(generatorTree([1, 4, 5, 4, 4, 5]))).toEqual(2)
})

it('[1,null,1,1,1,1,1,1]', () => {
  expect(
    longestUnivaluePath(generatorTree([1, null, 1, 1, 1, 1, 1, 1]))
  ).toEqual(4)
})
