import Layout from '@views/Layout'
export default {
  path: '/jsonfile',
  component: Layout,
  meta: {
    power: 1,
    sort: 100,
    label: 'JSON文件',
    icon: require('@img/z-yy.png')
  },
  children: [
    {
      path: 'list',
      name: 'jsonlist',
      component: () => import('@views/jsonFile/list'),
      meta: {
        breadcrumb: [
          {
            label: 'JSON列表',
            value: null
          }
        ],
      }
    },
    {
      path: 'data',
      name: 'jsondata',
      component: () => import('@views/jsonFile/data'),
      meta: {
        breadcrumb: [
          {
            label: '构建JSON',
            value: null
          }
        ],
      }
    },
    {
      path: 'setup',
      name: 'setupjson',
      component: () => import('@views/jsonFile/setup'),
      meta: {
        hide: true,
        breadcrumb: [
          {
            label: '构建JSON',
            value: null
          }
        ],
      }
    },
    {
      path: 'produce',
      name: 'producejson',
      component: () => import('@views/jsonFile/produce'),
      meta: {
        hide: true,
        breadcrumb: [
          {
            label: '构建JSON',
            value: null
          }
        ],
      }
    },
    {
      path: 'speed',
      name: 'jsonspeed',
      component: () => import('@views/jsonFile/speed'),
      meta: {
        breadcrumb: [
          {
            label: '构建JSON进度',
            value: null
          }
        ],
      }
    },
  ]
}
