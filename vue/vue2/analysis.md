---
title: vue执行流程分析
---

## 前置

通过在 `debugger` 调试的方式 进行 vue 的流程案例分析

```json
    {
      "name": "Attach to Chrome",
      "port": 9222,
      "request": "attach",
      "type": "chrome",
      "webRoot": "${workspaceFolder}",
      "sourceMapPathOverrides": {
        "webpack://?:/*": "${workspaceFolder}/*"
      }
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "runtimeExecutable": "canary",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack://vue2-test/src/*": "${webRoot}/*"
      }
    }
```

在 `new Vue` 处 断点调试 分析整个执行流程

会执行当前的 `_init` 方法

```js
function Vue(options) {
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    // 初始化 调用vue原型链上的_init 方法
    // options 就是传递的{render: h => h(App)}
    this._init(options)
}
```

```js
Vue.prototype._init = function(options) {
    var vm = this
    // a uid
    vm._uid = uid++
    var startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        startTag = 'vue-perf-start:'.concat(vm._uid)
        endTag = 'vue-perf-end:'.concat(vm._uid)
        mark(startTag)
    }
    // a flag to mark this as a Vue instance without having to do instanceof
    // check
    vm._isVue = true // 标记vue实例对象
    // avoid instances from being observed
    vm.__v_skip = true
    // effect scope
    vm._scope = new EffectScope(true /* detached */ )
    vm._scope._vm = true
    // merge options
    if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options)
    } else {
        // 执行的new Vue 因此 vm(this).constructor 指向的就是Vue
        vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
        )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
        initProxy(vm)
    } else {
        vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook$1(vm, 'beforeCreate', undefined, false /* setContext */ )
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook$1(vm, 'created')
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        vm._name = formatComponentName(vm, false)
        mark(endTag)
        measure('vue '.concat(vm._name, ' init'), startTag, endTag)
    }
    if (vm.$options.el) {
        vm.$mount(vm.$options.el)
    }
}
```

> resolveConstructorOptions 函数的解释：

```js
// 加载构造函数上的options属性
function resolveConstructorOptions(Ctor) {
    // Ctor 一开始就是Vue 因此options 有一些简单的属性
    // _base === Vue
    // components: { KeepAlive Transition TransitionGroup }
    // directives: { model: {componentUpdated inserted} show: {bin unbind update} }
    var options = Ctor.options
    if (Ctor.super) {
        var superOptions = resolveConstructorOptions(Ctor.super)
        var cachedSuperOptions = Ctor.superOptions
        if (superOptions !== cachedSuperOptions) {
            // super option changed,
            // need to resolve new options.
            Ctor.superOptions = superOptions
            // check if there are any late-modified/attached options (#4976)
            var modifiedOptions = resolveModifiedOptions(Ctor)
            // update base extend options
            if (modifiedOptions) {
                extend(Ctor.extendOptions, modifiedOptions)
            }
            options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
            if (options.name) {
                options.components[options.name] = Ctor
            }
        }
    }
    return options
}
```

> mergeOptions

```js
function mergeOptions(parent, child, vm) {
    if (process.env.NODE_ENV !== 'production') {
        checkComponents(child)
    }
    if (isFunction(child)) {
        // @ts-expect-error
        child = child.options
    }
    normalizeProps(child, vm)
    normalizeInject(child, vm)
    normalizeDirectives$1(child)
    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm)
        }
        if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm)
            }
        }
    }
    // 合并options
    var options = {}
    var key
    for (key in parent) {
        mergeField(key)
    }
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key)
        }
    }

    function mergeField(key) {
        var strat = strats[key] || defaultStrat
        options[key] = strat(parent[key], child[key], vm, key)
    }
    return options
}
```

> initLifecycle 方法分析 初始化一个实例对象的属性

```js
function initLifecycle(vm) {
    var options = vm.$options
    // locate first non-abstract parent
    var parent = options.parent
    // `options.abstract` 表示一个抽象组件 例如`keep-alive` 这样的组件。不会被渲染成 dom 节点 因此父子绑定会跳过抽象组件
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent
        }
        parent.$children.push(vm)
    }
    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm
    vm.$children = []
    vm.$refs = {}
    vm._provided = parent ? parent._provided : Object.create(null)
    vm._watcher = null
    vm._inactive = null
    vm._directInactive = false
    vm._isMounted = false
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
}
```

> initEvents 方法解析
> 初始化父亲组件监听在当前组件的各种自定义事件

```js
function initEvents(vm) {
    vm._events = Object.create(null)
    // TODO:
    vm._hasHookEvent = false
    // init parent attached events
    var listeners = vm.$options._parentListeners
    if (listeners) {
        updateComponentListeners(vm, listeners)
    }
}

function updateComponentListeners(vm, listeners, oldListeners) {
    target$1 = vm
    updateListeners(
        listeners,
        oldListeners || {},
        add$1,
        remove$1,
        createOnceHandler$1,
        vm
    )
    target$1 = undefined
}
```

