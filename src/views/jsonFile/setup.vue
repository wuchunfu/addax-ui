<template lang="pug">
  .setup
    Steps(:active="active" :labels="stepsLabel")
    .setup-box
      .pane-box
        div(style="width: 440px")
          sub-title(name="reader配置")
          el-form(:model="readerData.data" label-width="120px" ref="readerForm")
            el-form-item(:label="item.label" :prop="item.model" v-for="(item, index) in readerData.form" :key="item.model" :rules="item.require" )
              el-input(v-model="readerData.data[item.model]" :placeholder="item.placeholder" v-if="item.type === 'input'" :disabled="item.disabled")
              el-input(v-model="readerData.data[item.model]" type="textarea" :rows="4" :placeholder="item.placeholder" v-else-if="item.type === 'textarea'" :disabled="item.disabled")   
              div(v-else-if="item.type === 'select' && item.enumType")
                el-select(v-model="readerData.data[item.model]" placeholder="请选择"  v-if="!item.enumValue" @change="(val) => readerFormChange(val, item)" :disabled="item.disabled")
                  el-option(v-for="i in $enums[item.enumType].list" :label="i.label" :value="i.value" :key="i.value")
                el-select(v-model="readerData.data[item.model]" placeholder="请选择"  v-else :disabled="item.disabled")
                  el-option(v-for="i in $enums[item.enumType].getName(readerData.data[item.enumValue])" :label="i" :value="i" :key="i")  
          sub-title(name="writer配置")
          el-form(:model="writerData.data" label-width="120px" ref="writerForm")
            el-form-item(:label="item.label" :prop="item.model" v-for="(item, index) in writerData.form" :key="item.model" :rules="item.require" )
              el-input(v-model="writerData.data[item.model]" :placeholder="item.placeholder" v-if="item.type === 'input'" :disabled="item.disabled")
              el-input(v-model="writerData.data[item.model]" type="textarea" :rows="4" :placeholder="item.placeholder" v-else-if="item.type === 'textarea'" :disabled="item.disabled")
              div(v-else-if="item.type === 'select' && item.enumType")
                el-select(v-model="writerData.data[item.model]" placeholder="请选择"  v-if="!item.enumValue"  @change="(val) => writerFormChange(val, item)" :disabled="item.disabled")
                  el-option(v-for="i in $enums[item.enumType].list" :label="i.label" :value="i.value" :key="i.value")
                el-select(v-model="writerData.data[item.model]" placeholder="请选择"  v-else :disabled="item.disabled")
                  el-option(v-for="i in $enums[item.enumType].getName(writerData.data[item.enumValue])" :label="i" :value="i" :key="i")  
        sub-title(name="复制数据")
        el-row(style="margin-bottom: 15px")
          el-button(type="primary" size="small" @click="sourceDialogVis = true") 添加源表字段
          el-button(type="primary" size='small' plain @click="clearHotTable") 清空 
        .table-box
          <hot-table :data="tableData" :rowHeaders="true" :columnHeaderHeight="40" width='100%' :colHeaders="colHeaders" :columns="columns" :manualRowResize='true' :copyable='true' :settings="hotSettings" :after-change="afterChange" :rowHeights="40" :colWidths="150" className="htCenter htMiddle notread" ref="hotTableComponent" licenseKey="non-commercial-and-evaluation" :contextMenu="true" :renderAllRows="true">
          </hot-table>
        el-row(style="display:flex; justify-content: center; margin-top:40px; padding: 20px 0;box-shadow:0px -5px 10px -5px #f1f1f1;")
            el-button(type="primary" @click="dataprev") 上一步
            el-button(type="primary" @click="dataNext") 下一步
    right-popup(:closeOnClickMask="true" v-model="sourceDialogVis" :loading="loading" width="615px" :title="sourceDialogTit")
      div(slot="body")
        el-row
          el-button(type="primary" size="small" icon="el-icon-plus" @click="addFieldEvent") 新增
          el-button(type="info" size="small" icon="el-icon-minus" @click="deleteFieldEvent") 删除
        .inner-box
          el-table(style="width: 100%" :data="fieldTable" tooltip-effect="dark" @selection-change="fieldSelectionChange")
            template(slot="empty")
              span(style="color: #969799;") 暂无字段
            el-table-column(type="selection" width="55" align="center")
            el-table-column(label="序号" align="center" width="50")
              template(slot-scope="scope")
                span {{scope.row.id}}
            el-table-column(label="字段类型" align="center")
              template(slot-scope="scope")
                el-select(v-model="scope.row.fieldType")
                  el-option(v-for="i in $enums['fieldType'].list" :key="i.value" :label="i.label" :value="i.value")
            el-table-column(label="字段值" align="center")
              template(slot-scope="scope")
                el-input(type="text" v-model="scope.row.fieldValue")
        el-row(type="flex" justify="center" style="margin-top: 40px")
          el-button(type="primary" @click="fieldSubmit") 保存
          el-button(@click="sourceDialogVis = false") 取消
    right-popup(:closeOnClickMask="true" v-model="jsonDialogVis" :loading="jsonLoading" width="1000px" :title="jsonDialogTit" @mask-click="jsonMaskClick")
      div(slot="body")
        el-table(:data="jsonTaskTable" height="500" v-loading="jsonTaskTableLoading")
          el-table-column(label="源表schema" align="center" prop="sourceTableSchema")
          el-table-column(label="源表名称" align="center" prop="sourceTableName")
          el-table-column(label="目标表schema" align="center" prop="targetTableSchema")
          el-table-column(label="目标表名称" align="center" prop="targetTableName")
          el-table-column(label="是否新增目标表" align="center" prop="isAddTargetTableFlag")
            template(slot-scope="scope")
              span {{scope.row.isAddTargetTableFlag === 1 ? '是' : '否'}}
          el-table-column(label="结果" align="center" prop="resultStatus")
            template(slot-scope="scope")
              el-tag(type="success" v-if="scope.row.resultStatus === 1") 成功
              el-tag(type="danger" v-else-if="scope.row.resultStatus === 2") 失败
              el-tag(type="info" v-else="scope.row.resultStatus === 0") 未完成
          el-table-column(label="错误信息" align="center" prop="failReason")
            template(slot-scope="scope")
              el-button(type="primary" size="small" v-if="scope.row.resultStatus === 2" @click="lookError(scope.row.failReason)") 查看
        el-row(type="flex" justify="center" style="margin-top: 40px")
          el-button(type="primary" @click="createJson") 生成JSON
    right-popup(:closeOnClickMask="true" v-model="errorDialogVis" :loading="loading" width="600px" :title="errorDialogTit")
      div(slot="body")
        p {{errorMsg}}
