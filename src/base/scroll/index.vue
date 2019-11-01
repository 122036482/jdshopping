<template>
  <swiper :options="swiperOption" ref="swiper">
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"/>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading :text="pullUpText" inline ref="pullUpLoading"/>
    </div>
<!--    滚动条-->
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import MeLoading from 'base/loading'
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from './config'

export default {
  name: 'MeScroll',
  components: {
    swiper,
    swiperSlide,
    MeLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      default: true
    },
    // 接收来自 home组件的data数据
    data: {
      type: [Object, Array]
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // // 标志位 判断是否在 下拉
      // pulling: false,
      // pullDownText: PULL_DOWN_TEXT_INIT,
      // pullUpText: PULL_UP_TEXT_INIT,
      // swiperOption: {
      //   direction: 'vertical', // 垂直方向滑动
      //   slidesPerView: 'auto',
      //   freeMode: true, // 自由模式
      //   setWrapperSize: true, // 设置容器的大小
      //   scrollbar: {
      //     el: this.scrollbar ? '.swiper-scrollbar' : null, // 滚动条元素
      //     hide: true // 滚动条自动隐藏
      //   },
      //   on: {
      //     sliderMove: this.scroll,
      //     touchEnd: this.touchEnd
      //   }
      // }
    }
  },
  watch: {
    // 监听传递数据的变化 调用更新滚动条的方法
    data () {
      this.update()
    }
  },
  methods: {
    update () {
      // console.log(this.$refs.swiper)
    // 调用swiper实例上的swiper.update() 方法更新滚动条
      this.$refs.swiper && this.$refs.swiper.swiper.update()
    },
    // 一个Api 给外部组件使用 返回顶部
    scrollToTop (speed, runCallbacks) {
      this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks)
    },
    init () {
      // 标志位 判断是否在 下拉
      this.pulling = false
      this.pullDownText = PULL_DOWN_TEXT_INIT
      this.pullUpText = PULL_UP_TEXT_INIT
      this.swiperOption = {
        direction: 'vertical', // 垂直方向滑动
        slidesPerView: 'auto',
        freeMode: true, // 自由模式
        setWrapperSize: true, // 设置容器的大小
        scrollbar: {
          el: this.scrollbar ? '.swiper-scrollbar' : null, // 滚动条元素
          hide: true // 滚动条自动隐藏
        },
        on: {
          sliderMove: this.scroll,
          touchEnd: this.touchEnd,
          transitionEnd: this.scrollEnd
        }
      }
    },
    scroll () {
      const swiper = this.$refs.swiper.swiper
      // console.log(swiper.translate)

      // 当我们滚动的时候传递一个事件
      this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper)
      if (this.pulling) {
        return
      }
      if (swiper.translate > 0) { // 下拉
        // 判断用户是否需要下拉
        if (!this.pullDown) {
          return
        }
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          // 在滚动条组件里面设置一个方法  在这里调用方法 改变text内容
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      } else if (swiper.isEnd) { // 上拉 是否到底了
        if (!this.pullUp) {
          return
        }
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'))

        if (isPullUp) {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START)
        } else {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT)
        }
      }
    },
    scrollEnd () {
      const swiper = this.$refs.swiper.swiper
      this.$emit('scroll-end', swiper.translate, swiper, this.pulling)
    },
    touchEnd () {
      const swiper = this.$refs.swiper.swiper
      if (this.pulling) {
        return
      }
      if (swiper.translate > PULL_DOWN_HEIGHT) { // 下拉
        // 判断用户是否需要下拉
        if (!this.pullDown) {
          return
        }
        this.pulling = true
        swiper.allowTouchMove = false // 禁止触摸
        swiper.setTransition(swiper.params.speed) // 速度
        swiper.setTranslate(PULL_DOWN_HEIGHT) // 回到设定的位置
        swiper.params.virtualTranslate = true // 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING)
        //  发布一个事件 已经开始下拉了
        this.$emit('pull-down', this.pullDownEnd)
      } else if (swiper.isEnd) { // 底部
        const totalHeight = parseInt(swiper.$wrapperEl.css('height'))
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight
        if (isPullUp) { // 上拉
          if (!this.pullUp) {
            return
          }
          this.pulling = true
          swiper.allowTouchMove = false // 禁止触摸
          swiper.setTransition(swiper.params.speed) // 速度
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height)) // 回到设定的位置
          swiper.params.virtualTranslate = true // 定住不给回弹
          this.$refs.pullDownLoading.setText(PULL_UP_TEXT_ING)
          //  发布一个事件 已经开始下拉了
          this.$emit('pull-up', this.pullUpEnd)
        }
      }
    },
    pullDownEnd () {
      const swiper = this.$refs.swiper.swiper
      // 注意要按顺序来写 不然会出错
      this.pulling = false
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END) // 改变提示内容
      swiper.params.virtualTranslate = false // 给回弹
      swiper.allowTouchMove = true // 允许触摸
      swiper.setTransition(swiper.params.speed) // 速度
      swiper.setTranslate(0) // 回到0的位置
      // 当下拉完成时 派发一个事件
      setTimeout(() => {
        this.$emit('pull-down-transition-end')
      }, swiper.params.speed)
    },
    pullUpEnd () {
      const swiper = this.$refs.swiper.swiper
      // 注意要按顺序来写 不然会出错
      this.pulling = false
      this.$refs.pullDownLoading.setText(PULL_UP_TEXT_END) // 改变提示内容
      swiper.params.virtualTranslate = false // 给回弹
      swiper.allowTouchMove = true // 允许触摸
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    height: auto;
  }
  .mine-scroll-pull-down,
  .mine-scroll-pull-up {
    position: absolute;
    left: 0;
    width: 100%;
  }
  .mine-scroll-pull-down{
    height: 80px;
    bottom: 100%;
  }
  .mine-scroll-pull-up{
    height: 30px;
    top: 100%;
  }
</style>
