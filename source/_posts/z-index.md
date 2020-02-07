---
title: Z-index
tags: CSS
---
# CSS Z-index
## 当没有定义z-index属性时
When no z-index property is specified, elements are rendered on the default rendering layer 0 (zero).
从下倒上依次是：
- The background and borders of the root element
- Descendant non-positioned blocks, in order of appearance in the HTML
- Descendant positioned elements, in order of appearance in the HTML

当flex-items的order属性改变了HTML的显示顺序之后，它同样会影响stacking context的顺序
## The stacking context（层叠上下文）
它是一个假象的三维空间，垂直于视口，HTML 元素基于其元素属性按照优先级顺序占据这个空间
### 如何产生一个层叠上下文
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
### 层叠上下文如何工作
在同一个层叠上下文，子元素按照没有z-index时的顺序叠加，如果子元素有z-index属性，它是相对于在本层叠上下文中的其他子元素而言的，它整体的z-index是由父元素决定的。父元素和子元素属于不同的层叠上下文，其z-index没有比较性可言。

HTML的层次结构和层叠上下文的层次结构是不同的。在层叠上下文的层次结构中，没有创建层叠上下文的元素同其父级处于一个层叠上下文。创建了层叠上下文的会跳离父元素的HTML结构限制，自成一个层叠上下文。
## Stacking with floated blocks
For floated blocks, the stacking order is a bit different. Floating blocks are placed between non-positioned blocks and positioned blocks
- The background and borders of the root element
- Descendant non-positioned blocks, in order of appearance in the HTML
- Floating blocks
- Descendant positioned elements, in order of appearance in the HTML



