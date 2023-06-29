---
title: MouseEvent
---

- "screenX"，long 型可选，默认为 0，设置鼠标事件发生时相对于用户屏幕的水平坐标位置；该操作并不会改变真实鼠标的位置。
- "screenY"，long 型可选，默认为 0，设置鼠标事件发生时相对于用户屏幕的垂直坐标位置；该操作并不会改变真实鼠标的位置。
- "clientX"，long 型可选，默认为 0，设置鼠标事件时相对于客户端窗口的水平坐标位置；该操作并不会改变真实鼠标的位置。
- "clientY"，long 型可选，默认为 0，设置鼠标事件时相对于客户端窗口的垂直坐标位置；该操作并不会改变真实鼠标的位置。

screen 相对于屏幕 client 相当于 document 网页 html

## mouseEvent

mouseEvent 有一个重要的属性 为 **movementX **只读属性 它提供了当前事件和上一个**mousemove (en-US)**事件之间鼠标在水平方向上的移动值。换句话说，这个值是这样计算的 :&#x20;
currentEvent.movementX = currentEvent.screenX - previousEvent.screenX.
