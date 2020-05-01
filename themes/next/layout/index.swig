{% extends '_layout.swig' %}
{% import '_macro/sidebar.swig' as sidebar_template with context %}

{% block title %}{{ title }}{%- if theme.index_with_subtitle and subtitle %} - {{ subtitle }}{%- endif %}{% endblock %}

{% block class %}index posts-expand{% endblock %}

{% block content %}

  {%- for post in page.posts.toArray() %}
    {{ partial('_macro/post.swig', {post: post, is_index: true}) }}
  {%- endfor %}

  {% include '_partials/pagination.swig' %}
{#  打印page变量
  <div style="border:solid 2px;">
    {% for key ,value in page %}
     {{ key }}---{{ value }}<br>
     {% endfor %}
  </div>
 #}

{#  打印page.posts变量
  <div style="border:solid 2px;">
    {% for key ,value in page %}
     {% for key , value in page.posts %}
      {{ key }}*******{{ value }}<hr>
     {% endfor %}
     {% endfor %}
  </div>
 #}
 {#  page.posts本身好像不是一个数组??
   <div style="border:solid 2px;">
    {% set foo = page.posts.toArray() %}
      {% for key , value in foo[0] %}
          {{ key }}*******{{ value }}<hr>
    {%- endfor %}
  </div>
 #}
{% endblock %}

{% block sidebar %}
  {{ sidebar_template.render(false) }}
{% endblock %}


