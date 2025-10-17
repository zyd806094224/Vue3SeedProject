export interface Tree {
  id: string
  label: string
  route?: string
  children?: Tree[]
}
export const treeData: Tree[] = [
  {
    id: '1',
    label: 'Level one 1',
    children: [
      {
        id: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            id: '1-1-1',
            label: 'Level three 1-1-1',
            route: 'elTreeUser' // 修改为嵌套路由名称
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: 'Level one 2',
    children: [
      {
        id: '2-1',
        label: 'Level two 2-1',
        children: [
          {
            id: '2-1-1',
            label: 'Level three 2-1-1',
            route: 'elTreeProfile' // 修改为嵌套路由名称
          }
        ]
      },
      {
        id: '2-2',
        label: 'Level two 2-2',
        children: [
          {
            id: '2-2-1',
            label: 'Level three 2-2-1',
            route: 'elTreeAbout' // 添加更多路由示例
          }
        ]
      }
    ]
  },
  {
    id: '3',
    label: 'Level one 3',
    children: [
      {
        id: '3-1',
        label: 'Level two 3-1',
        children: [
          {
            id: '3-1-1',
            label: 'Level three 3-1-1',
            route: 'elTreeVirtualList' // 添加更多路由示例
          }
        ]
      },
      {
        id: '3-2',
        label: 'Level two 3-2',
        children: [
          {
            id: '3-2-1',
            label: 'Level three 3-2-1',
            route: 'elTreeTableList' // 添加更多路由示例
          }
        ]
      }
    ]
  },
  {
    id: '4',
    label: 'Level one 4',
    route: 'elTreeView' // 现在使用路由名称而不是路径
  }
]
