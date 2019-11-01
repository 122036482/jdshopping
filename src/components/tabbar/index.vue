<template>
    <div class="g-tabbar">
      <router-link to="/home" class="g-tabbar-item">
        <i class="iconfont">&#xe61b;</i>
        <span>首页</span>
      </router-link>
      <router-link to="/category" class="g-tabbar-item">
        <i class="iconfont">&#xe691;</i>
        <span>分类</span>
      </router-link>
      <router-link to="/cart" class="g-tabbar-item">
        <i class="iconfont">&#xe600;</i>
        <span>购物车</span>
      </router-link>
      <router-link to="/personal" class="g-tabbar-item">
        <i class="iconfont">&#xe615;</i>
        <span>个人中心</span>
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'CTabbar'
}
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins";
  .router-link-active{
    color: $link-active-color;
  }

</style>
