<template>
  <div>
    <div class="header">
      <div class="header-box">
        123
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.header
  width: 100px
  height: 40px
  background: red
  &-box
    color: white
</style>
