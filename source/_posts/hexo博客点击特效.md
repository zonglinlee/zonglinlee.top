---
comments: true
tags: 
- hexo
categories:
- [Hexo]
---
```js
jQuery(document).ready(function ($) {
    let coreSocialistValues = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"]
    let colors = ["#11f0e5","#e815d3","#f7f30f","#e8270e","#15eb59","#881df2","#fa9120"]
    let index = Math.floor(Math.random() * coreSocialistValues.length);
    $('body').click(function (e) {
      //过滤a标签
      if (e.target.tagName == 'A') {
        return;
      }
      let $i = $("<span />").text(coreSocialistValues[index]);
      index = (index + 1) % coreSocialistValues.length;
      let color_index = Math.floor(Math.random() * colors.length);
      let color = colors[color_index]
      let x = e.pageX,
        y = e.pageY;
      $i.css({
        "z-index": 999999,
        "top": y - 20,
        "left": x,
        "position": "absolute",
        "font-weight": "bold",
        "color": color
      });
      $("body").append($i);
      $i.animate({
        "top": y - 180,
        "opacity": 0
      },
        1500,
        function () {
          $i.remove();
        });
    })
  })
</script>
```
