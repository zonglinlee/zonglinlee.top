- site.data
在source/_data文件夹下的 YAML or JSON files
比如在此文件夹下有一个 munu.yaml 文件，则可以在模板字符串中，link是 property

<% for (var link in site.data.menu) { %>
  <a href="<%= site.data.menu[link] %>"> <%= link %> </a>
<% } %>
