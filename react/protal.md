---
title: React createProtal
---

## 概念

`Protal` 提供了一种可以将子节点渲染到存在于父组件以外的 DOM 节点
一般常用于对话框、悬浮卡以及提示框等
但是 protal 的组件虽然被挂载到了其他的节点上 但是可以通过 react 树进行事件的冒泡。

# 代码实现

```tsx
import { Component } from 'react'
import { createPortal } from 'react-dom'
interface Props {
  children: React.ReactNode
  toggleVisible: (...args: any[]) => void
}

export default class Dialog extends Component<Props, {}> {
  dom: Element | null = null
  constructor(props: Props) {
    super(props)
    const node = document.createElement('div')
    node.setAttribute('id', 'portal')
    document.body.appendChild(node)
    this.dom = node
  }
  componentWillUnmount(): void {
    this.dom = null
  }
  handleClick = () => {
    this.props.toggleVisible()
  }
  render() {
    return createPortal(
      <div>
        {this.props.children}
        <button onClick={this.handleClick}>关闭</button>
      </div>,
      this.dom!
    )
  }
}
```

```tsx
import { Component, ReactNode } from 'react'
import Dialog from './dialog'

export default class App extends Component {
  constructor(props: any) {
    super(props)
  }
  state = {
    visible: false,
  }
  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }
  render(): ReactNode {
    return (
      <>
        <button onClick={this.toggleVisible}>点击打开弹窗</button>
        {this.state.visible && (
          <Dialog toggleVisible={this.toggleVisible}>dialog组件内部</Dialog>
        )}
      </>
    )
  }
}
```

## 参考资料

<https://zh-hans.reactjs.org/docs/portals.html>
