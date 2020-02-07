---
title: formatting contexts
tags: CSS
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