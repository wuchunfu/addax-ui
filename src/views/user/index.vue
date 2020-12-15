<template lang="pug">
  .appt-box
    yc-table(:table="table")
</template>

<script>
  export default {
    data (vm) {
      return {
        table: {
          api: vm.$apis.userList,
          query: {
          },
          searchData: [],
          columns: [{
            title: '序号',
            key: 'number',
            showTooltip: true
          }, {
            title: '用户名',
            key: 'userName',
            showTooltip: true,
          }, {
            title: '角色',
            key: 'roleType',
            showTooltip: true,
            enumType: 'roleStatus'
          }]
        },
      }
    },
    methods: {
      
    },
    mounted () {
      this.$search(this.table)
    }
  }
</script>

<style lang='sass' scoped>
</style>
