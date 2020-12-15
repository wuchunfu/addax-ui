<template lang="pug">
  .yc-table
    search-bar(
    :query='table.query',
    :init="table.init",
    :search-data='table.searchData',
    v-if="table.searchData && table.searchData.length > 0"
    @on-search-change='doSearch' @on-refresh-change='doRefresh')
      //- el-button(type="primary", slot="after") 新增
      span(slot="before")
        slot(name="ctrl-button")
    .table-desc(v-if="table.desc") {{table.desc}}
    el-table(
    stripe,
    :show-header='!table.hideHeader',
    tooltip-effect='dark',
    :data='table.data',
    :row-key="getRowKey",
    ref="ycTable",
    v-loading='table.loading',
    :header-cell-style='{"background": "#F5F7FA"}',
    element-loading-text='数据加载中...',
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange")
      el-table-column(type="selection", width="50", :reserve-selection="true" v-if="table.columns && table.columns.some(t => t.type === 'selection')")
      el-table-column(type="index", width="50", v-if="table.columns && table.columns.some(t => t.type === 'index')")
      el-table-column(
      v-for="(column, idx) in (table.columns && table.columns.filter(t => t.type !== 'selection' && t.type !== 'index'))",
      :key='idx',
      :type='column.type',
      :label='column.title',
      :width='column.width',
      :fixed='column.fixed',
      :align="column.align || 'left'",
      :sortable="column.sortable ? 'custom' : false",
      :sort-orders="['descending','ascending','descending']",
      :show-overflow-tooltip='column.showTooltip')
        template(v-if="!column.chlidren && column.type !== 'selection' && column.type !== 'index'", slot-scope='scope')
          cell(
          v-if="column.render"
          :column='column',
          :row='scope.row',
          :index='scope.$index',
          :render='column.render')

          span(v-else-if="column.filter") {{$filters[column.filter](scope.row[column.key])}}
          span(v-else-if="column.enumType") {{$enums[column.enumType].getName(scope.row[column.key]) || ''}}
          img(:src="scope.row[column.key]" v-else-if="column.img&&scope.row[column.key]" style="width: 120px;height: 70px")
          span(v-else-if="column.img&&scope.row[column.key]") ''
          p(v-else-if="column.richText" v-html="scope.row[column.key] || ''")
          span(v-else-if="column.number") {{scope.row[column.key] || 0}}
          span(v-else-if="!column.filter && !column.enumType") {{scope.row[column.key] || ''}}
         
          cell(v-else,
          :column='column',
          :row='scope.row',
          :index='scope.$index',
          :render='column.render')
        el-table-column(
        v-if="column.children"
        v-for="(columnChild, idxChild) in column.children"
        :key='idxChild',
        :type='columnChild.type',
        :label='columnChild.title',
        :width='columnChild.width',
        :fixed='columnChild.fixed',
        :align="columnChild.align || 'left'",
        :show-overflow-tooltip='columnChild.showTooltip')
          template(v-if="columnChild.type !== 'selection'", slot-scope='scope')
            cell(
            v-if="columnChild.render"
            :column='columnChild',
            :row='scope.row',
            :index='scope.$index',
            :render='columnChild.render')
            span(v-else-if="columnChild.filter") {{$filters[columnChild.filter](scope.row[columnChild.key])}}
            span(v-else-if="columnChild.enumType") {{$enums[columnChild.enumType].getName(scope.row[columnChild.key]) || ''}}
            span(v-else-if="!columnChild.filter && !columnChild.enumType") {{scope.row[columnChild.key] || ''}}
            span(v-else-if="columnChild.number") {{scope.row[columnChild.key] || 0}}
            cell(v-else,
            :columnChild='columnChild',
            :row='scope.row',
            :index='scope.$index',
            :render='columnChild.render')
    el-pagination.pagination(
    v-if="table.pagination"
    background
    layout="total, prev, pager, next, sizes, jumper",
    :total="table.pagination.total",
    :current-page.sync="table.pagination.pageNum",
    :page-size.sync="table.pagination.pageSize",
    :page-sizes="[10, 20, 30, 40, 50]"
    @size-change="sizeChange"
    @current-change="$search(table)")
</template>

<script>
import cell from './cell'

export default {
  components: {
    cell
  },
  props: {
    table: {
      type: Object,
      required: true
    }
  },
  created () {
    this.table.columns = this.table.columns.filter(t => t)
    this.$set(this.table, 'loading', false)
    if (!this.table.hidePagination) {
      this.$set(this.table, 'pagination', {
        pageNum: 1,
        pageSize: 10,
        total: 0
      })
    }
  },
  // watch: {
  //   table:{
  //     handler(val) {
  //       console.log(val)
  //       if (val.selection.done && val.selection.done.length > 0 && val.data && val.data.length> 0 && val.ref) {
  //             console.log(val.selection)
  //             val.data.forEach((row) => {
  //               if (val.selection.done.includes(row.selectId)) {  
  //                 this.$refs[val.ref].toggleRowSelection(row, true);
  //               }
  //           })
  //       }
  //     },
  //     deep: true, // 深度监听
  //     immediate: true, // 初次监听即执行  
  //   }
  // },
  methods: {
    getRowKey (row) {
      if (this.table.rowkey) {
        return row[this.table.rowkey]
      }
    },
    doSearch (query) {
      this.table.pagination.pageNum = 1
      this.table.pagination.pageSize = 10
      this.table.query = query
      this.$search(this.table)
    },
    doRefresh (query) {
      this.table.pagination.pageNum = 1
      this.table.pagination.pageSize = 10
      this.table.query = query
      this.$refs['ycTable'].clearSelection()
      this.$refs['ycTable'].clearSort()
      if (this.table.selection) {
        if (this.table.selection.done) {
          this.table.selection.done = []
        }
        if (this.table.selection.init) {
          this.table.selection.init = this.table.selection.init.map(item => {
            return {selectId: item.selectId, flag: 0}
          })
        }
      }
      this.$search(this.table)
    },
    sizeChange () {
      this.table.pagination.pageNum = 1
      this.$search(this.table)
    },
    handleSelectionChange (val) {
      // if (this.table.flag) return false
      this.$emit('selection-change', val)
    },
    handleSortChange (column) { //排序
      // console.log(column,prop,order)
      let val = ''
      if (column.order === 'descending') {
        val = 2
      }
      if (column.order === 'ascending') {
        val = 1
      }
      this.$emit('sort-change', val)
    }
  }
}
</script>

<!--@formatter:off-->
<style lang='sass'>
  .el-tooltip__popper
    max-width: 40%
  .el-table--border th.gutter:last-of-type
    display: block!important;
  .yc-table
    // border-radius: 5px
    background: #fff
  .table-desc
    text-align: right
    margin-right: 20px
  .el-table
    padding: 0 $defaultGap
    &__header-wrapper
      border-bottom: 1px solid $primaryColor
    thead
      color: #333
      background: $gray-default
    .el-table__empty-block
      width: 100% !important
  .pagination
    margin-top: $defaultGap
    text-align: center
    background: #fff
</style>
