<template>
 <swiper :options="swiperOption" :key="keyId">
   <slot></slot>
   <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
 </swiper>
</template>

<script>
import {swiper} from 'vue-awesome-swiper'
export default {
  name: 'MeSlider',
  components: {
    swiper
  },
  props: {
    // 滑动的方向
    direction: {
      type: String,
      default: 'horizontal',
      validator (value) {
        return [
          'horizontal',
          'vertical'
        ].indexOf(value) > -1
      }
    },
    // 轮播的时间
    interval: {
      type: Number,
      default: 3000,
      validator (value) {
        return value >= 0
      }
    },
    // 是否开启自动轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 是否需要分页器
    pagination: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      keyId: Math.random()
      // 将下列变量放置在一个方法中 当创建vue的时候执行
      // swiperOption: {
      //   watchOverflow: true, // 只有一个slider(非loop)，swiper会失效
      //   direction: this.direction,
      //   autoplay: this.interval ? {
      //     delay: this.interval,
      //     disabeOnInteraction: false
      //   } : false,
      //   slidesPerView: 1, // 设置slider容器能够显示 slider的数量
      //   loop: this.data.length <= 1 ? false : this.loop,
      //   pagination: {
      //     el: this.pagination ? '.swiper-pagination' : null
      //   }
      // }
    }
  },
  watch: {
    data (newData) {
      if (newData.length === 0) {
        return
      }
      this.swiperOption.loop = newData.length === 1 ? false : this.loop
      this.keyId = Math.random()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.swiperOption = {
        watchOverflow: true, // 只有一个slider(非loop)，swiper会失效
        direction: this.direction,
        autoplay: this.interval ? {
          delay: this.interval,
          disabeOnInteraction: false
        } : false,
        slidesPerView: 1, // 设置slider容器能够显示 slider的数量
        loop: this.data.length <= 1 ? false : this.loop,
        pagination: {
          el: this.pagination ? '.swiper-pagination' : null
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.swiper-container{
  width: 100%;
  height: 100%;
}
</style>
