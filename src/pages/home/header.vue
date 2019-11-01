<template>
  <me-navbar class="header" title="title" v-show="visible">
    <i class="iconfont" slot="left">&#xe60b;</i>
    <!--        <i class="iconfont" slot="center">&#xe649;</i>-->
    <div slot="center">搜索框</div>
    <i class="iconfont" slot="right">&#xe670;</i>
  </me-navbar>
</template>

<script>
import MeNavbar from 'base/navbar'
export default {
  name: 'HomeHeader',
  components: {
    MeNavbar
  },
  data () {
    return {
      visible: true
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins";
  .header{
    &.mine-navbar{
      background-color: transparent;
      transition: background-color .5s;
      /*background-color: #fff;*/
    }
    &.header-transition{
      background-color: $header-bgc-translucent;

      }
  .iconfont{
    color: $icon-color-default;
    font-size: $icon-font-size;
  }
}
</style>
