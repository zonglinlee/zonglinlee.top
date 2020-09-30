---
title: element-ui 表格双击编辑功能
date: 2020-09-30 17:32:56
tags:
 - element-ui
---
原始数据

``` json
{
    "domain": "default",
    "year": "2020",
    "countryCode": "86",
    "provinceCode": "64",
    "name": "宁夏回族自治区",
    "fullname": "宁夏回族自治区",
    "districts": [
        {
            "code": "6401",
            "name": "银川市",
            "fullname": "宁夏回族自治区银川市",
            "districts": [
                {
                    "code": "640104",
                    "name": "兴庆区",
                    "fullname": "宁夏回族自治区银川市兴庆区",
                    "districts": [
                        {
                            "code": "640104001",
                            "name": "凤凰北街街道办事处",
                            "fullname": "宁夏回族自治区银川市兴庆区凤凰北街街道办事处",
                            "districts": null
                        }
                    ]
                }
            ]
        }
    ]
}
```

对数据进行处理,遍历将原始数据转成带 `edit` flag 的对象

```js
      function parseTreeJson(treeNodes) {
        if (!treeNodes || !treeNodes.length) return
        for (var i = 0, len = treeNodes.length; i < len; i++) {
          var childs = treeNodes[i].districts
          // 遍历树元素，添加可编辑功能
          const { code, name, fullname } = treeNodes[i]
          treeNodes[i].code = {
            value: code, edit: false
          }
          treeNodes[i].name = {
            value: name, edit: false
          }
          treeNodes[i].fullname = {
            value: fullname, edit: false
          }
          // element-ui 上对树形表格必须要有 row-key属性，但是row-key属性会影响 input 组件的change事件，所以额外加一个字段来作为row-key
          treeNodes[i].rowkey = treeNodes[i].fullname.value + '#@$$@@%^&'

          if (childs && childs.length > 0) {
            parseTreeJson(childs)
          }
        }
      }
      parseTreeJson([data])
```

vue 组件

- 表格上添加`cell-dblclick`事件 ,双击单元格的时候让 `input`展示出来
- 注意 `row-key` 和 `tree-props` 属性

```html
<el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="rowkey"
        border
        :tree-props="{children: 'districts', hasChildren: 'hasChildren'}"
        @cell-dblclick="editCell"
      >
        <el-table-column
          prop="name"
          label="name"
          width="fit-content"
        >
          <template slot-scope="{row,column}">
            <template v-if="row.name.edit">
              <el-input v-model="row[column.property].value" class="edit-input" size="small" :autofocus="true" @blur="()=>{handleChange(row,column)}" />
            </template>
            <span v-else>{{ row.name.value }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="code"
          width="fit-content"
        >
          <template slot-scope="{row,column}">
            <template v-if="row.code.edit">
              <el-input v-model="row[column.property].value" class="edit-input" size="small" @blur="()=>{handleChange(row,column)}" />
            </template>
            <span v-else>{{ row.code.value }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fullname"
          label="fullname"
          width="fit-content"
        >
          <template slot-scope="{row,column}">
            <template v-if="row.fullname.edit">
              <el-input v-model="row[column.property].value" class="edit-input" size="small" @blur="()=>{handleChange(row,column)}" />
            </template>
            <span v-else>{{ row.fullname.value }}</span>
          </template>
        </el-table-column>
        <!-- 这里使用elment-ui组件的input会有bug -->
        <el-table-column width="300">
          <template slot="header">
            <input
              v-model="search"
              class="self-input"
              size="mini"
              placeholder="输入关键字搜索"
            >
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleSave(scope.$index, scope.row)"
            >保存</el-button>
          </template>
        </el-table-column>

      </el-table>
```

methods 方法

```js
    handleChange(row, column) {
      row[column.property].edit = false
    },
    handleSave() {
      console.log('save')
    },
    editCell(row, col, element) {
      row[col.property].edit = true
      this.$nextTick(() => {
        const input = element.querySelector('.edit-input input.el-input__inner')
        input.focus()
      })
    }
```
