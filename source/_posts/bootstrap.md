---
title: bootstrap 入门
---
# bootstrap v4.4 入门
## 使用bootstrap
### [在head中引入css](https://getbootstrap.com/docs/4.4/getting-started/introduction/#css)
### [引入js](https://getbootstrap.com/docs/4.4/getting-started/introduction/#js)
bootstrap的js是基于jQuery开发的，有的组件需要js,有的不需要，所以可以参考官方文档，需要的时候再引入js文件，除了jQuery之外，还要引入proper.min.js,bootstrap.min.js,官方引入的是jQuery缩减版的，当然也支持jQuery完整版的。
### 重要的几个规定
- HTML5 doctype必须声明
```html
<!doctype html>
<html lang="en">
  ...
</html>
```
- 响应式meta标签必须声明
```html
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
```

### [reboot](https://getbootstrap.com/docs/4.4/getting-started/introduction/#reboot)
reboot 是基于normalize.css开发的一个运用于bootstrap的通用css样式设置，用来消除跨浏览器渲染的一些差异。
## [浏览器支持](https://getbootstrap.com/docs/4.4/getting-started/browsers-devices/)
Bootstrap supports the latest, stable releases of all major browsers and platforms. On Windows, we support Internet Explorer 10-11 / Microsoft Edge.
如果需要支持ie8-9,请使用bootstrap 3
bootstrap use Autoprefixer to handle intended browser support via CSS prefixes, which uses Browserslist to manage these browser versions. 
更多浏览器差异和bugs请查看官方文档。
```js
// agent sniffing
$(function () {
  var nua = navigator.userAgent
  var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
  if (isAndroid) {
    $('select.form-control').removeClass('form-control').css('width', '100%')
  }
})
```
## 使用bootstrap plugin
bootstrap插件都是基于jQuery开发的，所以jQuery必须在插件之前引入，可以在package.json文件中查看支持那个版本的jQuery。
可以在`js/dist/*.js`目录下引入单个bootstrap插件，也可以一次性引入所有插件bootstrap.js 或者bootstrap.min.js
## [自定义bootstrap样式](https://getbootstrap.com/docs/4.4/getting-started/theming/)
添加自定义的 custom.scss 样式
```css
// 一：在custom.css中你可以引入全部的scss文件
@import "../node_modules/bootstrap/scss/bootstrap";
//二：引入部分scss文件
//required
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";
// Optional
@import "../node_modules/bootstrap/scss/reboot";
```

不使用package manager时候的目录结构
your-project/
├── scss
│   └── custom.scss
└── bootstrap/
    ├── js
    └── scss
使用package manager时候的目录结构
your-project/
├── scss
│   └── custom.scss
└── node_modules/
    └── bootstrap
        ├── js
        └── scss
### 默认变量
在`scss/_variables.scss`你可以找到所有的变量，默认变量以 `!default`开头，你可以在custom.scss文件中覆盖它，但要去掉 `!default` 前缀，有一些默认变量为 null ,它并不会生效，除非你在custom.scss文件中重新定义它。
自定义的变量写在引入默认变量之前。
```scss
// Your variable overrides
$body-bg: #000;
$body-color: #111;
// Bootstrap and its default variables
@import "../node_modules/bootstrap/scss/bootstrap";
```
## bootstrap 栅格系统
bootstrap提供了 3 种网格容器
- .container, which sets a max-width at each responsive breakpoint
    在extra-small(小于576px)才是100%，其余的断点都是固定宽度
- .container-fluid, which is width: 100% at all breakpoints
    在所有断点下都是100%宽度
- .container-{breakpoint}, which is width: 100% until the specified breakpoint
    .container-sm(small>576px)/.container-md(medium>768px)/.container-lg(large>992px)/.container-xl(Extra large>1200px)
bootstrap 基于 flexbox 构建了12列等宽的网格系统，可以自适应 5 种屏幕尺寸。

Grid breakpoints are based on minimum width media queries, meaning they apply to that one breakpoint and all those above it (e.g., .col-sm-4 applies to small, medium, large, and extra large devices, but not the first xs breakpoint).
```html
<div class="container">
  <!-- Stack the columns on mobile by making one full-width and the other half-width -->
  <!-- 首先bootstrap会根据屏幕尺寸匹配meida query,如果在手机上打开，由于屏幕尺寸较小，md的媒体查询匹配不到，第一个div的col-md-8类匹配不到要添加的样式，所以它就是一个没有样式的div，宽度100%，第二个div匹配col-6类的样式，占据屏幕一半，等屏幕尺寸变大之后，两个div都匹配md下的媒体查询样式 -->
  <div class="row">
    <div class="col-md-8">.col-md-8</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>

  <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
  <div class="row">
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>

  <!-- Columns are always 50% wide, on mobile and desktop -->
  <div class="row">
    <div class="col-6">.col-6</div>
    <div class="col-6">.col-6</div>
  </div>
</div>
```
- Use col-{breakpoint}-auto classes to size columns based on the natural width of their content.`<div class="col-md-auto">`类似于width:fit-content;
- Rows are wrappers for columns. Each column has horizontal padding (called a gutter) for controlling the space between them. This padding is then counteracted on the rows with negative margins. This way, all the content in your columns is visually aligned down the left side.(Gutter width	30px ,15px on each side of a column)

