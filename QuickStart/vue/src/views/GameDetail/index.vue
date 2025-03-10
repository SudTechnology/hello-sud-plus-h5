<template>
 <div class='container'>
    <div class='game-container'>
      <!-- game 容器  -->
      <van-icon name="cross"
       @click="destory()" class='close' />
      <div id='game' class='game-wrap'></div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
import { Dialog } from 'vant'
export default {
  mixins: [mixin],
  methods: {
    destory () {
      Dialog.confirm({
        title: '提示',
        message: '确定要退出吗？'
      }).then(() => {
        // on close
        this.goBack({ leaveGame: 1 })
      })
    },
    goBack (data) {
      if (data && data.leaveGame) {
        // 销毁游戏
        this.SudSDK && this.SudSDK.onDestroy()
      }
      setTimeout(() => {
        location.href = '/'
      }, 100)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
}

.game-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

.close {
  position: fixed;
  top: 10px;
  left: 23px;
  width: 30px;
  height: 30px;
  line-height: 30px;

  cursor: pointer;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  text-align: center;
  color: #fff;
}
.game-wrap {
  width: 100%;
  height: 100%;
}

</style>