```js
function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
    var name, cur, old, event
    for (name in on) {
        cur = on[name]
        old = oldOn[name]
        event = normalizeEvent(name)
        if (isUndef(cur)) {
            process.env.NODE_ENV !== 'production' &&
                warn(
                    'Invalid handler for event "'.concat(event.name, '": got ') +
                    String(cur),
                    vm
                )
        } else if (isUndef(old)) {
            if (isUndef(cur.fns)) {
                cur = on[name] = createFnInvoker(cur, vm)
            }
            if (isTrue(event.once)) {
                cur = on[name] = createOnceHandler(event.name, cur, event.capture)
            }
            add(event.name, cur, event.capture, event.passive, event.params)
        } else if (cur !== old) {
            old.fns = cur
            on[name] = old
        }
    }
    for (name in oldOn) {
        if (isUndef(on[name])) {
            event = normalizeEvent(name)
            remove(event.name, oldOn[name], event.capture)
        }
    }
}
```

```js
function add$1(event, fn) {
    target$1.$on(event, fn)
}
```

> 将监听的事件都存储到当前实例对象的 `_events` 属性中 因此使用 `v m._evnets` 可以查看当前组件的绑定的自定义事件对象

```js
Vue.prototype.$on = function(event, fn) {
    var vm = this
    if (isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
            vm.$on(event[i], fn)
        }
    } else {
        ;
        (vm._events[event] || (vm._events[event] = [])).push(fn)
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
            vm._hasHookEvent = true
        }
    }
    return vm
}
```

* initRender

```js
function initRender(vm) {
    vm._vnode = null // the root of the child tree
    vm._staticTrees = null // v-once cached trees
    var options = vm.$options
    var parentVnode = (vm.$vnode = options._parentVnode) // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context
    vm.$slots = resolveSlots(options._renderChildren, renderContext)
    vm.$scopedSlots = parentVnode ?
        normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots) :
        emptyObject
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    // @ts-expect-error
    vm._c = function(a, b, c, d) {
        return createElement$1(vm, a, b, c, d, false)
    }
    // normalization is always applied for the public version, used in
    // user-written render functions.
    // @ts-expect-error
    vm.$createElement = function(a, b, c, d) {
        return createElement$1(vm, a, b, c, d, true)
    }
    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
        defineReactive(
            vm,
            '$attrs',
            (parentData && parentData.attrs) || emptyObject,
            function() {
                !isUpdatingChildComponent && warn('$attrs is readonly.', vm)
            },
            true
        )
        defineReactive(
            vm,
            '$listeners',
            options._parentListeners || emptyObject,
            function() {
                !isUpdatingChildComponent && warn('$listeners is readonly.', vm)
            },
            true
        )
    } else {
        defineReactive(
            vm,
            '$attrs',
            (parentData && parentData.attrs) || emptyObject,
            null,
            true
        )
        defineReactive(
            vm,
            '$listeners',
            options._parentListeners || emptyObject,
            null,
            true
        )
    }
}
```

之后就是 beforeCreated 函数的调用

* initInjections

> initState 中 最先初始化的是 props 其次就是 methods 、 computed 和 watch
>
> 因此 在 watch 的阶段是可以获取到当前挂载的 computed 和 methods 的

```js
function initState(vm) {
    var opts = vm.$options
    if (opts.props) initProps$1(vm, opts.props)
    // Composition API
    initSetup(vm)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
        initData(vm)
    } else {
        var ob = observe((vm._data = {}))
        ob && ob.vmCount++
    }
    if (opts.computed)
        // 虽然computed 已经被挂载了 但是却没有获取因此 会在beforMounted 这个hooks 中被获取 因为要生成DOM 挂载到网页上去
        initComputed$1(vm, opts.computed)
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
    }
}
```

## 子组件渲染流程

```js
Vue.extend = function(extendOptions) {
    extendOptions = extendOptions || {}
    var Super = this
    var SuperId = Super.cid
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
    }
    var name = getComponentName(extendOptions) || getComponentName(Super.options)
    if (process.env.NODE_ENV !== 'production' && name) {
        validateComponentName(name)
    }
    var Sub = function VueComponent(options) {
        this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(Super.options, extendOptions)
    Sub['super'] = Super
    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
        initProps(Sub)
    }
    if (Sub.options.computed) {
        initComputed(Sub)
    }
    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use
    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function(type) {
        Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
        Sub.options.components[name] = Sub
    }
    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)
    // cache constructor
    cachedCtors[SuperId] = Sub
    return Sub
}
```

## 页面流程执行顺序

误区 1: computed 是会比 watch 要先初始化完成的

> 初始化执行的顺序:
>
> beforeCreate ->inject -> Props -> Methods -> Data -> Computed -> Watch ->provide*->* created