</template>

<script>
 import {
    HotTable
  } from '@handsontable/vue'
  import Handsontable from 'handsontable'
  export default {
    data () {
      return {
        rowNumber: '',
        active: 2,
        tabActive: 1,
        columnSorting: true,
        loading: false,
        jsonLoading: false,
        sourceDialogVis: false,
        loadingInstance: false,
        jsonTaskTableLoading: false,
        sourceDialogTit: '添加源表字段',
        jsonDialogVis: false,
        jsonDialogTit: '构建JSON任务',
        jsonTaskTable: [],
        errorDialogVis: false,
        errorDialogTit: '错误信息',
        errorMsg: '',
        stepsLabel:['数据库', '构建JSON', '生成JSON'],
        taskId: '',
        tabs: [
          {label: '1'},
          {label: '2'},
          {label: '3'}
        ],
        //配置
        deployName: 'reader',
        writerModelArr: [
          {label: 'insert', value: 'insert'},
          {label: 'replace', value: 'replace'},
          {label: 'update', value: 'update'}
        ],
        deployData: {
          session: '',
          fetchSize: '',
          splikPk: '',
          querySql: '',
          where: ''
        },
        deployRules: {},
        readerData: {
          name: '',
          form: [],
          data: {}
        },
        writerData: {
          name: '',
          form: [],
          data: {}
        },
        // 复制的表格
        tableData: [],
        tableList: [],
        colHeaders: ["源表schema", "源表名称", "目标表schema", "目标表名称", "是否新增目标表"],
        columns: [  
          // {
          //   editor: false,
          //   readOnly: true
          // },
          {
            type: 'numeric'
          },
          {
            type: 'numeric'
          },
          {
            type: 'numeric'
          },
          {
            type: 'numeric'
          },
          {
            type: 'numeric'
          }
        ],
        contextMenu:['row_above', 'row_below', 'remove_row'],
        rowHeaders: [],
        hotSettings: {
          //数据部分，这个就不多说了
          data: []
        },

        //添加源表字段
        fieldTable: [],
        selectParams: [],
        selectField: [],
        timer: null
      }
    },
    components: {
      HotTable
    },
    methods: {
      jsonMaskClick () {
        console.log(1)
        window.clearInterval(this.timer)
      },
      readerFormChange (val, i) {
        if (i.model === 'haveKerberos') {
          this.$refs.readerForm.clearValidate()
          let pathIndex = this.readerData.form.findIndex(item => item.model === 'kerberosKeytabFilePath')
          let ipalIndex = this.readerData.form.findIndex(item => item.model === 'kerberosPrincipal')
          this.readerData.form[pathIndex].require = val ? [{required: true, message: '请输入' + this.readerData.form[pathIndex].label, trigger: ['blur', 'change']}] : []
          this.readerData.form[ipalIndex].require = val ? [{required: true, message: '请输入' + this.readerData.form[ipalIndex].label, trigger: ['blur', 'change']}] : []
          this.readerData.form[pathIndex].disabled = val ? false : true
          this.readerData.form[ipalIndex].disabled = val ? false : true
        }
      },
      writerFormChange(val, i) {
        if (i.model === 'haveKerberos') {
          this.$refs.writerForm.clearValidate()
          let pathIndex = this.writerData.form.findIndex(item => item.model === 'kerberosKeytabFilePath')
          let ipalIndex = this.writerData.form.findIndex(item => item.model === 'kerberosPrincipal')
          this.writerData.form[pathIndex].require = val ? [{required: true, message: '请输入' + this.writerData.form[pathIndex].label, trigger: ['blur', 'change']}] : []
          this.writerData.form[ipalIndex].require = val ? [{required: true, message: '请输入' + this.writerData.form[ipalIndex].label, trigger: ['blur', 'change']}] : []
          this.writerData.form[pathIndex].disabled = val ? false : true
          this.writerData.form[ipalIndex].disabled = val ? false : true
        }
      },
      fieldSubmit () { //保存字段
        console.log(this.fieldTable)
        this.sourceDialogVis = false
      },
      fieldSelectionChange (val) {
        console.log(val)
        this.selectField = val
      },
      addFieldEvent () { //新增字段
        let len = this.fieldTable.length
        let obj = {id: len + 1, fieldType: 'String', fieldValue: ''}
        this.fieldTable.push(obj)
      },
      deleteFieldEvent () { //删除字段
        let ids = this.selectField.map(item => item.id)
        // console.log(ids)
        if (ids && ids.length > 0) {
          this.$confirm('确定删除这些字段吗？', '提示', { type: 'warning' }).then(() => {
            ids.forEach(item => {
              this.fieldTable = this.fieldTable.filter(_p => _p.id !== item)
            })
            this.fieldTable.forEach((item, index) => {
              item.id = index + 1
            })
            // console.log(this.paramTable)
          }) 
        } else {
          this.$message.warning('请选择要删除的字段')
        }
      },
      rowNumberClick () {
        if (this.rowNumber && this.rowNumber > 0) {
          for (let i = 0; i < this.rowNumber; i++) {
            let obj = [i + 1, '', '', '', '', '']
            this.tableData.push(obj)
          }
        } else {
          return false
        }
      },
      tableDataEvent () {
        let flag = 0
        this.tableList = []
        this.tableData.forEach(item => {
          for(let i = 0; i<item.length; i++) {
            if (!item[i]) {
              flag ++ 
            }
          }
          let obj = {
            sourceTableSchema: item[0],
            sourceTableName: item[1],
            targetTableSchema: item[2],
            targetTableName: item[3],
            isAddTargetTableFlag: item[4] === '是' ? 1 : 0
          }
          this.tableList.push(obj)
        })
        return flag
      },
      dataNext () { //数据库下一步
        console.log(this.tableData)
        this.$refs['readerForm'].validate((readervalid) => {
          this.$refs['writerForm'].validate(async (writervalid) => {
            if (readervalid && writervalid) {
              this.loadingInstance = this.$loading({
                target: '.app-body__router',
                text: '数据加载中...',
              })
              let readerFormVal = this.readerData.requestData()
              let writerFormVal = this.writerData.requestData()
              console.log(readerFormVal, writerFormVal)
              let readSourceConfigId = this.$route.query.readSourceConfigId
              let targetSourceConfigId = this.$route.query.writerSourceConfigId
              let readerStr = JSON.stringify(readerFormVal)
              let writerStr = JSON.stringify(writerFormVal)
              let sourceTableList = this.fieldTable.map(item => {
                return {
                  fieldType: item.fieldType,
                  fieldValue: item.fieldValue
                }
              })
              // this.tableData.forEach(item => {
              //   if (item[0] && )
              // })
              let flag = this.tableDataEvent()
              if (flag > 0) {
                this.$message.warning('复制数据列表每个单元格不能为空')
                this.tableList = []
                this.loadingInstance.close()
                return false
              }
              let tableList = this.tableList
              let obj = {
                readSourceConfigId,
                targetSourceConfigId,
                readerStr,
                writerStr,
                sourceTableList,
                tableList
              }
              console.log(obj)
              let resp = await this.$post(this.$apis.generateJson, obj)
              console.log(resp)
              this.$message.success(resp.returnMsg)
              this.loadingInstance.close()
              this.jsonDialogVis = true
              this.roundTask(resp.data)
            } else {
              this.$message.warning('请输入必填项')
              return false
            }
          })
        })
      },
      roundTask (randomStr) {
        this.timer = window.setInterval(() => {
          setTimeout(async ()=>{
            try {
              this.jsonTaskTableLoading = true
              let info = await this.$post(this.$apis.jsonProcess, {randomStr: randomStr})
              console.log(info)
              this.jsonTaskTable = info.data.processVoList
              this.taskId = info.data.taskId
              this.jsonTaskTableLoading = false
              if (info.data.processStatus === 1) {
                window.clearInterval(this.timer)
              }
            } catch(e) {
              window.clearInterval(this.timer)
              console.log(e)
            }
          }, 0)
        }, 500)
      },
      createJson () { //生成Json
        let taskId = this.taskId
        if (taskId) {
          this.$router.push({name: 'producejson', query: {taskId}})
          window.clearInterval(this.timer)
          this.jsonDialogVis = false
        } else {
          return false
        }
      },
      dataprev () {
        this.$router.back()
      },
      handleQuery() {
          console.log("---search", this.queryParams)
      },
      save() {
          console.log("---save", this.tableData)
      },
      afterChange: function (changes, source) {
        console.log(changes, source)
        //   if (source == 'edit') {
        //     console.log(changes);
        //     changes.forEach(([row, prop, oldValue, newValue]) => {
        //       //this 表示当前的handsontable对象
        //       let cell = this.getCell(row, prop);
        //       cell.style.background = 'lavender';
        //     });
        //   }
      },
      /** 查询菜单列表 */
      getList() {
      },
      clearHotTable () {
        this.tableData = []
      },
      formjudage() { //得到不同的数据库
        let readerType = this.$route.query.readerType
        let writerType = this.$route.query.writerType
        this.readerData = this.$_.cloneDeep(this.$database.reader[readerType])
        console.log(this.readerData)
        this.writerData = this.$_.cloneDeep(this.$database.writer[writerType])
      },
      readerwrite () {
        
      },
      lookError(error) {
        this.errorMsg = error
        this.errorDialogVis = true
      }
    },
    destroyed() {
      window.clearInterval(this.timer)
    },
    mounted () {
      console.log(this.$route.query)
      this.formjudage()
      // let that = this
      Handsontable.hooks.add("afterChange", function (result, source) {
        console.log(result, source)
      })
      // this.hotSettings.data = this.hotSettings.data.concat([[]]);
      if (this.tableData.length === 0) {
        this.tableData.push(['', '', '', '', ''])
      }
    }
  }
