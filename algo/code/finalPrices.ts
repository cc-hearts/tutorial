function finalPrices(prices: number[]): number[] {
  const findMinPrice = (
    list: number[],
    startIndex: number,
    val: number
  ): number => {
    for (let i = startIndex; i < list.length; i++) {
      if (val >= list[i]) {
        return list[i]
      }
    }
    return 0
  }

  const result: number[] = []
  for (let i = 0; i < prices.length; i++) {
    const val = findMinPrice(prices, i + 1, prices[i])
    result.push(prices[i] - val)
  }
  return result
}
