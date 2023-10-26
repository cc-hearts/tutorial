---
title: react example
---

## plum example

```react
import { RefObject, useEffect, useRef } from 'react'
import './App.css'


interface Point {
  x: number
  y: number
}

interface Branch {
  length: number,
  angle: number
}

function proxyCtx<T extends RefObject<HTMLCanvasElement>>(el: T) {
  return new Proxy({ value: el }, {
    get(target) {
      return target.value.current?.getContext('2d')
    }
  }) as unknown as { value: CanvasRenderingContext2D }
}

const taskPending: Array<(...args: any) => any> = []

const initBranchArgs = {
  length: 10,
  angle: -Math.PI / 2
}

function calcBranch(angle: number) {
  return {
    // 长度在原来的 0.8 ~ 1.2 之间随机
    length: initBranchArgs.length * 0.8 + Math.random() * initBranchArgs.length * 0.4,
    angle
  }
}


const calcPoint = (point: Point, initVal: Branch) => {
  const { length, angle } = initVal
  const x = point.x + length * Math.cos(angle)
  const y = point.y + length * Math.sin(angle)
  return { x, y }
}

const App = () => {
  const el = useRef<HTMLCanvasElement>(null)
  const ctx = proxyCtx(el)

  function drawBranch(startPoint: Point, endPoint: Point) {
    ctx.value.strokeStyle = '#fff'
    ctx.value.beginPath()
    ctx.value.moveTo(startPoint.x, startPoint.y)
    ctx.value.lineTo(endPoint.x, endPoint.y)
    ctx.value.stroke()
    ctx.value.closePath()
  }

  function invokeTask() {
    const task = [...taskPending]
    taskPending.length = 0
    task.forEach(fn => fn())
  }
  function init(startPoint: Point = { x: 0, y: 0 }) {
    const endPoint = { x: 0, y: -initBranchArgs.length }
    step(startPoint, initBranchArgs.angle)
    startDraw(endPoint)
  }

  function step(startPoint: Point, angle: number, depth: number = 0) {
	    const point = calcPoint(startPoint, calcBranch(angle))
    drawBranch(startPoint, point)
    startDraw(point, angle, depth + 1)
  }

  let count = 0
  function frame() {
    count++
    if (count % 2 === 0) {
      invokeTask()
    }
    requestAnimationFrame(frame)
  }
  function startDraw(startPoint: Point = { x: 0, y: 0 }, angle = -Math.PI / 2, depth = 0) {
    if (depth < 5 || Math.random() < 0.5) taskPending.push(() => step(startPoint, angle + 0.2, depth))
    if (depth < 5 || Math.random() < 0.5) taskPending.push(() => step(startPoint, angle - 0.2, depth))
  }

  useEffect(() => {
    ctx.value.translate(200, 400)
    frame()
    init()
  }, [])
  return <canvas ref={el} width={400} height={400}></canvas>
}

export default App
```
