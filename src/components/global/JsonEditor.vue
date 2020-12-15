<template>
  <div class="json-editor-box">
    <vue-json-editor
      v-model="jsonVal" 
      :show-btns="true"   
      :mode="'code'"
      lang="zh"
      @json-change="onJsonChange"
      @json-save="onJsonSave" 
      @has-error="onError">
    </vue-json-editor>
  </div>
</template>
 
<script>
  import vueJsonEditor from 'vue-json-editor'
 
  export default {
    props: {
      json: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        jsonVal: ''
      }
    },
    watch: {
      json: {
        handler(val) {
          this.jsonVal = val
        },
        deep: true,
        immediate: true
      }
    },
    components: {
      vueJsonEditor
    },
 
    methods: {
      onJsonChange (value) {
        console.log('value:', value);
      },
      onJsonSave (value) {
        console.log('value:', value);
        this.$emit('getJsonVal', value)
      },
      onError (value) {
        console.log('value:', value);
      }
    }
  }
</script>
<style lang='sass'>
  .json-editor-box /deep/ div.jsoneditor-menu a.jsoneditor-poweredBy
    display: none
  .json-editor-box /deep/ .jsoneditor-vue
    height: 600px
  .json-editor-box /deep/ .json-save-btn
    padding: 8px 18px
</style>