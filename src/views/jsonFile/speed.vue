<template lang="pug">
  .appt-box
    yc-table(:table="table")
    right-popup(:closeOnClickMask="true" v-model="errorDialogVis" :loading="loading" width="600px" :title="errorDialogTit")
      div(slot="body")
        p {{errorMsg}}
</template>

<script>
  export default {
    data (vm) {
      return {
        errorDialogTit: '错误信息',
        errorDialogVis: false,
        table: {
          api: vm.$apis.taskList,
          query: {
            resultStatus: null, //执行结果
            subTaskId: null, //任务批次号
            tableName: null, //表名称
            tableSchema: null, //表schema
            startTime: null, //开始时间
            endTime: null //结束时间
          },
          searchData: [{
            title: '任务批次号',
            model: 'subTaskId',
            type: 'input',
            placeholder: '请输入',
            width: '200px',
            maxlen: 30
          },{
            title: '表schema',
            model: 'tableSchema',  //sourceStatus
            type: 'input',
            placeholder: '请输入',
            width: '200px',
            maxlen: 30
          },{
            title: '表名',
            model: 'tableName',  //sourceStatus
            type: 'input',
            placeholder: '请输入',
            width: '200px',
            maxlen: 30
          },{
            title: '执行结果',
            model: 'resultStatus',
            type: 'select',
            enumType: 'resultStatus',
            placeholder: '请输入',
            width: '200px'
          },{
            title: '任务开始时间',
            model: 'startTime',
            type: 'date',
            dateType: 'datetime'
          },{
            title: '任务更新时间',
            model: 'endTime',
            type: 'date',
            dateType: 'datetime'
          }],
          columns: [{
            title: '任务批次号',
            key: 'subTaskId',
            showTooltip: true
          }, {
            title: '源表schema',
            key: 'sourceTableSchema',
            showTooltip: true
          }, {
            title: '源表名称',
            key: 'sourceTableName',
            showTooltip: true
          }, {
            title: '目标表schema',
            key: 'targetTableSchema',
            showTooltip: true
          }, {
            title: '目标表名称',
            key: 'targetTableName',
            showTooltip: true
          },{
            title: '是否新增目标表',
            key: 'isAddTargetTableFlag',
            showTooltip: true,
            render: function (h, ctx) {
              let list = []
              if (ctx.row.isAddTargetTableFlag === 1) {
                list.push(h('span', {}, '是'))
              }else {
                list.push(h('span', {}, '否'))
              }
              return list
            }
          },{
            title: '任务开始时间',
            key: 'beginTime',
            showTooltip: true,
            width: 160
          },{
            title: '任务更新时间',
            key: 'updateTime',
            showTooltip: true,
            width: 160
          },{
            title: '执行结果',
            render (h, ctx) {
              if (ctx.row.resultStatus >= 0) {
                return h('el-tag',{
                  attrs: {
                    type: vm.$enums['resultStatus'].getTag(ctx.row.resultStatus)
                  }
                }, vm.$enums['resultStatus'].getName(ctx.row.resultStatus))
              }
            }
          },{
            title: '操作',
            fixed: 'right',
            width: 80,
            render: function (h, ctx) {
              let list = []
              if (ctx.row.resultStatus === 2) {
                list.push(h('el-button', {
                  attrs: {
                    type: 'text'
                  },
                  on: {
                    click: vm.goError.bind(this, ctx.row)
                  }
                }, '查看'))
              }
              return list
            }
          }] 
        },
        errorMsg: '',
        loading: false
      }
    },
    methods: {
      goError(row) {
        this.errorMsg = row.failReason
        this.errorDialogVis = true
      }
    },
    mounted () {
      this.$search(this.table)
    }
  }
</script>

<style lang='sass' scoped>
</style>
