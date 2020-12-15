import Layout from '@views/Layout'
export default {
  path: '/source',
  component: Layout,
  meta: {
    power: 1,
    sort: 90,
    label: '数据源管理',
    icon: require('@img/z-yy.png')
  },
  children: [
    {
      path: '',
      name: 'sourceList',
      component: () => import('@views/source/list'),
      meta: {
        breadcrumb: [
          {
            label: '数据源列表',
            value: null
          }
        ],
      }
    }
  ]
}
