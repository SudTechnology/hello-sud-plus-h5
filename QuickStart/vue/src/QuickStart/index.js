import { GameConfigModel, SudFSMMGDecorator, SudFSTAPPDecorator } from 'sudmgp-sdk-js-wrapper'

import { SudMGP as SudMGPSDK } from 'sudmgp-sdk-js'
import { getCode } from '@/api/login' // 短期令牌code接口,由业务方自行实现

export class SDKGameView {
  gameRoomId // 游戏房间id，房间隔离，同一房间才能一起游戏，【必须是字符串类型！！】
  language = 'zh-CN' /** 游戏的语言代码 */
  gameId // 游戏id 【必须是字符串类型！！】

  root // 绑定到元素上
  /** 使用的UserId。这里随机生成作演示，开发者将其修改为业务使用的唯一userId */
  userId = '100668'// 注意: 是字符串类型,  Math.floor((Math.random() + 1) * 10000).toString() 【必须是字符串类型！！】
  /** Sud平台申请的appId */
  // eslint-disable-next-line camelcase
  SudMGP_APP_ID = '1461564080052506636' // '1461564080052506636' // "1498868666956988417"
  /** Sud平台申请的appKey */
  // eslint-disable-next-line camelcase
  SudMGP_APP_KEY = '03pNxK2lEXsKiiwrBQ9GbH541Fk2Sfnc'// '1461564080052506636' //"E9Lj2Cg61pUgiSESou6WDtxntoTXH7Gf"

  /** true 加载游戏时为测试环境 false 加载游戏时为生产环境 */
  GAME_IS_TEST_ENV = true

  // app调用sdk的封装类
  sudFSTAPPDecorator = new SudFSTAPPDecorator()
  // 用于处理游戏SDK部分回调业务
  sudFSMMGDecorator = new SudFSMMGDecorator()

  customSudFSMMGListener

  iSudFSTAPP = null

  gameIsStarted = false
  // 初始化数据

  // 初始化数据
  // 注意参数的类型！！gameRoomId， gameId，userId都是字符串类型
  constructor ({ root, gameRoomId, language = 'zh-CN', gameId, userId }) {
    console.log('[ SDKGameView ] >', gameRoomId, gameId, userId)
    this.gameRoomId = gameRoomId // ！！注意：字符串类型
    this.gameId = gameId // ！！注意：字符串类型
    this.userId = userId // ！！注意：字符串类型
    this.root = root
    language && (this.language = language)
  }

  /**
   * 第1步，获取短期令牌code，用于换取游戏Server访问APP Server的长期ssToken
   * 接入方客户端 调用 接入方服务端 login 获取 短期令牌code
   * 参考文档时序图：sud-mgp-doc(https://docs.sud.tech/zh-CN/app/Client/StartUp-Android.html)
   *
   * @param userId string 【必须是字符串类型！！】
   */
  login (userId) {
    return new Promise(() => {
      const data = {
        user_id: userId, // 【必须是字符串类型！！】
        app_id: this.SudMGP_APP_ID
      }
      // 获取code
      getCode(data).then(async (res) => {
        const code = res.data.code
        console.log(code)
        await this.beforeInitSdk && this.beforeInitSdk(SudMGPSDK)
        this.initSdk({
          userId,
          code,
          appId: this.SudMGP_APP_ID,
          appKey: this.SudMGP_APP_KEY,
          isTestEnv: this.GAME_IS_TEST_ENV
        })
      })
    })
  }

  // before init生命周期
  beforeInitSdk () {
    return new Promise((resolve) => {
      resolve()
    })
  }

  // 注册通信桥接，页面自身有window.onmessage事件时，需要在定义window.onmessage后执行该方法
  _registerCustomCommandEvent () {
    SudMGPSDK._registerCustomCommandEvent()
  }

  /**
   * 第2步，初始化SudMGP sdk
   *
   */
  initSdk ({
    userId,
    appId,
    code,
    appKey,
    isTestEnv
  }) {
    const bundleId = this.getBundleId()
    const self = this
    SudMGPSDK.initSDK(appId, appKey, bundleId, isTestEnv, {
      onSuccess () {
        self.loadGame({ userId, code })
      },
      onFailure (errCode, errMsg) {
        // TODO: 下面可以根据业务需要决定是否保留
        if (isTestEnv) {
          console.error(`${bundleId}, initSDK onFailure:${errMsg} (${errCode})`)
        }
      }
    })
  }

