class MyCircularQueue {
  public loopQueue: number[] = []
  public length = 0
  public total = 0
  constructor(k: number) {
    this.total = k
  }

  enQueue(value: number): boolean {
    if (this.length < this.total) {
      this.loopQueue.push(value)
      this.length++
      return true
    }
    return false
  }

  deQueue(): boolean {
    if (this.length > 0) {
      this.loopQueue.shift()
      this.length--
      return true
    }

    return false
  }

  Front(): number {
    return this.length === 0 ? -1 : this.loopQueue[0]
  }

  Rear(): number {
    return this.length === 0 ? -1 : this.loopQueue[this.length - 1]
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  isFull(): boolean {
    return this.length === this.total
  }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
