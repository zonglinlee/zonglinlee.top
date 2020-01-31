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