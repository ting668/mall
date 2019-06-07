<template>
  <div ref="betterScroll" :style="{height:clientHeight-60+'px'}" class="scroll">
    <div :style="styleObj" class="scroll-container">
      <div v-if="pulldownFlag" class="pulldown">
        <i class="setheight el-icon-loading"></i>
      </div>
      <slot/>
      <div v-if="pullupFlag" class="pullup">
        <i v-if="pullupLoading" class="setheight el-icon-loading"></i>
         <i v-if="!pullupLoading" class="setheight el-icon-arrow-up"></i>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BScroll from 'better-scroll'
export default {
  name: 'Content',
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    },
    stillPullDown: {
      type: Boolean,
      default: true
    },
    stillPullUp: {
      type: Boolean,
      default: true
    },
    height: {
      default: false
    },
    styleObj: {
      default: function() {
        return {}
      }
    },
    options: {
      type: Object,
      default() {
        return {
          pullDownRefresh: {
            threshold: 30, // 当下拉到超过顶部 30px 时，触发 pullingDown 事件
            stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
          },
          click: true,
          pullUpLoad: {
            threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
          },
          mouseWheel: true,
          scrollbar: {
            fade: false,
            interactive: true // 1.8.0 新增
          }
        }
      }
    },
    pullupLoading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pullupFlag: false,
      pulldownFlag: false
    }
  },
  methods: {
    initScroll() {
      if (!this.$refs.betterScroll) {
        return
      }
      this.scroll = new BScroll(this.$refs.betterScroll, this.options)
      this.scroll.on('pullingDown', () => {
        console.log('下拉刷新')
        this.pulldownFlag = true
        this.$emit('pullDown')
      })
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载')
        this.pullupFlag = true
        this.$emit('pullUp')
      })
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  computed: {
    clientHeight: function() {
      let clientHeight = document.documentElement.clientHeight
      let height = this.height || clientHeight
      return clientHeight
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    },
    stillPullUp: function() {
      if (!this.stillPullUp) {
        console.log(this.stillPullUp)
        this.pullupFlag = false
        this.scroll.finishPullUp()
      }
    },
    stillPullDown: function() {
      if (!this.stillPullDown) {
        console.log(this.stillPullDown)
        this.pulldownFlag = false
        this.scroll.finishPullDown()
      }
    }
  }
}
</script>

<style scope>
.scroll {
  overflow: hidden;
  box-sizing: content-box;
}
.scroll-container {
  box-sizing: content-box;
}
.pulldown {
  width: 100%;
  text-align: center;
}
.pullup {
  width: 100%;
}
.nodata {
  color: #09007a;
  line-height: 50px;
  font-size: 14px;
}
.setheight {
  line-height: 50px;
  font-size: 18px;
  color: #09007a;
}
@media (max-width: 767px) {
  .bscroll-vertical-scrollbar {
    display: none !important;
  }
  .setheight {
    line-height: 35px;
    font-size: 14px;
    color: #09007a;
  }
  .nodata {
    color: #09007a;
    line-height: 30px;
    font-size: 12px;
  }
}
</style>
