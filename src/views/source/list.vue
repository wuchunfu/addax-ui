<template lang="pug">
  .appt-box
    yc-table(:table="table" @selection-change="handleSelectionChange" ref="ycTable")
      span(slot="ctrl-button")
        el-button(type="primary", @click="addSource" size="small") 新增
        //- el-button(@click="editSource" size="small" type="primary") 修改
        //- el-button(@click="deleteSource" size="small" type="danger") 删除
    el-dialog(:visible.sync="dataDialogVis" :title="dataDialogTit" width="80%")
      ._inner-box
      span(slot="footer" style="text-align:center;margin-top: 20px; display: block")
        el-button(@click="sourceDialogVis = false" style="margin: 0 20px;") 取消
        el-button(type="primary" @click="sourceSumbit") 确定
    right-popup(:closeOnClickMask="true" v-model="sourceDialogVis" :loading="loading" width="615px" :title="sourceDialogTit")
      div(slot="body")
        el-form(:model="selectData" label-width="120px" :rules="sourceRules" ref="sourceForm" style="width: 440px")
          el-form-item(label="数据源：" prop="sourceConfigName")
            el-input(v-model="selectData.sourceConfigName" placeholder="数据源名称" maxlength="10")  
          el-form-item(label="用户名：" prop="sourceConfigUserName")
            el-input(v-model="selectData.sourceConfigUserName" placeholder="数据源登录用户名" maxlength="10")
          el-form-item(label="密码：" prop="pass")
            el-input(v-model="selectData.pass" placeholder="数据源登录密码" :type="psdShow ? 'text' :'password'" maxlength="20")
              i(slot="suffix" title="显示密码" @click="changPsdShow" style="cursor:pointer;" class="iconfont") {{ psdShow ? '\ue63a':'\ue6b4'}}
          el-form-item(label="数据库类型")
            el-select(v-model="databaseType" @change="databaseChange")
              el-option(v-for="i in $enums['nrdbType'].allList()" :key="i.value" :label="i.label" :value="i.value")
          el-form-item(label="jdbc url：" prop="jdbcUrl")
            el-input(v-model="selectData.jdbcUrl" type="textarea" :rows="3" placeholder="数据库的jdbc连接信息" maxlength="100" show-word-limit :disabled="jdbcUrlFlag")
          el-form-item
            el-button(@click="sourceDialogVis = false") 取消
            el-button(type="primary" @click="sourceSumbit") 保存
</template>

