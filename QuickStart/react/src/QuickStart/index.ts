import { GameConfigModel, SudFSMMGDecorator, SudFSTAPPDecorator, SudFSMMGListener, ISudFSMStateHandleUtils } from 'sudmgp-sdk-js-wrapper'
import { SudMGP } from 'sudmgp-sdk-js'
import { getCode } from 'api/login' // 短期令牌code接口
import type { ISudMGP, ISudFSTAPP } from 'sudmgp-sdk-js/type'
import type { ISudFSMStateHandle } from 'sudmgp-sdk-js-wrapper/type/core'

const SudMGPSDK = SudMGP as ISudMGP
interface IInitSDKParam {
  userId: string,
  code: string
  appId: string
  appKey: string
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
  /** 使用的UserId，必须string类型，这里随机生成作演示，开发者将其修改为业务使用的唯一userId */
  public userId = '100668' // // 必须string
  /** Sud平台申请的appId */
  // eslint-disable-next-line camelcase
  public SudMGP_APP_ID = '1461564080052506636' // '1461564080052506636' // "1498868666956988417"
  /** Sud平台申请的appKey */
  // eslint-disable-next-line camelcase
  public SudMGP_APP_KEY = '03pNxK2lEXsKiiwrBQ9GbH541Fk2Sfnc'// '1461564080052506636' //"E9Lj2Cg61pUgiSESou6WDtxntoTXH7Gf"

  // app调用sdk的封装类
  public sudFSTAPPDecorator = new SudFSTAPPDecorator()
  // 用于处理游戏SDK部分回调业务
  public sudFSMMGDecorator = new SudFSMMGDecorator()

  public customSudFSMMGListener: Partial<SudFSMMGListener> | undefined

  public iSudFSTAPP: ISudFSTAPP | null = null

  public gameIsStarted: boolean = false

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
        const code = res.data.code
        console.log(code)
        await this.beforeInitSdk && this.beforeInitSdk(SudMGP)
        this.initSdk({
          userId,
          code,
          appId: this.SudMGP_APP_ID,
          appKey: this.SudMGP_APP_KEY
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
    userId, // 必须string
    appId, // 必须string
    code,
    appKey
  }: IInitSDKParam) {
    const bundleId = this.getBundleId()
    const self = this
    const version = SudMGPSDK.getVersion()
    console.log('[ version ] >', version)
    SudMGPSDK.initSDK(appId, appKey, bundleId, false, {
      onSuccess() {
        self.loadGame({ userId, code })
      },
      onFailure(errCode: number, errMsg: string) {
        // TODO: 2022/6/13 下面可以根据业务需要决定是否保留
        console.error(`${bundleId}, initSDK onFailure:${errMsg} (${errCode})`)
      }
    })
  }

