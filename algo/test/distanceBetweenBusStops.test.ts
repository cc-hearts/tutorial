var { distanceBetweenBusStops } = require('../code/distanceBetweenBusStops')

describe('distanceBetweenBusStops case', () => {
  it('distance = [1,2,3,4], start = 0, destination = 1', () => {
    expect(distanceBetweenBusStops([1, 2, 3, 4], 0, 1)).toBe(1)
  })
  it('distance = [1,2,3,4], start = 0, destination = 2', () => {
    expect(distanceBetweenBusStops([1, 2, 3, 4], 0, 2)).toBe(3)
  })
  it('distance = [1,2,3,4], start = 0, destination = 3', () => {
    expect(distanceBetweenBusStops([1, 2, 3, 4], 0, 3)).toBe(4)
  })
  it('[7, 10, 1, 12, 11, 14, 5, 0], 7, 2', () => {
    expect(distanceBetweenBusStops([7, 10, 1, 12, 11, 14, 5, 0], 7, 2)).toBe(17)
  })
})

test('object assignment', () => {
  const data: any = { one: 1 }
  data['two'] = 2
  expect(data).toEqual({ one: 1, two: 2 })
})
