<template lang="pug">
  .appt-box
    yc-table(:table="table")
      span(slot="ctrl-button")
        //- el-button(type="primary", @click="$router.push('/adminApply/appaform')") 申请应用
</template>

<script>
  export default {
    data (vm) {
      return {
        remark: '',
        visible: false,
        submitting: false,
        formInfo: {},
        table: {
          api: vm.$apis.userAppliList,
          query: {
            appName: null,
            appId: null,
            appStatus: null
            // orderby: 'createdTime desc'
          },
          searchData: [{
            title: '应用名称',
            model: 'appName',
            type: 'input',
            placeholder: '请输入',
            width: '200px'
          },{
            title: 'AppId',
            model: 'appId',
            type: 'input',
            placeholder: '请输入',
            width: '200px'
          },{
            title: '应用状态',
            type: 'select',
            model: 'appStatus',
            enumType: 'ApplyStatus',
            placeholder: '请选择'
          }],
          columns: [{
            title: '序号',
            key: 'number',
            width: '60px'
          }, {
            title: '应用名称',
            key: 'appName',
            showTooltip: true
          }, {
            title: 'AppId',
            key: 'appId',
            showTooltip: true,
          }, {
            title: 'AppKey',
            key: 'appKey',
            showTooltip: true
          }, {
            title: '应用状态',
            // key: 'appStatus',
            // showTooltip: true,
            // enumType: 'ApplyStatus'
            render (h, ctx) {
              return h('el-tag',{
                attrs: {
                  type: vm.$enums['ApplyStatus'].getTag(ctx.row.appStatus)
                }
              }, vm.$enums['ApplyStatus'].getName(ctx.row.appStatus))
            }
          }, {
            title: '应用类型',
            key: 'appType',
            showTooltip: true,
            enumType: 'ApplyType'
          },{
            title: '所属用户',
            key: 'userName',
            showTooltip: true,
          },{
            title: '创建时间',
            key: 'createTime',
            showTooltip: true,
          }, {
            title: '更新时间',
            key: 'modifyTime',
            showTooltip: true
          }, {
            title: '操作',
            fixed: 'right',
            render: function (h, ctx) {
              let list = []
              list.push(h('el-button', {
                attrs: {
                  type: 'text'
                },
                class: {
                  green: true
                },
                on: {
                  click: vm.goLook.bind(this, ctx.row.appId)
                }
              }, '查看'))
              if (ctx.row.appStatus === 2 || ctx.row.appStatus === 1) {
                list.push(h('el-button', {
                  attrs: {
                    type: 'text'
                  },
                  class: {
                    blue: true
                  },
                  on: {
                    click: vm.goEdit.bind(this, ctx.row.appId)
                  }
                }, '编辑'))
              }
              if (ctx.row.appStatus === 1) {
                list.push(h('el-button', {
                  attrs: {
                    type: 'text'
                  },
                  class: {
                    red: true
                  },
                  on: {
                    click: vm.goDelete.bind(this, {appId: ctx.row.appId, appName: ctx.row.appName})
                  }
                }, '删除'))
              }
              return list
            }
          }]
        }
      }
    },
    methods: {
      goLook (appId) { //查看某一条数据
        this.$router.push({
          path: '/adminApply/message',
          query: {appId}
        })
      },
      goEdit (appId) { //编辑某一条数据
        this.$router.push({
          path: '/adminApply/appeform',
          query: {appId}
        })
      },
      goDelete ({appId, appName}) {
        console.log(appName) //删除数据
        this.$confirm('请确认是否删除该应用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            await this.$post(this.$apis.userAppliDel, {appId})
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$search(this.table)
        })
      }
    },
    mounted () {
      this.$search(this.table)
    }
  }
</script>

<style lang='sass' scoped>
</style>