  /**
   * 第3步，加载游戏
   *
   */
  public loadGame({ userId, code }: ILoadGameParam) {
    const gameRoomId = this.gameRoomId // 必须string
    const gameId = this.gameId // 必须string
    const language = this.language
    const self = this
    const customSudFSMMGListener = this.customSudFSMMGListener || {}
    this.sudFSMMGDecorator.setSudFSMMGListener({
      // 默认监听事件
      onGameStarted() {
        console.log('game started')
        self.gameIsStarted = true
        self.customSudFSMMGListener && self.customSudFSMMGListener.onGameStarted && self.customSudFSMMGListener.onGameStarted()
      },
      onGameCustomerStateChange(handle, state, data) {
        console.log('======onGameCustomerStateChange====', 'state', state, data)
        switch (state) {
          case 'mg_avatar_get_avatar':
            console.log('mg_avatar_get_avatar')
            // handle.success(JSON.stringify({ gender: "Male", avatar: "Role_Male_T19_Hair_01_M_Face_01_T_T19_UB_01_M_T19_LB_01_M_T19_Shoe_01_M" }))
            handle.success(JSON.stringify({ gender: "Male", avatar: "" }))

            break
          case 'mg_common_game_create_order':
            /// https://docs.sud.tech/zh-CN/app/Client/MGFSM/CommonStateGame.html => 25
            // 创建订单处理
            const { cmd } = data
            // 根据cmd值处理不同游戏的付费点
            console.log('[ mg_common_game_create_order cmd ] >', cmd)
            // TODO：根据data的数据，请求业务方后端服务查询是否允许使用付费点
            // 以下为模拟请求代码，按此流程操作即可
            // const orderData = {
            //   room_id: self.gameRoomId,
            //   cmd: data.cmd,
            //   value: data.value,
            //   payload: data.payload
            // }
            // createOrder：模拟接口请求函数，业务放自行实现该处接口
            // createOrder(orderData).then((res: any) => {
            //   console.log('[ res createOrder success ] >', res)
            //   // 通知游戏创建订单结果
            //   // 创建成功，sdk调用api通知游戏
            //   self.sudFSTAPPDecorator.notifyAPPCommon('app_common_game_create_order_result', JSON.stringify({ result: 1 }), {
            //     onSuccess: () => {
            //     },
            //     onFailure: () => {}
            //   })
            // }).catch(() => {
            //   console.log('[ error createOrder fail ] >')
            //   // 创建订单失败
            //   self.sudFSTAPPDecorator.notifyAPPCommon('app_common_game_create_order_result', JSON.stringify({ result: 0 }), {
            //     onSuccess: () => {},
            //     onFailure: () => {}
            //   })
            // })
            break
        }
        self.customSudFSMMGListener?.onGameCustomerStateChange && self.customSudFSMMGListener?.onGameCustomerStateChange(handle, state, data)
      },
      // 监听玩家加入状态改变
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
      onGetGameViewInfo(handle: ISudFSMStateHandle, dataJson: string) {
        const width = self.root.clientWidth
        const height = self.root.clientHeight
        const data = JSON.parse(dataJson)
        const dpr = data.ratio || 1
        console.log(width, height, 'width,height', dataJson, 'dataJson', 'dpr', dpr)

        // TODO: 修改数据
        const gameViewInfo = {
          ret_code: 0,
          ret_msg: "success",
          view_size: {
            width: width * dpr,
            height: height * dpr
          },
          view_game_rect: {
            left: 0,
            right: 0,
            top: 50,
            bottom: 50
          }
        }

        console.log(gameViewInfo, 'gameViewInfo')

        handle.success(JSON.stringify(gameViewInfo))
      },
      // 监听加入按钮事件
      onGameMGCommonSelfClickJoinBtn(handle, res) {
        console.log('[ onGameMGCommonSelfClickJoinBtn ] >', handle, res)
        handle.success(JSON.stringify(res))
        // 在此处可以根据业务方的需求进行逻辑处理，例如，加入游戏扣积分等等，在处理完成后，需要手动调用 self.sudFSTAPPDecorator.notifyAPPCommonSelfIn(true) 用sdk来调用加入游戏
        // sdk调用api，让玩家加入游戏
        self.sudFSTAPPDecorator.notifyAPPCommonSelfIn(true)
      },
      onGetGameCfg(handle, dataJson) {
        // 游戏配置，ui相关事件监听 https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG/onGetGameCfg.html
        const config = new GameConfigModel()
        // 如： 配置监听加入按钮（config.ui.join_btn），当监听配置后，游戏默认加入操作会无效，此时需要找到对应事件进行监听如这里onGameMGCommonSelfClickJoinBtn需要监听加入按钮事件
        // config.ui.join_btn.custom = true
        // config.ui.join_btn.hide = true // 配置隐藏加入按钮

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

  // 使用后台关联好的bundleId
  public getBundleId() {
    return location.hostname // 此处是使用了域名，可以写死值，如果是桌面应用可以使用自定义的bundleId，与后台关联的值保持一致即可
  }
}
