---
title: vue
date: 2020-05-26 20:42:37
tags:
- vue
---
vue总结
<!-- more -->
## Vue 中的动画
vue中的css动画有两种形式，一种是transition动画，另一种是用css的@key-frames的animation动画，这两个都是通过内置transition组件提供的类名来定义CSS动画效果，动画分为进入和离开两种动画形式，在transition中提供了6个class，而在animation动画中，由于key-frames中已经定义好了 `进入前/进入后` 或者 `离开前/离开后` 的动画关键帧，所以只需要写2个class即可，分别是 `v-enter-active/v-leave-active`
vue中还提供了JS钩子函数来生成js动画，以入场动画为例，总共四个钩子函数`beforeEnter/enter/afterEnter/enterCancelled`,其中在enter钩子函数中提供了一个`done`回调参数，动画执行完毕后，要进行调用
`transition-group`组件，在实际渲染过程中会将列表中的单个元素外层再包裹一个`transition`组件，我们只需和上面一样定义class名称即可。

### 在Vue中使用 animate.css 库
注意使用animate.css库，需要使用Vue提供的自定义class名称，以入场动画为例`enter-class/enter-active-class/enter-to-class`
使用animate.css库主要用`enter-active-class`类，比如`animated bounce`
```html
<div id="root">
   <transition 
      name="fade" 
      enter-active-class="animated swing"  //使用Animate.css库实例
      leave-active-class="animated bounce"
   >
      <div v-if="show">hello miya</div>
  </transition>
  <button @click="handleClick">切换</button>
</div>
```
### 在Vue中使用 Velocity.js 库
```js
//在transition组件上分别注册三个事件
methods:{
    handleBeforeEnter(el){
        el.style.opacity = 0 //入场前不可见
    },
    handleEnter(el,done){
        Velocity(el,{opacity:1},{duration:1000,complete:done}) //动画结束调用done
    },
    handleAfterEnter(el){
        console.log('animation completed')
    }
}
```
