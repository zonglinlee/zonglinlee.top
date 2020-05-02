---
title: css basics
date: 2020-03-01 13:23:35
tags: 
- CSS
---
## formatting contexts types
Everything on a page is part of a formatting context, or an area which has been defined to lay out content in a particular way. A block formatting context (BFC) will lay child elements out according to block layout rules, a flex formatting context will lay its children out as flex items, etc. Each formatting context has specific rules about how layout behaves when in that context.
- block formatting contexts
- inline formatting contexts
- flex formatting contexts

## Creating a new block formatting context
html 元素是最外层初始的一个 block formatting contexts.This means that every element inside the <html> element's block is laid out according to normal flow following the rules for block and inline layout.
- elements made to float using float
- absolutely positioned elements (including position: fixed or position: sticky)
- elements with display: inline-block
- block elements where overflow has a value other than visible
- elements with display: flow-root or display: flow-root list-item
- flex items
- grid items

## Explicitly creating a BFC using display: flow-root
## Inline formatting contexts
Inline formatting contexts exist inside other formatting contexts and can be thought of as the context of a paragraph. 

css盒模型并不完全适用于inline formatting contets, In a horizontal writing mode line, horizontal padding, borders and margin will be applied to the element and push the text away left and right. However, margins above and below the element will not be applied. Vertical padding and borders will be applied but may  overlap content above and below as, in the inline formatting context, the line boxes will not be pushed apart by padding and borders.
## In Flow and Out of Flow
### Taking an item out of flow
All elements are in-flow apart from:
- floated items
- items with position: absolute (including position: fixed which acts in the same way)
- the root element (html)

Out of flow items create a new Block Formatting Context (BFC) and therefore everything inside them can be seen as a mini layout, separate from the rest of the page. The root element therefore is out of flow, as the container for everything in our document, and establishes the Block Formatting Context for the document.
## the `display` css  property 
Formally, the display property sets an element's inner and outer display types. The outer type sets an element's participation in flow layout; the inner type sets the layout of children.

The Level 3 specification details two values for the display property — enabling the specification of the outer and inner display type explicitly — but this is not yet well-supported by browsers.
The <display-legacy> methods allow the same results with single keyword values, and should be favoured by developers until the two keyword values are better supported. For example, using two values you might specify an inline flex container as follows:
```css
.container {
  display: inline flex;
}
//This can currently be specified using a single value.

.container {
  display: inline-flex;
}
```
## The var() Function
Variables in CSS should be declared within a CSS selector that defines its scope. For a global scope you can use either the :root or the body selector.
The variable name must begin with two dashes (--) and is case sensitive!
```css
:root {
  --main-bg-color: coral;   
}
#div1 {
  background-color: var(--main-bg-color);
}
```
## dark mode
 The `prefers-color-scheme` CSS media feature is used to detect if the user has requested the system use a `light` or `dark` color theme.
 ## 
- css盒模型中以 top-left为坐标原点
- css rotate(deg) deg正为clockwise deg负为counter-clockwise,transform-origin默认值为：50% 50% 0
- CSS object model
There are four standard coordinate systems
    - Offset ：the mouse event's offsetX and offsetY properties
    - Client : the MouseEvent.clientX and MouseEvent.clientY
    - Page :Mouse events' pageX and pageY properties 
    - Screen :The MouseEvent.screenX and MouseEvent.screenY properties 

- base-line: align-items:base-line;//所有flex items 第一行文字底部对齐

- hover,active顺序
a:hover,a:focus{
    //这两个最好一块写
    color:pink;
}

- 如果父元素display:flex,子元素display：none; position:absolute都不算在flex-items里面

The unset CSS keyword resets a property to its inherited value if it inherits from its parent, and to its initial value if not.

The initial CSS keyword applies the initial (or default) value of a property to an element. This initial value is set by the browser. 

The inherit CSS keyword causes the element for which it is specified to take the computed value of the property from its parent element.

display:none
Turns off the display of an element so that it has no effect on layout (the document is rendered as though the element did not exist). All descendant elements also have their display turned off.
To have an element take up the space that it would normally take, but without actually rendering anything, use the visibility property instead.

## CSS Animation
- animation-fill-mode
首先，你要明白动画分为 初始状态 等待期 动画执行期 完成期 四个阶段。

初始状态，就是没有触发动画效果时，你元素原本应该有的状态。
例如你的动画是通过点击触发的，那么你元素在还没有点击的时候，是受初始状态样式控制的，也就css中不含 animation 的其他属性控制。

等待期，就是 animation-delay 设置的延迟期间。

按照点击触发为例子，等待期就是从你点击元素开始计算，持续 animation-delay 计时结束的这段时间。

