import Layout from '@views/Layout'
export default {
  path: '/user',
  component: Layout,
  meta: {
    power: 1,
    sort: 80,
    label: '用户管理',
    icon: require('@img/z-yh.png')
  },
  children: [
    {
      path: '',
      name: 'usermsg',
      component: () => import('@views/user/index'),
      meta: {
        breadcrumb: [
          {
            label: '用户管理',
            value: null
          }
        ],
      }
    }
  ]
}