</script>

<style lang='sass' scoped>
.setup
  background: #f1f1f1
  position: relative
  .inner-box /deep/ .el-table__body, ._inner-box .el-table__footer, ._inner-box .el-table__header
    width: auto !important
  .table-box
    width: 820px
    height: 400px
    overflow: hidden
    // box-shadow: 0 5px 10px -5px #f1f1f1
  /deep/ .handsontable
  /deep/ .handsontable td.htInvalid
    background-color: #ffffff !important
  /deep/ .ht_master .wtHolder .wtHider
    // height: auto !important
    // max-height: 1000px
    // overflow-y: scroll
  /deep/ .handsontable .wtHider
    // height: auto !important
  /deep/ .handsontable th, .handsontable td
    line-height: 40px
  &-box
    background: #ffffff
    margin-top: 10px
    box-sizing: border-box
    padding:  10px
    min-height: calc(100vh - 246px)
    .tab-box
      padding: 10px 0
      margin-bottom: 20px
      border-bottom: 1px solid #f1f1f1
      span
        cursor: pointer
        margin: 0 12px
        display: inline-block
        padding: 0 10px
        border-bottom: 2px solid #ffffff
        &.active
          color: #409EFF
          border-bottom: 2px solid #409EFF
    .setup-item
     
      .pane-box
        padding-top: 20px
</style>
