import { SDKGameView } from '@/QuickStart'

export default {
  data () {
    return {
      SudSDK: null,
      roomId: '',
      gameId: ''
    }
  },
  mounted () {
    // 要挂载的元素
    const params = this.$route.params
    const query = this.$route.query
    this.roomId = query.roomId
    this.orientation = query.orientation
    this.gameId = params.id
    // 横屏处理
    if (this.orientation && this.orientation === '0') {
      this.rotateScreen()
      window.onresize = function () {
        this.rotateScreen()
      }
    }
    this.$nextTick(() => {
      this.initGame()
    })
  },
  methods: {
    initGame () {
      const root = document.getElementById('game')
      const userId = Math.floor((Math.random() + 1) * 10000).toString()
      if (root) {
        const nsdk = new SDKGameView({ root, gameRoomId: this.roomId || this.gameId, gameId: this.gameId, userId })

        // nsdk.setSudFSMMGListener({
        //   onGameStarted () {
        //     console.log('========自定义的game start=====')
        //   },
        //   onGameMGCommonGameBackLobby (handle, data) {
        //     // 返回游戏大厅
        //     console.log('onGameMGCommonGameBackLobby', data)

        //     this.goBack && this.goBack(data)
        //   }
        // })
        // 自定义loading
        // nsdk.beforeInitSdk = function (SudMGP) {
        //   return new Promise(() => {
        //     SudMGP.getSudCfg().setShowCustomLoading(true)
        //   })
        // }
        // nsdk.sudFSMMGDecorator.onGameLoadingProgress = function (stage: number, retCode: number, progress: number) {
        //   console.log(stage, retCode, progress, '自定义进度')
        // }
        this.SudSDK = nsdk
        nsdk.login(userId)
      }
    },
    rotateScreen () {
      const body = document.body
      const width = window.outerWidth
      const height = window.outerHeight
      const isPortrait = window.orientation === 0 || window.orientation === 180 // 竖屏
      // @ts-ignore
      body.style['transform-origin'] = 'center center'
      // 竖屏
      if (isPortrait) {
        body.style.width = height + 'px'
        body.style.height = width + 'px'
        body.style.transform = 'rotate(90deg)'
        const diffDistance = (height - width) / 2
        body.style.left = -diffDistance + 'px'
        body.style.top = diffDistance + 'px'
      } else {
        body.style.width = width + 'px'
        body.style.height = height + 'px'
        // 横屏
        body.style.left = 'unset'
        body.style.top = 'unset'
        body.style.transform = 'rotate(0deg)'
      }
    }
  }
}
