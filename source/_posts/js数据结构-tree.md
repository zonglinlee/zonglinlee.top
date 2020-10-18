---
title: js数据结构-tree
tags:
 - js数据结构
---
前端常见树结构 DOM树/级联选择/树形控件，js中没有树结构数据格式，我们可以用Object和Array构建一个数结构
树常用操作： 深度/广度优先遍历，先中后序遍历
## 深度优先遍历
```js
// 1.访问根节点
// 2.对根节点的children挨个进行深度优先遍历
const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: [
                {
                    val: 'd',
                    children: [],
                },
                {
                    val: 'e',
                    children: [],
                }
            ],
        },
        {
            val: 'c',
            children: [
                {
                    val: 'f',
                    children: [],
                },
                {
                    val: 'g',
                    children: [],
                }
            ],
        }
    ],
};

const dfs = (root) => {
    console.log(root.val);
    root.children.forEach(child => {dfs(child)}); 
};

dfs(tree);

```
## 广度优先遍历
```js
// 1.新建一个队列，把根节点入队
// 2.把队头出队并访问
// 3.把队头的children挨个入队
// 4.重复2、3步骤直到队列为空

const bfs = (root) => {
    const q = [root];
    while (q.length > 0) {
        const n = q.shift();
        console.log(n.val);
        n.children.forEach(child => {
            q.push(child);
        });
    }
};

bfs(tree);
```