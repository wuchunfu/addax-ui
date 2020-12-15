<template lang="pug">
  .setup
    //- <hot-table :settings="hotSettings"></hot-table>
    el-row
      el-input(v-model="rowNumber")
      el-button(@click="rowNumberClick" type="primary" size="small") 确定
    <hot-table :data="tableData" width='100%' :colHeaders="colHeaders" :columns="columns" :manualRowResize='true' :copyable='true' :settings="hotSettings" :after-change="afterChange" :rowHeights="40" :colWidths="150" className="htCenter htMiddle notread" ref="hotTableComponent">
    </hot-table>

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
        tableData: [
        ],
        colHeaders: ["序号", "源表schema", "源表名称", "目标表schema", "目标表名称", "是否新增目标表"],
        columns: [{
            editor: false,
            readOnly: true
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
          },
          {
            type: 'numeric'
          }
        ],
        rowHeaders: [],
        hotSettings: {
          //数据部分，这个就不多说了
          // data: Handsontable.helper.createSpreadsheetData(6, 10),
          // colHeaders: true
          data: []
        }
      }
    },
    components: {
      HotTable
    },
    methods: {
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
      dataClick () { //数据库tab

      },
      deployClick() { // 配置tab

      },
      dataNext () { //数据库下一步
        this.active++
        this.$refs['carousel'].next()
      },
      dataprev () {
        this.active--
        this.$refs['carousel'].prev()
      },
      handleQuery() {
          console.log("---search", this.queryParams)
      },
      save() {
          console.log("---save", this.tableData)
      },
      afterChange: function (changes, source) {
        console.log(changes, source)
          // if (source == 'CopyPaste.paste' || source == 'edit') {
          //   console.log(changes);
          //   changes.forEach(([row, prop]) => {
          //     //this 表示当前的handsontable对象
          //     let cell = this.$refs.hotTableComponent.hotInstance.getCell(row, prop);
          //     console.log(cell)
          //     cell.style.setProperty("background-color","#ffffff","important");
          //     // cell.style.backgroundColor = '#ffffff';
          //   });
          // }
          
      },
      /** 查询菜单列表 */
      getList() {
      },
      mergeCell(changes) {
        // 有变化
        if (changes) {
          // 遍历变化行数
          changes.forEach(([row]) => {
            // 只对3的倍数行进行合并
            //这里条件判断可以写复杂一点，确保粘贴非3倍数时候的处理，我偷懒所以。。
            if ((row / 3) === this.hotSettings.mergeCellsCount) {
              // 合并处理
              this.hotSettings.mergeCells.push({
                row: row,
                col: 0,
                rowspan: 3,
                colspan: 1
              }, {
                row: row,
                col: 24,
                rowspan: 3,
                colspan: 1
              });
              // 只合并一次提高运行效率，不然粘贴大量数据多次合并会卡
              this.hotSettings.mergeCellsCount++
            }
          });
        }
      }
    },
    mounted () {
      Handsontable.hooks.add("afterChange", function (result) {
        console.log("-result", result)
      })
    }
  }
</script>

<style lang='sass' scoped>
.setup
  background: #f1f1f1
  position: relative
  /deep/ .handsontable td.htInvalid
    background-color: #ffffff !important
  &-box
    background: #ffffff
    margin-top: 10px
    box-sizing: border-box
    min-height: calc(100vh - 246px) 
    .setup-item
      padding:  10px
      .pane-box
        padding-top: 20px
</style>
