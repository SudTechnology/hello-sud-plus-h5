import { GameConfigModel, SudFSMMGDecorator, SudFSTAPPDecorator, SudFSMMGListener, ISudFSMStateHandleUtils } from 'sudmgp-sdk-js-wrapper'
// import { GameConfigModel, SudFSMMGDecorator, SudFSTAPPDecorator, SudFSMMGListener } from 'sudmgp-sdk-js-wrapper-test'
// import { GameConfigModel, SudFSMMGDecorator, SudFSTAPPDecorator, SudFSMMGListener } from '../SudMGP/SudMGPWrapper/lib'
// import { SudMGP, ISudAPPD } from 'sudmgp-sdk-js'
// import type { ISudMGP, ISudFSTAPP } from 'sudmgp-sdk-js/type'

import { SudMGP, ISudAPPD } from 'sudmgp-sdk-js-test'
import { ISudMGP, ISudFSTAPP } from 'sudmgp-sdk-js-test/type' // SudMGP类型

// @ts-ignore
// import { SudMGP, ISudAPPD } from '../SudMGP/SudMGP/lib'
// import type { ISudMGP, ISudFSTAPP } from '../SudMGP/SudMGP/lib/type'
import { getCode } from 'api/login' // 短期令牌code接口
import { ISudFSMStateHandle } from 'sudmgp-sdk-js-wrapper/type/core'
import { appMap } from '../data/app'
const SudMGPSDK = SudMGP as ISudMGP
interface IInitSDKParam {
  userId: string,
  code: string
  appId: string
  appKey: string
  isTestEnv: boolean
}

interface ILoadGameParam {
  userId: string
  code: string
}

interface IBaseGameViewModelConstru {
  root: HTMLElement
  userId: string
  gameRoomId: string,
  gameId: string
  language?: string
}

export class SDKGameView {
  private gameRoomId: string // 游戏房间id，房间隔离，同一房间才能一起游戏
  private language: string = "zh-CN" /** 游戏的语言代码 */
  private gameId: string // 游戏id

  public root: HTMLElement // 绑定到元素上
  /** 使用的UserId。这里随机生成作演示，开发者将其修改为业务使用的唯一userId */
  public userId = '100668' // Math.floor((Math.random() + 1) * 10000).toString()
  /** Sud平台申请的appId */
  // eslint-disable-next-line camelcase
  public SudMGP_APP_ID = '1461564080052506636' // '1461564080052506636' // "1498868666956988417"
  /** Sud平台申请的appKey */
  // eslint-disable-next-line camelcase
  public SudMGP_APP_KEY = '03pNxK2lEXsKiiwrBQ9GbH541Fk2Sfnc'// '1461564080052506636' //"E9Lj2Cg61pUgiSESou6WDtxntoTXH7Gf"

  /** true 加载游戏时为测试环境 false 加载游戏时为生产环境 */
  public GAME_IS_TEST_ENV = true

  // app调用sdk的封装类
  public sudFSTAPPDecorator = new SudFSTAPPDecorator()
  // 用于处理游戏SDK部分回调业务
  public sudFSMMGDecorator = new SudFSMMGDecorator()

  public customSudFSMMGListener: Partial<SudFSMMGListener> | undefined
  public iSudFSTAPP: ISudFSTAPP | null = null
  public gameIsStarted: boolean = false
  // 初始化数据
  constructor({ root, gameRoomId, language = 'zh-CN', gameId, userId }: IBaseGameViewModelConstru) {
    this.gameRoomId = gameRoomId
    this.gameId = gameId
    this.userId = userId
    this.root = root
    language && (this.language = language)

    if (localStorage.getItem('localAppId')) {
      const localAppId = localStorage.getItem('localAppId') || '1461564080052506636'
      this.SudMGP_APP_ID = localAppId
      this.SudMGP_APP_KEY = appMap[localAppId as keyof typeof appMap].appKey
    }
  }

