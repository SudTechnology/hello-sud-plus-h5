import { SudFSMMGDecorator, SudFSTAPPDecorator } from '../SudMGP/SudMGPWrapper'
import { SudMGP } from '../SudMGP/SudMGP'
import { getCode } from 'api/login' // 短期令牌code接口
import { IMGCommonPublicMessage, IMGCommonKeyWordToHit, IMGCommonGameSettle, IMGCommonSelfClickJoinBtn, IMGCommonSelfClickCancelJoinBtn, IMGCommonSelfClickReadyBtn, IMGCommonSelfClickCancelReadyBtn, IMGCommonSelfClickStartBtn, IMGCommonSelfClickShareBtn, IMGCommonGameState, IMGCommonSelfClickGameSettleCloseBtn, IMGCommonSelfClickGameSettleAgainBtn, IMGCommonGameSoundList, IMGCommonGameSound, IMGCommonGameBgMusicState, IMGCommonGameSoundState, IMGCommonGameASR, IMGCommonSelfMicrophone, IMGCommonSelfHeadphone, IMGCommonAPPCommonSelfXResp, IMGCommonGameAddAIPlayers, IMGCommonPlayerIn, IMGCommonPlayerReady, IMGCommonPlayerCaptain, IMGCommonPlayerPlaying, IMGCommonPlayerOnline, IMGCommonPlayerChangeSeat, IMGCommonSelfClickGamePlayerIcon, IMGCommonSelfDieStatus, IMGCommonSelfTurnStatus, IMGCommonSelfSelectStatus, IMGCommonGameCountdownTime, IMGDGSelecting, IMGDGPainting, IMGDGErroranswer, IMGDGTotalscore, IMGDGScore } from 'SudMGP/SudMGPWrapper/state/ISudMGPMGState'
import { ISudFSMStateHandle } from 'SudMGP/SudMGPWrapper/type/core'

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
  private language: string = "zh-CN"
  private gameId: string
  private bundleId: string = ''

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
  public GAME_IS_TEST_ENV = true

  // app调用sdk的封装类
  public sudFSTAPPDecorator = new SudFSTAPPDecorator()
  // 用于处理游戏SDK部分回调业务
  public sudFSMMGDecorator = new SudFSMMGDecorator()

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
   * @param appId
   */
  public login(userId: string) {
    // 获取code
    return new Promise(() => {
      const data = {
        user_id: userId,
        app_id: this.SudMGP_APP_ID
      }
      getCode(data).then((res) => {
        console.log(res, 'dddd')
        const code = res.data.code
        this.initSdk({
          userId,
          code,
          appId: this.SudMGP_APP_ID,
          appKey: this.SudMGP_APP_KEY,
          isTestEnv: false
        })
      })
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
    // @ts-ignore
    SudMGP.initSDK(appId, appKey, bundleId, isTestEnv, {
      onSuccess() {
        self.loadGame({ userId, code })
      },
      onFailure(errCode: number, errMsg: string) {
        // TODO: 2022/6/13 下面可以根据业务需要决定是否保留
        if (isTestEnv) {
          console.error(`${bundleId}, initSDK onFailure:${errMsg} (${errCode})`)
        }
        // TODO:
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

    this.sudFSMMGDecorator.setSudFSMMGListener({
      onGameStarted() {
        console.log('game-start')
      },
      onGameLog: function (str: string): void {
        throw new Error('Function not implemented.')
      },
      onGameDestroyed: function (): void {
        throw new Error('Function not implemented.')
      },
      onExpireCode: function (handle: ISudFSMStateHandle, dataJson: string): void {
        throw new Error('Function not implemented.')
      },
      onGetGameViewInfo: function (handle: ISudFSMStateHandle, dataJson: string): void {
        // TODO: 修改数据
        var gameViewInfo = {
          ret_code: 0,
          ret_msg: "success",
          view_size: {
            width: 750,
            height: 1334
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
        throw new Error('Function not implemented.')
      },
      onGameMGCommonPublicMessage: function (handle: ISudFSMStateHandle, model: IMGCommonPublicMessage): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonKeyWordToHit: function (handle: ISudFSMStateHandle, model: IMGCommonKeyWordToHit): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonGameSettle: function (handle: ISudFSMStateHandle, model: IMGCommonGameSettle): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfClickJoinBtn: function (handle: ISudFSMStateHandle, model: IMGCommonSelfClickJoinBtn): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfClickCancelJoinBtn: function (handle: ISudFSMStateHandle, model: IMGCommonSelfClickCancelJoinBtn): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfClickReadyBtn: function (handle: ISudFSMStateHandle, model: IMGCommonSelfClickReadyBtn): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfClickCancelReadyBtn: function (handle: ISudFSMStateHandle, model: IMGCommonSelfClickCancelReadyBtn): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfClickStartBtn: function (handle: ISudFSMStateHandle, model: IMGCommonSelfClickStartBtn): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfClickShareBtn: function (handle: ISudFSMStateHandle, model: IMGCommonSelfClickShareBtn): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonGameState: function (handle: ISudFSMStateHandle, model: IMGCommonGameState): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfClickGameSettleCloseBtn: function (handle: ISudFSMStateHandle, model: IMGCommonSelfClickGameSettleCloseBtn): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfClickGameSettleAgainBtn: function (handle: ISudFSMStateHandle, model: IMGCommonSelfClickGameSettleAgainBtn): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonGameSoundList: function (handle: ISudFSMStateHandle, model: IMGCommonGameSoundList): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonGameSound: function (handle: ISudFSMStateHandle, model: IMGCommonGameSound): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonGameBgMusicState: function (handle: ISudFSMStateHandle, model: IMGCommonGameBgMusicState): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonGameSoundState: function (handle: ISudFSMStateHandle, model: IMGCommonGameSoundState): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonGameASR: function (handle: ISudFSMStateHandle, model: IMGCommonGameASR): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfMicrophone: function (handle: ISudFSMStateHandle, model: IMGCommonSelfMicrophone): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonSelfHeadphone: function (handle: ISudFSMStateHandle, model: IMGCommonSelfHeadphone): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonAPPCommonSelfXResp: function (handle: ISudFSMStateHandle, model: IMGCommonAPPCommonSelfXResp): void {
        throw new Error('Function not implemented.')
      },
      onGameMGCommonGameAddAIPlayers: function (handle: ISudFSMStateHandle, model: IMGCommonGameAddAIPlayers): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonPlayerIn: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerIn): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonPlayerReady: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerReady): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonPlayerCaptain: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerCaptain): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonPlayerPlaying: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerPlaying): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonPlayerOnline: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerOnline): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonPlayerChangeSeat: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerChangeSeat): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonSelfClickGamePlayerIcon: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonSelfClickGamePlayerIcon): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonSelfDieStatus: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonSelfDieStatus): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonSelfTurnStatus: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonSelfTurnStatus): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonSelfSelectStatus: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonSelfSelectStatus): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGCommonGameCountdownTime: function (handle: ISudFSMStateHandle, userId: string, model: IMGCommonGameCountdownTime): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGDGSelecting: function (handle: ISudFSMStateHandle, userId: string, model: IMGDGSelecting): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGDGPainting: function (handle: ISudFSMStateHandle, userId: string, model: IMGDGPainting): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGDGErroranswer: function (handle: ISudFSMStateHandle, userId: string, model: IMGDGErroranswer): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGDGTotalscore: function (handle: ISudFSMStateHandle, userId: string, model: IMGDGTotalscore): void {
        throw new Error('Function not implemented.')
      },
      onPlayerMGDGScore: function (handle: ISudFSMStateHandle, userId: string, model: IMGDGScore): void {
        throw new Error('Function not implemented.')
      }
    })
    this.sudFSMMGDecorator.onGameLoadingProgress = function (stage: number, retCode: number, progress: number) {
      console.log(stage, retCode, progress, 'progress')
    }
    console.log(userId, gameRoomId, code, gameId, language, this.sudFSMMGDecorator)

    // 调用游戏sdk加载游戏
    // @ts-ignore
    // eslint-disable-next-line no-unused-vars
    const iSudFSTAPP = SudMGP.loadMG(userId, gameRoomId, code, gameId, language, this.sudFSMMGDecorator)
    // APP调用游戏接口的装饰类设置
    // this.sudFSTAPPDecorator.setISudFSTAPP(iSudFSTAPP)
  }

  // 根据域名生成bundleId
  public getBundleId() {
    return 'tech.sud.mgp.hello'
  }
}
