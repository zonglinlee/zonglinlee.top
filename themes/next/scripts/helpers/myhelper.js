"use strict";

function tagcloudHelper() {
  let tags = this.site.tags;
  const result = [];

  tags.forEach((tag) => {
    result.push(
      `<button class="mytag"><a href="${this.url_for(tag.path)}" >${tag.name} | <span>${
        tag.length
      }</span></a></button>`
    );
  });
  console.log(tags);
  return result.join("");
}

hexo.extend.helper.register("my_tagcloud", tagcloudHelper);
