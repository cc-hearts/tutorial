const { fourSumCount } = require('../code/fourSumCount')

it('case 1', () => {
  expect(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2])).toBe(2)
})

it('case 2', () => {
  expect(fourSumCount([1], [-1], [0], [1])).toBe(0)
})

it('case 3', () => {
  expect(fourSumCount([-1, -1], [-1, 1], [-1, 1], [1, -1])).toBe(6)
})
