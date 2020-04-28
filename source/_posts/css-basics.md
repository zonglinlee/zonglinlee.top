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

CSS Animation
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