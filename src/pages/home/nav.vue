<template>
   <nav class="nav">
     <ul class="nav-list">
       <li class="nav-item" v-for="(item, index) of navs" :key="index">
         <a :href="item.linkUrl" class="nav-link">
           <img :src="item.picUrl" class="nav-pic">
           <span class="nav-text">{{item.text}}</span>
         </a>
       </li>
     </ul>
   </nav>
</template>

<script>
import {navItems} from './config'

export default {
  name: 'HomeNav',
  data () {
    return {
      navs: navItems // 导航栏的数据  来自homme config
    }
  },
  created () {
    // 以为数据只需要渲染一次 并不需要响应变化 放在created函数里面 就不会浪费性能
    this.navs = navItems
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins";
  .nav{
    width: 100%;
    padding-top: 15px;
    background-color: #fff;
    &-list{
      display: flex;
      flex-wrap: wrap;
    }
    &-item{
      width: 20%;
      margin-bottom: 15px;
    }
    &-link{
      @include flex-center(column)
    }
    &-pic{
        width: 60%;
        margin-bottom: 8px;
    }
  }

</style>
