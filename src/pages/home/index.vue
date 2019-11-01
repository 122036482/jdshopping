<template>
    <div class="home">
      <header class="g-header-container">
        <home-header :class="{'header-transition' : isHeaderTransition}" ref="header"/>
      </header>
<!--      滚动条组件-->
      <me-scroll
        :data="recommends"
        pullDown
        pullUp
        @scroll="scroll"
        @pull-down="pullToRefresh"
        @pull-up="pullToLoadMore"
        @scroll-end="scrollEnd"
        @pull-down-transition-end="pullDownTransitionEnd"
        ref="scroll"
      >
<!--        首页轮播图-->
        <home-slider ref="slider"/>
<!--        首页导航栏-->
        <home-nav/>
<!--        首页热卖推荐-->
        <home-recommend @loaded="getRecommed" ref="recommend"/>
      </me-scroll>
      <div class="g-backtop-container">
        <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
      </div>
      <router-view/>
    </div>
</template>

<script>
import MeScroll from 'base/scroll' // 滚动条组件
import HomeHeader from './header' // 头部组件
import HomeSlider from './slider'// 首页轮播图组件
import HomeNav from './nav'// 首页导航栏组件
import HomeRecommend from './recommend'// 首页热卖推荐
import MeBacktop from 'base/backtop'
import {HEADER_TRANSITION_HEIGHT} from './config'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSlider,
    MeScroll,
    HomeNav,
    HomeRecommend,
    MeBacktop
  },
  data () {
    return {
      // 将recommend数据传给子组件
      recommends: [],
      isBacktopVisible: false,
      isHeaderTransition: false
    }
  },
  // created () {
  //   setTimeout(() => {
  //     this.isBacktopVisible = true
  //   }, 1000)
  // },
  methods: {
    updateScroll () {
    },
    getRecommed (recommends) {
      // 接收来自recommend的数据
      this.recommends = recommends
    },
    // 下拉刷新
    pullToRefresh (end) {
      this.$refs.slider.update().then(end)
    },
    pullToLoadMore (more) {
      this.$refs.recommend.update().then(more).catch(err => {
        if (err) {
          console.log(err)
        }
        more()
      })
    },
    scroll (translate) {
      this.changeHeaderStatus(translate)
    },
    scrollEnd (translate, scroll, pulling) {
      if (!pulling) {
        this.changeHeaderStatus(translate)
      }
      this.isBacktopVisible = translate < 0 && -translate > scroll.height
    },
    pullDownTransitionEnd () {
      // this.changeHeaderStatus(translate)
      this.$refs.header.show()
    },
    backToTop () {
      this.$refs.scroll && this.$refs.scroll.scrollToTop()
    },
    changeHeaderStatus (translate) {
      if (translate > 0) {
        this.$refs.header.hide()
        return
      }
      this.$refs.header.show()
      this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT
    }
  }
}
</script>

<style scoped lang="scss">
.home{
overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