### Row columns
Use the responsive `.row-cols-*` classes to quickly set the number of columns that best render your content and layout. Whereas normal .col-* classes apply to the individual columns (e.g., .col-md-4), the row columns classes are set on the parent .row as a shortcut.
### [Alignment](https://getbootstrap.com/docs/4.4/layout/grid/#alignment)
#### Vertical alignment
```html
<!-- 应用于行，调整所有子元素位置 -->
<div class="row align-items-start">
<div class="row align-items-center">
<div class="row align-items-end">
<!-- 应用于列 调整单个子元素位置 -->
<div class="col align-self-start">
<div class="col align-self-center">
<div class="col align-self-end">
```
#### Horizontal alignment
```html
<div class="row justify-content-start">
<div class="row justify-content-center">
<div class="row justify-content-end">
<div class="row justify-content-around">
<div class="row justify-content-between">
```
### No gutters
The gutters between columns in our predefined grid classes can be removed with .no-gutters. This removes the negative margins from .row and the horizontal padding from all immediate children columns.
```html
<div class="row no-gutters">
  <div class="col-sm-6 col-md-8">.col-sm-6 .col-md-8</div>
  <div class="col-6 col-md-4">.col-6 .col-md-4</div>
</div>
```
### Column wrapping
If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new line.
### [Column breaks](https://getbootstrap.com/docs/4.4/layout/grid/#no-gutters)
```html
 <!-- Force next columns to break to new line -->
    <div class="w-100"></div>
```
### Reordering
Use `.order-` classes for controlling the visual order of your content(`.order-1.order-md-2`), Includes support for 1 through 12 across all five grid tiers.
There are also responsive `.order-first` and `.order-last` classes that change the order of an element by applying order: -1 and order: 13 (order: $columns + 1), respectively.
### Offsetting columns
Move columns to the right using `.offset-md-*` classes.`.offset-md-4` moves `.col-md-4 `over four columns.
### Margin utilities
With the move to flexbox in v4, you can use margin utilities like `.mr-auto` to force sibling columns away from one another.
### Customizing the grid
Using our built-in grid Sass variables and maps, it’s possible to completely customize the predefined grid classes. Change the number of tiers, the media query dimensions, and the container widths—then recompile.
## [Utilities for layout](https://getbootstrap.com/docs/4.4/layout/utilities-for-layout/)
Bootstrap includes dozens of utility classes for showing, hiding, aligning, and spacing content.
- Changing display(Visible only on sm	`.d-none .d-sm-block .d-md-none`)
- [Margin and padding](https://getbootstrap.com/docs/4.4/utilities/spacing/)
Spacing utilities that apply to all breakpoints, from xs to xl, have no breakpoint abbreviation in them. 
- Toggle visibility(.visible or .invisible )
### Flexbox options
  不是所有的元素都是display：flex;如果要开启弹性盒子，添加`.d-flex` or one of the responsive variants (`.d-sm-flex`  `.d-inline-flex.`).

`.flex-row .flex-row-reverse` `.flex-column .flex-column-reverse`
`justify-content-start .justify-content-end .justify-content-center`
`.justify-content-between.justify-content-around`
`.align-items-start.align-items-end.align-items-center`
`.align-items-baseline.align-items-stretch`
`.align-self-start.align-self-end.align-self-center`
`.align-self-baseline.align-self-stretch`
#### Fill
Use the `.flex-fill` class on a series of sibling elements to force them into widths equal to their content 
#### 
`.flex-grow-* ` `.flex-shrink-*` `.flex-{grow|shrink}-0 .flex-{grow|shrink}-1`
#### Auto margins
Flexbox can do some pretty awesome things when you mix flex alignments with auto margins. Shown below are three examples of controlling flex items via auto margins: default (no auto margin), pushing two items to the right (`.mr-auto`), and pushing two items to the left (`.ml-auto`).
#### wrap
`.flex-nowrap`, wrapping with `.flex-wrap` or reverse wrapping with `.flex-wrap-reverse`.
#### order
`.order-0.order-1.order-2.order-3.order-4.order-5.order-6.order-7.order-8.order-9.order-10.order-11.order-12`
#### Align content
Use align-content utilities on flexbox containers to align flex items together on the cross axis. Choose from start (browser default), end, center, between, around, or stretch. To demonstrate these utilities, we’ve enforced flex-wrap: wrap and increased the number of flex items.
`This property has no effect on single rows of flex items.`