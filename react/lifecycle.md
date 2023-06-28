---
title: React class components 生命周期
---

<https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/>

# static getDerivedStateFromProps

```javascript
import React, {
    Component
} from 'react'
let count = 0
export default class Children extends Component {
    constructor() {
        super()
        this.state = {
            a: 1,
        }
    }
    static getDerivedStateFromProps(props, state) {
        // 返回的值会用于更新state 如果不更新 state 则使用null
        console.log('props:', props)
        count++
        console.log('更新之后的state:', count)
        return {
            a: count,
        }
    }
    render() {
        console.log('state:', this.state)
        return <div > 123 < /div>
    }
}
```

# shouldComponentUpdate

```javascript
import React, {
    Component
} from 'react'
export default class Children extends Component {
    constructor() {
        super()
        this.state = {
            a: 1,
        }
    }
    static getDerivedStateFromProps(props, state) {
        return {
            a: state.a + 1,
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // 可以跟this.props 或者 this.state 比较 判断是否需要更新组件
        console.log('这一次的值', this.props, this.state)
        console.log('下一次的值', nextProps, nextState)
        return true
    }
    render() {
        return <div > 123 < /div>
    }
}
```

# getSnapshotBeforeUpdate

```javascript
import React, {
    Component
} from 'react'
export default class Children extends Component {
    constructor() {
        super()
        this.state = {
            a: 1,
        }
    }
    static getDerivedStateFromProps(props, state) {
        return {
            a: state.a + 1,
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // 可以跟this.props 或者 this.state 比较 判断是否需要更新组件
        console.log('这一次的值', this.props, this.state)
        console.log('下一次的值', nextProps, nextState)
        return true
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('上一次的值', prevProps, prevState)
        console.log('这一次的值', this.props, this.state)
        return null
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // snapshot 就是 getSnapshotBeforeUpdate 返回的值
    }
    render() {
        return <div > 123 < /div>
    }
}
```

> <https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate>
