<template>
  <transition name="mine-backtop">
    <a
      href=""
      class="mine-backtop"
      v-show="visible"
      @click.prevent="backToTop" >
      <i class="iconfont icon-huidingbu"></i>
    </a>
  </transition>
</template>

<script>
export default {
  name: 'MeBacktop',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    backToTop () {
      this.$emit('backtop')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .mine-backtop {
    overflow: hidden;
    @include flex-center();
    width: 45px;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;

    .icon-huidingbu {
      color: #fff;
      font-size: 38px;
    }
  }

  .mine-backtop {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.4s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