  /**
   * 第3步，加载游戏
   *
   */
  loadGame ({ userId, code }) {
    const gameRoomId = this.gameRoomId // 【必须是字符串类型！！】
    const gameId = this.gameId // 【必须是字符串类型！！】
    const language = this.language
    const self = this
    const customSudFSMMGListener = this.customSudFSMMGListener || {}
    this.sudFSMMGDecorator.setSudFSMMGListener({
      // 默认监听事件
      onGameStarted () {
        console.log('game started')
        self.gameIsStarted = true
      },
      onGameCustomerStateChange (handle, state, dataJson) {
        console.log('======onGameCustomerStateChange====', 'state', state, JSON.stringify(dataJson))
        switch (state) {
          case 'mg_common_click_user_profile':
            console.log('handle mg_common_click_user_profile')
            break
        }
      },
      // 监听玩家状态改变
      onPlayerMGCommonPlayerIn (handle, userId, model) {
        // 获取游戏人数
        const size = self.sudFSMMGDecorator.getPlayerInNumber()
        console.log(`=======sud h5 getPlayerInNumber======= size: ${size}, userId: ${userId}, model: ${JSON.stringify(model)}`)
        handle.success(JSON.stringify({ res_code: 0, msg: '' }))
      },
      onGameMGCommonGameBackLobby (handle, dataJson) { // 游戏通知app回到大厅
        // 自定义实现页面跳转或者回到大厅的操作

      },
      onGameMGCommonPlayerRoleId (handle, dataJson) {
        console.log('[ onGameMGCommonPlayerRoleId ] >', dataJson)
      },
      onGameLog (dataJson) {
        console.log('=======sud h5 onGameLog======= ', dataJson)
      },
      onGetGameViewInfo (handle, dataJson) {
        const width = self.root.clientWidth
        const height = self.root.clientHeight
        const data = JSON.parse(dataJson)
        const dpr = data.ratio || 1
        console.log(width, height, 'width,height', dataJson, 'dataJson', 'dpr', dpr)
        const viewGameRect = {
          left: 0,
          right: 0,
          top: 50,
          bottom: 50
        }
        // TODO: 修改窗口数据
        const gameViewInfo = {
          ret_code: 0,
          ret_msg: 'success',
          view_size: {
            width: width * dpr,
            height: height * dpr
          },
          view_game_rect: viewGameRect
        }
        console.log(gameViewInfo, 'gameViewInfo')

        handle.success(JSON.stringify(gameViewInfo))
      },
      onGameMGCommonSelfClickJoinBtn (handle, res) {
        console.log('[ onGameMGCommonSelfClickJoinBtn ] >', handle, res)
        handle.success(JSON.stringify(res))
        self.sudFSTAPPDecorator.notifyAPPCommonSelfIn(true)
      },
      onGetGameCfg (handle, dataJson) {
        const config = new GameConfigModel()
        // config.ui.join_btn.custom = true
        // config.ui.join_btn.hide = true

        handle.success(JSON.stringify(config))
      },
      ...customSudFSMMGListener// 外部传入自定义listener可覆盖
    })
    console.log(userId, gameRoomId, code, gameId, language, this.sudFSMMGDecorator)

    // 调用游戏sdk加载游戏
    this.iSudFSTAPP = SudMGPSDK.loadMG(userId, gameRoomId, code, gameId, language, this.sudFSMMGDecorator, this.root)
    // APP调用游戏接口的装饰类设置
    if (this.iSudFSTAPP) {
      this.sudFSTAPPDecorator.setISudFSTAPP(this.iSudFSTAPP)
    }
  }

  // region 生命周期相关

  /** 页面销毁的时候调用 */
  onDestroy () {
    this.sudFSTAPPDecorator.notifyAPPCommon('app_common_self_exit_game', JSON.stringify({}), {
      onSuccess () {

      },
      onFailure () {

      }
    })
    this.destroyMG()
  }

  setSudFSMMGListener (listener) {
    this.customSudFSMMGListener = listener
  }

  // end region 生命周期相关

  /** 销毁游戏 */
  destroyMG () {
    if (this.gameIsStarted) {
      this.iSudFSTAPP && SudMGPSDK.destroyMG(this.iSudFSTAPP)
    }
    this.root.innerHTML = ''

    this.sudFSTAPPDecorator.destroyMG()
    this.sudFSMMGDecorator.destroyMG()
  }

  // 根据域名生成bundleId
  getBundleId () {
    return location.hostname
  }
}