  /**
   * 第1步，获取短期令牌code，用于换取游戏Server访问APP Server的长期ssToken
   * 接入方客户端 调用 接入方服务端 login 获取 短期令牌code
   * 参考文档时序图：sud-mgp-doc(https://docs.sud.tech/zh-CN/app/Client/StartUp-Android.html)
   *
   * @param userId
   */
  public login(userId: string) {
    return new Promise(() => {
      const data = {
        user_id: userId,
        app_id: this.SudMGP_APP_ID
      }
      // 获取code
      getCode(data).then(async (res) => {
        const code = res.data.code
        console.log(code)
        // @ts-ignore
        await this.beforeInitSdk && this.beforeInitSdk(SudMGP)
        const env = Number(localStorage.getItem('env')) || 3
        if (env === 1) { // 切换到生产环境
          this.GAME_IS_TEST_ENV = false
        }
        console.log('[ env ] >', env)
        ISudAPPD.e(env)
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
  public beforeInitSdk(SudMGP: ISudMGP) {
    return new Promise<void>((resolve) => {
      resolve()
    })
  }

  // 注册通信桥接，页面自身有window.onmessage事件时，需要在定义window.onmessage后执行该方法
  public _registerCustomCommandEvent() {
    SudMGPSDK._registerCustomCommandEvent()
  }

  /**
   * 第2步，初始化SudMGP sdk
   *
   */
  public initSdk({
    userId,
    appId,
    code,
    appKey,
    isTestEnv
  }: IInitSDKParam) {
    const bundleId = this.getBundleId()
    const self = this
    const version = SudMGPSDK.getVersion()
    console.log('[ version ] >', version)
    SudMGPSDK.initSDK(appId, appKey, bundleId, isTestEnv, {
      onSuccess() {
        self.loadGame({ userId, code })
      },
      onFailure(errCode: number, errMsg: string) {
        // TODO: 2022/6/13 下面可以根据业务需要决定是否保留
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
  public loadGame({ userId, code }: ILoadGameParam) {
    const gameRoomId = this.gameRoomId
    const gameId = this.gameId
    const language = this.language
    const self = this
    const customSudFSMMGListener = this.customSudFSMMGListener || {}
    this.sudFSMMGDecorator.setSudFSMMGListener({
      // 默认监听事件
      onGameStarted() {
        console.log('game started')
        self.gameIsStarted = true
      },
      onGameCustomerStateChange(handle, state, dataJson) {
        console.log('======onGameCustomerStateChange====', 'state', state, dataJson)
        switch (state) {
          case 'mg_common_click_user_profile':
            console.log('handle mg_common_click_user_profile')
            break
          case 'mg_avatar_get_avatar':
            console.log('mg_avatar_get_avatar', 'zhixing')
            // handle.success(JSON.stringify({ gender: "Male", avatar: "Role_Male_T19_Hair_01_M_Face_01_T_T19_UB_01_M_T19_LB_01_M_T19_Shoe_01_M" }))
            handle.success(JSON.stringify({ gender: "Male", avatar: "" }))

            break
        }
      },
      // 监听玩家状态改变
      onPlayerMGCommonPlayerIn(handle, userId, model) {
        // 获取游戏人数
        const size = self.sudFSMMGDecorator.getPlayerInNumber()
        console.log(`=======sud h5 getPlayerInNumber======= size: ${size}, userId: ${userId}, model: ${JSON.stringify(model)}`)
        handle.success(JSON.stringify({ res_code: 0, msg: '' }))
      },
      onGameMGCommonGameBackLobby(handle, dataJson) { // 游戏通知app回到大厅
        // 自定义实现页面跳转或者回到大厅的操作

      },
      onGameMGCommonPlayerRoleId(handle, dataJson) {
        console.log('[ onGameMGCommonPlayerRoleId ] >', dataJson)
      },
      onGameLog(dataJson) {
        console.log('=======sud h5 onGameLog======= ', dataJson)
      },
      onGetGameViewInfo: function (handle: ISudFSMStateHandle, dataJson: string): void {
        let width = self.root.clientWidth
        let height = self.root.clientHeight
        const data = JSON.parse(dataJson)
        const dpr = data.ratio || 1
        console.log(width, height, 'width,height', dataJson, 'dataJson', 'dpr', dpr)
        const gameViewSize = localStorage.getItem('viewSize')
        console.log('[ gameViewSize ] >', gameViewSize)
        let viewGameRect = {
          left: 0,
          right: 0,
          top: 50,
          bottom: 50
        }
        if (gameViewSize) {
          const localData = JSON.parse(gameViewSize)
          width = localData.width
          height = localData.height
          if (localData.viewGameRect) {
            viewGameRect = localData.viewGameRect
          }
          console.log('[ viewGameRect ] >', viewGameRect)
        }
        // TODO: 修改数据
        const gameViewInfo = {
          ret_code: 0,
          ret_msg: "success",
          view_size: {
            width: width * dpr,
            height: height * dpr
          },
          view_game_rect: viewGameRect
        }
        console.log(gameViewInfo, 'gameViewInfo')

        handle.success(JSON.stringify(gameViewInfo))
      },
      onGameMGCommonSelfClickJoinBtn(handle, res) {
        console.log('[ onGameMGCommonSelfClickJoinBtn ] >', handle, res)
        handle.success(JSON.stringify(res))
        self.sudFSTAPPDecorator.notifyAPPCommonSelfIn(true)
      },
      onGetGameCfg: function (handle: ISudFSMStateHandle, dataJson: string): void {
        let config = new GameConfigModel()
        const gameConf = localStorage.getItem('gameconfig')
        // config.ui.join_btn.custom = true
        // config.ui.join_btn.hide = true
        if (gameConf) {
          // @ts-ignore
          config = gameConf
          // @ts-ignore
          handle.success(config)
          return
        }
        handle.success(JSON.stringify(config))
      },
      /*
      * 《狼人杀》&《谁是卧底》RTC 接入部分
      */
      // 游戏发送“开启/关闭 RTC拉流”状态，允许/禁止收听其他玩家发言
      onGameMGCommonSelfHeadphone(handle, mgCommonSelfHeadphoneData) {
        const isOn = mgCommonSelfHeadphoneData.isOn // 耳机（听筒，喇叭）开关状态 true: 开(APP开启RTC拉流)；false: 关(APP关闭RTC拉流)
        console.log('[ onGameMGCommonSelfHeadphone data ] >', mgCommonSelfHeadphoneData)
        if (isOn) {
          // 开启RTC拉流
          console.log('onGameMGCommonSelfHeadphone[ pull rtc ]')
          // 业务按自身rtc方案自行实现拉流逻辑
        } else {
          // 关闭RTC拉流
          console.log('onGameMGCommonSelfHeadphone[ close pull rtc ]')
        }
        ISudFSMStateHandleUtils.handleSuccess(handle)
      },
      // 游戏发送“开启/关闭 RTC推流”状态，允许/禁止玩家发言
      onGameMGCommonSelfMicrophone(handle, mgCommonSelfMicrophoneData) {
        const isOn = mgCommonSelfMicrophoneData.isOn // 麦开关状态 true: 开(APP开启RTC推流)；false: 关(APP关闭RTC推流)
        console.log('[ onGameMGCommonSelfMicrophone data ] >', mgCommonSelfMicrophoneData)
        if (isOn) {
          // 开启RTC推流
          console.log('onGameMGCommonSelfMicrophone[ open push rtc ]')
          // 业务按自身rtc方案自行实现推流逻辑
        } else {
          // 关闭RTC推流
          console.log('onGameMGCommonSelfMicrophone[ close push rtc ]')
        }
        ISudFSMStateHandleUtils.handleSuccess(handle)
      },
      ...customSudFSMMGListener// 外部传入自定义listener可覆盖
    })
    console.log(userId, gameRoomId, code, gameId, language, this.sudFSMMGDecorator)

    // 调用游戏sdk加载游戏
    this.iSudFSTAPP = SudMGPSDK.loadMG(userId, gameRoomId, code, gameId, language, this.sudFSMMGDecorator, this.root)
    // APP调用游戏接口的装饰类设置
    if (this.iSudFSTAPP) {
      // @ts-ignore
      this.sudFSTAPPDecorator.setISudFSTAPP(this.iSudFSTAPP)
    }
  }

  // region 生命周期相关

  /** 页面销毁的时候调用 */
  public onDestroy() {
    this.sudFSTAPPDecorator.notifyAPPCommon('app_common_self_exit_game', JSON.stringify({}), {
      onSuccess() {

      },
      onFailure() {

      }
    })
    this.destroyMG()
  }

  public setSudFSMMGListener(listener: Partial<SudFSMMGListener>) {
    this.customSudFSMMGListener = listener
  }

  // end region 生命周期相关

  /** 销毁游戏 */
  private destroyMG() {
    if (this.gameIsStarted) {
      this.iSudFSTAPP && SudMGPSDK.destroyMG(this.iSudFSTAPP)
    }
    this.root.innerHTML = ''

    this.sudFSTAPPDecorator.destroyMG()
    this.sudFSMMGDecorator.destroyMG()
  }

  // 根据域名生成bundleId
  public getBundleId() {
    return 'localhost'// location.hostname
  }
}
