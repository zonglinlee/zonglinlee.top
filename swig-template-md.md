---
title: swig-template.md
date: 2020-05-01 15:40:01
tags:
- template
---
## swig 基本用法
### 变量

{{ foo.bar }} 
{{ foo['chicken-tacos'] }}

### 过滤器(管道符)

{{ name|title }} was born on {{ birthday|date('F jS, Y') }}

title为默认过滤器：Capitalizes every word given and lower-cases all other letters.
date为默认过滤器: Format a date or Date-compatible string.

>add(value)：使变量与value相加，可以转换为数值字符串会自动转换为数值。
>addslashes：用 \ 转义字符串
>capitalize：大写首字母>
>date(format[, tzOffset])：转换日期为指定格式
>format：格式
>tzOffset：时区
>default(value)：默认值（如果变量为undefined，null，false）
>escape([type])：转义字符
>first：返回数组第一个值
>join(glue)：同[].join
>json_encode([indent])：类似JSON.stringify, indent为缩进空格数
>last：返回数组最后一个值
>length：返回变量的length，如果是object，返回key的数量
>lower：同''.toLowerCase()
>raw：指定输入不会被转义
>replace(search, replace[, flags])：同''.replace
>reverse：翻转数组
>striptags：去除html/xml标签
>title：大写首字母
>uniq：数组去重
>upper：同''.toUpperCase
>url_encode：同encodeURIComponent
>url_decode：同decodeURIComponemt
### 注释
{# comments #}
### function

var locals = { mystuff: function mystuff() { return '<p>Things!</p>'; } };
swig.render('{{ mystuff() }}', { locals: locals });
// => <p>Things!</p>

### 逻辑标签(单大括号)
#### extends
Makes the current template extend a parent template. This tag must be the first item in your template.必须写在第一行
{% extends "./layout.html" %}
#### block(类似vue slot)
Defines a block in a template that can be overridden by a template extending this one and/or will override the current template's parent template block of the same name.
定义一个 body block
{% block body %}...{% endblock %}
#### include
{% include "./partial.html" %}
#### macro
Create custom, reusable snippets within your templates.
Can be imported from one template to another

{% macro input(type, name, id, label, value, error) %}
<label for="{{ name }}">{{ label }}</label>
  <input type="{{ type }}" name="{{ name }}" id="{{ id }}" value="{{ value }}"{% if error %} class="error"{% endif %}>
{% endmacro %}

//引入之后使用
{{ input("text", "fname", "fname", "First Name", fname.value, fname.errors) }}
<label for="fname">First Name</label>
<input type="text" name="fname" id="fname" value="">
```
#### import
Allows you to import macros from another file directly into your current context.

{% import './formmacros.html' as form %}
{{ form.input("text", "name") }}
// => <input type="text" name="name">

#### if elif else

{% if false %}
  Tacos
{% elif true %}
  Burritos
{% else %}
  Churros
{% endif %}
// => Burritos

#### for
Loop over objects and arrays.

// arr = [1, 2, 3]
// Reverse the array, shortcut the key/index to `key`
{% for key, val in arr|reverse %}
{{ key }} -- {{ val }}
{% endfor %}
// => 0 -- 3
//    1 -- 2
//    2 -- 1

#### raw
Forces the content to not be auto-escaped. All swig instructions will be ignored and the content will be rendered exactly as it was given.
<% raw %>
{{ foobar }}
<% endraw %>

#### set 
Set a variable for re-use in the current context. 

{% set foo = "anything!" %}
{{ foo }}
// => anything!