<script>
  export default {
    data (vm) {
      return {
        psdShow: false,
        dataDialogTit: '数据库',
        dataDialogVis: false,
        sourceDialogVis: false,
        sourceDialogTit: '新增数据源',
        selectData: {},
        tablePsdShow: false,
        loading: false,
        databaseType: '',
        jdbcUrlFlag: false,
        table: {
          api: vm.$apis.sourceConfigList,
          query: {
            sourceConfigName: null
          },
          hiddenFields: true,
          searchData: [{
            title: '数据源名称',
            model: 'sourceConfigName',
            type: 'input',
            placeholder: '请输入',
            width: '200px'
          }],
          columns: [{
            title: '序号',
            key: 'number',
            showTooltip: true
          }, {
            title: '数据源',
            key: 'sourceConfigName',
            showTooltip: true
          }, {
            title: '用户名',
            key: 'sourceConfigUserName',
            showTooltip: true
          }, {
            title: '密码',
            render: function (h, ctx) {
              let list = []
              if (ctx.row.hiddenFields) {
                  list.push(h('span', {}, '●●●●●●●●'))
              } else {
                list.push(h('span', {}, ctx.row.pass))
              }
              list.push(h('i', {
                  class: {
                    iconfont: true
                  },
                  style: {
                    cursor: 'pointer',
                    marginLeft: '10px'
                  },
                  on: {
                    click: vm.changeTablePsd.bind(this, ctx.row)
                  }
                }, ctx.row.hiddenFields ?'\ue6b4' : '\ue63a'))
              return list
            }
          }, {
            title: 'jdbcUrl',
            key: 'jdbcUrl',
            showTooltip: true,
            width: '280px'
          },{
            title: '修改时间',
            key: 'updateTime',
            showTooltip: true
          },
          {
            title: '操作',
            fixed: 'right',
            render: function (h, ctx) {
              let list = []
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
              }, '修改'))
              list.push(h('el-button', {
                  attrs: {
                    type: 'text'
                  },
                  class: {
                    red: true
                  },
                  on: {
                    click: vm.goDelete.bind(this, {sourceConfigId: ctx.row.sourceConfigId, sourceConfigName: ctx.row.sourceConfigName})
                  }
                }, '删除'))
                return list;
            }
          }
        ]
          
        },
        sourceRules: {
          sourceConfigName: [{ required: true, message: '请输入数据源', trigger: ['blur','change'] }],
          sourceConfigUserName: [{ required: true, message: '请输入数据源登录用户名', trigger: ['blur','change'] }],
          jdbcUrl: [{ required: true, message: '请输入数据库的jdbc连接信息', trigger: ['blur','change'] }]
        },
      }
    },
    methods: {
      changeTablePsd(row) { //表格密码显隐
        let index = this.table.data.findIndex(item => {
          return item.number === row.number
        })
        if (this.table.data[index].hiddenFields) {
          this.table.data[index].hiddenFields = false
        } else {
          this.table.data[index].hiddenFields = true
        }
        console.log(this.table.data[index])
      },
      databaseChange () {
        if (this.databaseType) {
          this.jdbcUrlFlag = true
          this.selectData.jdbcUrl = this.$enums['nrdbType'].getName(this.databaseType)
        } else {
          this.jdbcUrlFlag = false
          this.selectData.jdbcUrl = ''
        }
      },
      changPsdShow () { //密码的显隐
        this.psdShow = !this.psdShow
      },
      addSource () {  //新增数据源
        this.jdbcUrlFlag = false
        this.selectData = {
          sourceConfigName: '',
          sourceConfigUserName: '',
          pass: '',
          jdbcUrl: ''
        } 
        this.sourceDialogTit = '新增数据源'
        this.sourceDialogVis = true
        this.$refs.sourceForm && this.$refs.sourceForm.resetFields()
      },
      handleSelectionChange(val) {
        console.log(val)
      },
      goEdit (row) { //修改
        console.log(row)
        this.selectData = {
          sourceConfigName: row.sourceConfigName,
          sourceConfigUserName: row.sourceConfigUserName,
          pass: row.pass,
          jdbcUrl: row.jdbcUrl
        }
        this.selectData.sourceConfigId = row.sourceConfigId
        this.sourceDialogTit = '修改数据源'
        this.sourceDialogVis = true
        this.databaseType = row.sourceConfigType
        if (this.databaseType >= 7) {
          this.jdbcUrlFlag = true
        } else {
          this.databaseType = ''
        }
        this.$refs.sourceForm && this.$refs.sourceForm.resetFields()
      },
      goDelete (info) { //删除
      console.log(info)
        this.$confirm('是否删除'+info.sourceConfigName+'数据源?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            await this.$post(this.$apis.delSourceConfig, {sourceConfigId: info.sourceConfigId})
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$search(this.table)
        })
      },
      sourceSumbit () { //提交表单
        this.$refs.sourceForm.validate(async(valid) => {
          if (valid) {
            let info = this.selectData
            let router = this.$apis.saveOrUpdateSource
            try{
              await this.$post(router, info)
              this.$message({
                message: this.selectData.sourceConfigId ? '修改数据源成功' :'新增数据源成功',
                type: 'success'
              })
              this.sourceDialogVis = false
              this.$search(this.table)
            } catch(e) {
              console.log(e)
            }  
          } else {
            return false
          }
        })
      }
    },
    mounted () {
      this.$search(this.table)
      console.log(this.table)
    }
  }
</script>

<style lang='sass' scoped>
</style>
