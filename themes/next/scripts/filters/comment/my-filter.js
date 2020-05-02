hexo.extend.filter.register('theme_inject', function(injects) {
    debugger
    injects.style.push('source/_data/my.styl');
  });