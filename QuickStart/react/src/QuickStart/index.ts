import { GameConfigModel, SudFSMMGDecorator, SudFSTAPPDecorator, SudFSMMGListener } from 'sudmgp-sdk-js-wrapper'

import { SudMGP } from 'sudmgp-sdk-js'
import { ISudMGP } from 'sudmgp-sdk-js/type'

// import { SudMGP } from '../SudMGP/SudMGP/lib'
// import { ISudMGP } from '../SudMGP/SudMGP/lib/type'
import { getCode } from 'api/login' // 短期令牌code接口
import { ISudFSMStateHandle } from 'sudmgp-sdk-js-wrapper/type/core'

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

  public root: HTMLElement // 绑定到个个元素上
  /** 使用的UserId。这里随机生成作演示，开发者将其修改为业务使用的唯一userId */
  public userId = Math.floor((Math.random() + 1) * 10000).toString()
  /** Sud平台申请的appId */
  // eslint-disable-next-line camelcase
  public SudMGP_APP_ID = "1461564080052506636"
  /** Sud平台申请的appKey */
  // eslint-disable-next-line camelcase
  public SudMGP_APP_KEY = "03pNxK2lEXsKiiwrBQ9GbH541Fk2Sfnc"

  /** true 加载游戏时为测试环境 false 加载游戏时为生产环境 */
  public GAME_IS_TEST_ENV = false

  // app调用sdk的封装类
  public sudFSTAPPDecorator = new SudFSTAPPDecorator()
  // 用于处理游戏SDK部分回调业务
  public sudFSMMGDecorator = new SudFSMMGDecorator()

  public customListener: Partial<SudFSMMGListener> | undefined
  // 初始化数据

  // 初始化数据
  constructor({ root, gameRoomId, language = 'zh-CN', gameId, userId }: IBaseGameViewModelConstru) {
    this.gameRoomId = gameRoomId
    this.gameId = gameId
    this.userId = userId
    this.root = root
    language && (this.language = language)
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
        console.log(res, 'dddd')
        const code = res.data.code
        await this.beforeInitSdk && this.beforeInitSdk(SudMGP)
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
  public beforeInitSdk(SudMGP: any) {
    return new Promise<void>((resolve) => {
      resolve()
    })
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
    const customListener = this.customListener || {}
    this.sudFSMMGDecorator.setSudFSMMGListener({
      // 默认监听事件
      onGameStarted() {
        console.log('start')
      },
      onGetGameViewInfo: function (handle: ISudFSMStateHandle, dataJson: string): void {
        const width = self.root.clientWidth
        const height = self.root.clientHeight
        console.log(width, height, 'height')

        // TODO: 修改数据
        const gameViewInfo = {
          ret_code: 0,
          ret_msg: "success",
          view_size: {
            width,
            height
          },
          view_game_rect: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        }

        handle.success(JSON.stringify(gameViewInfo))
      },
      onGetGameCfg: function (handle: ISudFSMStateHandle, dataJson: string): void {
        console.log("onGetGameCfg")
        const config = new GameConfigModel()
        console.log(config)
        handle.success(JSON.stringify(config))
      },
      ...customListener// 外部传入自定义listener可覆盖
    })
    console.log(userId, gameRoomId, code, gameId, language, this.sudFSMMGDecorator)

    // 调用游戏sdk加载游戏
    const iSudFSTAPP = SudMGPSDK.loadMG(userId, gameRoomId, code, gameId, language, this.sudFSMMGDecorator, this.root)
    // APP调用游戏接口的装饰类设置
    if (iSudFSTAPP) {
      this.sudFSTAPPDecorator.setISudFSTAPP(iSudFSTAPP)
    }
  }

  // region 生命周期相关

  /** 页面销毁的时候调用 */
  public onDestroy() {
    this.destroyMG()
  }

  public setSudFSMMGListener(listener: Partial<SudFSMMGListener>) {
    this.customListener = listener
  }

  // end region 生命周期相关

  /** 销毁游戏 */
  private destroyMG() {
    this.sudFSTAPPDecorator.destroyMG()
    this.sudFSMMGDecorator.destroyMG()
  }

  // 根据域名生成bundleId
  public getBundleId() {
    return location.hostname
  }
}
