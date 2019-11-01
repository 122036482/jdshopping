<template>
<!-- inline 表示垂直还是水平居中的显示方式-->
    <div class="mine-loading" :class="{'mine-loading-inline' : inline}">
<!--      传递参数来控制是否显示loading 图标 和 提示文字-->
      <span class="mine-loading-indicator" v-if="indicator === 'on'">
        <slot><img src="./loading.gif" alt="loading"></slot>
      </span>
      <span class="mine-loading-text" v-if="text">{{loadingText}}</span>
    </div>
</template>

<script>
export default {
  name: 'MeLoading',
  props: {
    indicator: {
      type: String,
      default: 'on',
      validator (value) {
        return ['on', 'off'].indexOf(value) > -1
      }
    },
    text: {
      type: String,
      default: '正在加载中.....'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 因为子组件不能改变父组件的值 所以这里要用另一个变量来接收
      loadingText: this.text
    }
  },
  watch: {
    text (text) {
      this.loadingText = text
    }
  },
  methods: {
    setText (text) {
      this.loadingText = text
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~assets/scss/mixins";
  .mine-loading{
    overflow: hidden;
    height: 100%;
    width: 100%;
    @include flex-center(column);
    &.mine-loading-inline{
      flex-direction: row;
      .mine-loading-indicator ~ .mine-loading-text {
        margin-top: 0;
        margin-left: 6px;
      }
    }
  }
.mine-loading-indicator ~ .mine-loading-text {
  margin-top: 6px;
}
</style>
