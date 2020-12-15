<template lang="pug">
  .editor(ref='editor')
</template>

<script>
import E from 'wangeditor'

export default {
  props: {
    content: {
      type: String,
      default () {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default: true
    },
    catchData: {}
  },
  model: {
    prop: 'content',
    event: 'change'
  },
  data () {
    return {
      editor: null,
      info_: null,
      isChange:false
    }
  },
  watch: {
    content: {
      handler() {
        if (this.disabled) {
          if (!this.content) {
            this.editor.txt.html(this.content);
          }
        } else {
          this.editor.txt.html(this.content);
        }
      },
      deep: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.editor = new E(this.$refs.editor)
      console.log(this.editor)
      this.editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'italic',
        'underline',
        'strikeThrough',
        'foreColor',
        'backColor',
        'link',
        'list',
        'justify'
        // 'image',
        // 'table'
      ]
      this.editor.config.zIndex = 100

      this.editor.config.onchange = html => {
        this.isChange = true;
        this.info_ = html 
        this.$emit('catchData', this.info_)
      }
      this.editor.create()
      // this.editor.txt.html(this.content)
      // 禁用编辑器
      this.editor.$textElem.attr('contenteditable', this.disabled)
    })
  }
}
</script>

<!--@formatter:off-->
<style lang='sass' scoped>

</style>
