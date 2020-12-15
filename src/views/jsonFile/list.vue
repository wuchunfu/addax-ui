<template lang="pug">
  .appt-box
    yc-table(:table="table")
      span(slot="ctrl-button")
        //- el-button(type="primary", @click="entev") 申请应用
    right-popup(:closeOnClickMask="true" v-model="jsonDialog" :loading="loading" width="615px" :title="popupTitle")
      div(slot="body" class="edit-box" v-if="jsonFlag === 'edit'")
        json-editor(:json="json" @getJsonVal="getJsonVal")
      div(slot="body" class="detail-box" v-if="jsonFlag === 'detail'")
        pre {{json}}
</template>

<script>
  export default {
    data (vm) {
      return {
        loading: false,
        jsonDialog: false,
        json: '',
        jsonFlag: '',
        popupTitle: '查看JSON',
        table: {
          api: vm.$apis.jsonList,
          query: {
            userName: null, 
            jsonName: null,
            startTime: null,
            endTime: null
            // orderby: 'createdTime desc'
          },
          searchData: [{
            title: 'JSON文件名',
            model: 'jsonName',
            type: 'input',
            placeholder: '请输入',
            clear: true,
            maxlen: 30
          },{
            title: '创建人',
            model: 'userName',
            type: 'input',
            placeholder: '请输入',
            clear: true,
            maxlen: 30
          },{
            title: 'JSON生成时间',
            type: 'dateSection',
            model: 'jsonTime',
            modelName: ['startTime', 'endTime']
          }],
          columns: [{
            title: '序号',
            key: 'number',
            width: '60px'
          }, {
            title: 'JSON文件名',
            key: 'jsonName',
            showTooltip: true
          }, {
            title: '创建人',
            key: 'userName',
            showTooltip: true,
          }, {
            title: 'JSON文件描述',
            key: 'jsonDesc',
            showTooltip: true
          },{
            title: 'JSON生成时间',
            key: 'createTime',
            showTooltip: true,
          },{
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
                  click: vm.goLook.bind(this, ctx.row)
                }
              }, '查看'))
              list.push(h('el-button', {
                attrs: {
                  type: 'text'
                },
                class: {
                  blue: true
                },
                on: {
                  click: vm.goEdit.bind(this, ctx.row)
                }
              }, '编辑'))
              return list
            }
          }]
        }
      }
    },
    methods: {
      // entev() {
      //   let obj = 
      //   console.log(JSON.stringify(obj))
      // },
      goLook (row) { //查看某一条数据
        console.log(row)
        this.json = JSON.parse(row.json)
        this.jsonFlag = 'detail'
        this.popupTitle = '查看' + row.jsonName + 'JSON'
        this.jsonDialog = true
      },
      goEdit (row) { //编辑某一条数据
        this.json = JSON.parse(row.json)
        this.jsonId = row.jsonId
        this.jsonFlag = 'edit'
        this.popupTitle = '编辑' + row.jsonName + 'JSON'
        this.jsonDialog = true
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
      },
      async getJsonVal (val) {
        console.log(val)
        if (this.jsonId) {
          let obj = {
            jsonId: this.jsonId,
            json: JSON.stringify(val)
          }
          try {
            await this.$post(this.$apis.updateJson, obj)
            this.$message({
                type: 'success',
                message: '修改成功!'
            })
            this.jsonDialog = false
            this.$search(this.table)
          } catch(e) {
            console.log(e)
          }
        } else {
          return false
        }
      }
    },
    mounted () {
      this.$search(this.table)
    }
  }
</script>

<style lang='sass' scoped>
</style>
