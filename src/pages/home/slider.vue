<template>
 <div class="slider-wrapper">
<!--   当sliders 有长度的时候隐藏-->
   <me-loading v-if="!sliders.length"/>
   <me-slider
     :data="sliders"
     :direction="direction"
     :loop="loop"
     :interval="interval"
     :pagination="pagination"
     v-else
   >
     <swiper-slide
       v-for="(item, index) of sliders"
       :key="index"
     >
       <a :href="item.linkUrl" class="slider-link">
         <img :src="item.picUrl" class="slider-img">
       </a>
     </swiper-slide>
   </me-slider>
 </div>
</template>

<script>
import MeSlider from 'base/slider'
import MeLoading from 'base/loading'
import {swiperSlide} from 'vue-awesome-swiper'
import {getHomeSlider} from 'api/home'
import {sliderOptions} from './config'

export default {
  name: 'HomeSlider',
  components: {
    MeSlider,
    swiperSlide,
    MeLoading
  },
  data () {
    return {
      direction: sliderOptions.vertical,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      sliders: []
    }
  },
  created () {
    this.getSliders()
  },
  methods: {
    // API 共外部使用
    update () {
      return this.getSliders()
    },

    getSliders () {
      return getHomeSlider().then(data => {
        this.sliders = data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.slider-wrapper{
  height: 183px;

  .slider-link{
    display: block;
  }

  .slider-link,
  .slider-img{
    width: 100%;
    height: 100%;
  }
}
</style>
