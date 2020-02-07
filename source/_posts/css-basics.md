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