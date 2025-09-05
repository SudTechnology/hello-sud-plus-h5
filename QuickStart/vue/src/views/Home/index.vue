<template>
  <div class="home">
    <van-cell-group>
      <van-field
        v-model="roomId"
        label="房间号ID"
        placeholder="请输入房间号ID"
      />
    </van-cell-group>
    <div class="game-list">
      <div
        v-for="item in list"
        :key="item.sceneId"
        class="game-item"
        @click="toDetail(item)"
      >
        <img
          class="game-logo"
          :src="item.scenePic"
          alt=""
        />
        <div class="game-title">
          {{ item.sceneName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/game'

export default {
  name: 'Home',
  data () {
    return {
      list: [],
      roomId: ''
    }
  },
  created () {
    getList().then(res => {
      console.log(res)
      this.list = res.data
    })
  },
  methods: {
    toDetail (data) {
      let url = `/game/${data.sceneId}?orientation=${data.orientation}`
      if (this.roomId) {
        url += `&roomId=${this.roomId}`
      }
      console.log(url)
      this.$router.push({ path: url, query: { orientation: data.orientation } })
    }
  }
}
</script>
<style lang="less" scoped>

.game-list {
  padding: 0 4.2vw;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 40px;
  .game-item {
    margin-right: 1.6vw;
    margin-top: 20px;
  }
  .game-item:nth-child(2n) {
    margin-right: 0;
  }
  .game-logo {
    width: 44.8vw;
    height: 44.8vw;
    border-radius: 10px;
    object-fit: cover;
  }
  .game-title {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    padding-top: 8px;
    text-align: left;
  }
}
</style>