这个期间的样式会受到 animation-fill-mode 取值的影响。

如果为 none，表示等待期间元素没有变化，还是初始状态的样式。
如果为 backwards 或者 both，表示等待期元素样式为第一帧的样式。

注意是第一帧的概念，可能时 @keyframes 中的 0%，也有可能为 100% 。取决于 animationo-direction 属性。

1、当 animationo-direction 为 normal 或者 alternate 时，第一帧就是 0% 中定义样式。
2、当 animation-direction 为 reverse 或者 alternate-reverse时，第一帧就时 100% 中定义样式。

如果为 forwards，对于等待期而言没有意义，这个是定义完成状态时元素样式，下面会细说。

动画执行期，指的是 delay 结束瞬间开始执行动画，一直持续到最后一帧。
注意最后一帧的概念也是很绕，它一定属于 @keyframes 中的 0% 或者 100% 中之一。但具体为哪一个受到 animation-direction 和 animation-iteration-count 取值影响。

总结：
1、当 animation-direction：normal 时，最后一帧总为 100% 样式，无关 animation-iteration-count。
2、当 animation-direction：reverse 时，最后一帧总为 0% 样式，也无关 animation-iteration-count。
3、当 animation-direction：alternate时，animation-iteration-count 为单数时，最后一帧 为 100%， 双数为 0%；
4、当 animation-direction：alternate-reverse时，animation-iteration-count 为单数时，最后一帧 为 0%， 双数为 100%；

完成状态，执行完最后一帧时，元素处于的状态
如果你理解最后一帧，就能理解完成状态。ifinite 的动画没有完成状态。
animation-fill-mode 取值 none。表示动画结束，元素回归初始状态，而且是瞬间回归，无动画效果。

animation-fill-mode 取值 forwards 或者 both。表示动画执行完最后一帧，保持在最后一帧样式。再次申明，最后一帧可能为 @keyframes 中的 0% 或者 100% 之一。

最后总结
none 表示 等待期和完成期，元素样式都为初始状态样式，不受动画定义（@keyframes）的影响。

both 表示 等待期样式为第一帧样式，完成期保持最后一帧样式。

backwards 表示等待期为第一帧样式，完成期跳转为初始样式

forwards 表示等待期保持初始样式，完成期间保持最后一帧样式。

css 3d effects
transform-style:sets whether children of an element are positioned in the 3D space or are flattened in the plane of the element(设置在父元素上，对子元素起作用)。As this property is not inherited, it must be set for all non-leaf descendants of the element.
perspective： determines the distance between the z=0 plane and the user in order to give a 3D-positioned element some perspective. (加上透视之后，默认是正视图，所以要将父元素进行旋转才能看出了效果，如果父元素旋转了，则在dom中可以操控的区域会缩小，会影响相应绑定的事件，所以最好给父元素添加)
## CSS Z-index
### 当没有定义z-index属性时
When no z-index property is specified, elements are rendered on the default rendering layer 0 (zero).
从下倒上依次是：
- The background and borders of the root element
- Descendant non-positioned blocks, in order of appearance in the HTML
- Descendant positioned elements, in order of appearance in the HTML

当flex-items的order属性改变了HTML的显示顺序之后，它同样会影响stacking context的顺序
### The stacking context（层叠上下文）
它是一个假象的三维空间，垂直于视口，HTML 元素基于其元素属性按照优先级顺序占据这个空间
#### 如何产生一个层叠上下文
- html元素本身
- position为absolute/relative，并且z-index不为auto
- position为fixed/sticky
- flex items,并且z-index不为auto
- grid items, 并且z-index不为auto
- Element with a opacity value less than 1 
- Element with a mix-blend-mode value other than normal.
- Element with any of the following properties with value other than none:
        - transform
        - filter
        - perspective
        - clip-path
        - mask / mask-image / mask-border
#### 层叠上下文如何工作
在同一个层叠上下文，子元素按照没有z-index时的顺序叠加，如果子元素有z-index属性，它是相对于在本层叠上下文中的其他子元素而言的，它整体的z-index是由父元素决定的。父元素和子元素属于不同的层叠上下文，其z-index没有比较性可言。

HTML的层次结构和层叠上下文的层次结构是不同的。在层叠上下文的层次结构中，没有创建层叠上下文的元素同其父级处于一个层叠上下文。创建了层叠上下文的会跳离父元素的HTML结构限制，自成一个层叠上下文。
### Stacking with floated blocks
For floated blocks, the stacking order is a bit different. Floating blocks are placed between non-positioned blocks and positioned blocks
- The background and borders of the root element
- Descendant non-positioned blocks, in order of appearance in the HTML
- Floating blocks
- Descendant positioned elements, in order of appearance in the HTML
