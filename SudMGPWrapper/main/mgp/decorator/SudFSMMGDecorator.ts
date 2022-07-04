/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */

import { ISudFSMMG, ISudFSMStateHandle } from 'SudMGP/core'
import { SudMGPMGState } from '../state/SudMGPMGState'
import {
  IMGCommonAPPCommonSelfXResp,
  IMGCommonGameAddAIPlayers,
  IMGCommonGameASR,
  IMGCommonGameBgMusicState,
  IMGCommonGameCountdownTime,
  IMGCommonGameSettle,
  IMGCommonGameSound,
  IMGCommonGameSoundList,
  IMGCommonGameSoundState,
  IMGCommonGameState,
  IMGCommonKeyWordToHit,
  IMGCommonPlayerCaptain,
  IMGCommonPlayerChangeSeat,
  IMGCommonPlayerIn,
  IMGCommonPlayerOnline,
  IMGCommonPlayerPlaying,
  IMGCommonPlayerReady,
  IMGCommonPublicMessage,
  IMGCommonSelfClickCancelJoinBtn,
  IMGCommonSelfClickCancelReadyBtn,
  IMGCommonSelfClickGamePlayerIcon,
  IMGCommonSelfClickGameSettleAgainBtn,
  IMGCommonSelfClickGameSettleCloseBtn,
  IMGCommonSelfClickJoinBtn,
  IMGCommonSelfClickReadyBtn,
  IMGCommonSelfClickShareBtn,
  IMGCommonSelfDieStatus,
  IMGCommonSelfHeadphone,
  IMGCommonSelfMicrophone,
  IMGCommonSelfSelectStatus,
  IMGCommonSelfTurnStatus,
  IMGDGErroranswer,
  IMGDGPainting,
  IMGDGScore,
  IMGDGSelecting,
  IMGDGTotalscore
} from '../state/ISudMGPMGState'
import { ISudFSMStateHandleUtils } from '../utils/ISudFSMStateHandleUtils'
import { SudFSMMGCache } from './SudFSMMGCache'
import { SudFSMMGListener } from './SudFSMMGListener'

/**
 * ISudFSMMG 游戏调APP回调装饰类
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG.html
 */

function parseJson<T>(dataJson: string): T {
  return JSON.parse(dataJson) as T
}

export class SudFSMMGDecorator implements ISudFSMMG {
  // 回调
  private sudFSMMGListener: SudFSMMGListener

  // 数据状态封装
  private sudFSMMGCache = new SudFSMMGCache()

  constructor(listener: SudFSMMGListener) {
    this.sudFSMMGListener = listener
  }

  /**
   * 设置回调
   *
   * @param listener 监听器
   */
  public setSudFSMMGListener(listener: SudFSMMGListener) {
    this.sudFSMMGListener = listener
  }

  /**
   * 游戏日志
   * 最低版本：v1.1.30.xx
   */
  public onGameLog(dataJson: string) {
    const listener = this.sudFSMMGListener
    if (listener != null) {
      listener.onGameLog(dataJson)
    }
  }

  /**
   * 游戏加载进度
   *
   * @param stage    阶段：start=1,loading=2,end=3
   * @param retCode  错误码：0成功
   * @param progress 进度：[0, 100]
   */
  public onGameLoadingProgress(stage: number, retCode: number, progress: number) {

  }

  /**
   * 游戏开始
   * 最低版本：v1.1.30.xx
   */
  public onGameStarted() {
    const listener = this.sudFSMMGListener
    if (listener != null) {
      listener.onGameStarted()
    }
  }

  /**
   * 游戏销毁
   * 最低版本：v1.1.30.xx
   */
  public onGameDestroyed() {
    const listener = this.sudFSMMGListener
    if (listener != null) {
      listener.onGameDestroyed()
    }
  }

  /**
   * Code过期，需要实现
   * APP接入方需要调用handle.success或handle.fail
   *
   * @param dataJson {"code":"value"}
   */
  public onExpireCode(handle: ISudFSMStateHandle, dataJson: string) {
    const listener = this.sudFSMMGListener
    if (listener != null) {
      listener.onExpireCode(handle, dataJson)
    }
  }

  /**
   * 获取游戏View信息，需要实现
   * APP接入方需要调用handle.success或handle.fail
   *
   * @param handle   操作
   * @param dataJson {}
   */
  public onGetGameViewInfo(handle: ISudFSMStateHandle, dataJson: string) {
    const listener = this.sudFSMMGListener
    if (listener != null) {
      listener.onGetGameViewInfo(handle, dataJson)
    }
  }

  /**
   * 获取游戏Config，需要实现
   * APP接入方需要调用handle.success或handle.fail
   *
   * @param handle   操作
   * @param dataJson {}
   *                 最低版本：v1.1.30.xx
   */
  public onGetGameCfg(handle: ISudFSMStateHandle, dataJson: string) {
    const listener = this.sudFSMMGListener
    if (listener != null) {
      listener.onGetGameCfg(handle, dataJson)
    }
  }

  /**
   * 游戏状态变化
   * APP接入方需要调用handle.success或handle.fail
   *
   * @param handle   操作
   * @param state    状态命令
   * @param dataJson 状态值
   */
  public onGameStateChange(handle: ISudFSMStateHandle, state: string, dataJson: string) {
    const listener = this.sudFSMMGListener
    switch (state) {
      case SudMGPMGState.MG_COMMON_PUBLIC_MESSAGE: { // 1. 公屏消息
        const res = parseJson<IMGCommonPublicMessage>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonPublicMessage(handle, res)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_KEY_WORD_TO_HIT: { // 2. 关键词状态
        const res = parseJson<IMGCommonKeyWordToHit>(dataJson)

        this.sudFSMMGCache.onGameMGCommonKeyWordToHit(res)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonKeyWordToHit(handle, res)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_GAME_SETTLE: { // 3. 游戏结算状态
        const res = parseJson<IMGCommonGameSettle>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonGameSettle(handle, res)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_CLICK_JOIN_BTN: { // 4. 加入游戏按钮点击状态
        const res = parseJson<IMGCommonSelfClickJoinBtn>(dataJson)

        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfClickJoinBtn(handle, res)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_CLICK_CANCEL_JOIN_BTN: { // 5. 取消加入(退出)游戏按钮点击状态
        const res = parseJson<IMGCommonSelfClickCancelJoinBtn>(dataJson)

        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfClickCancelJoinBtn(handle, res)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_CLICK_READY_BTN: { // 6. 准备按钮点击状态
        const res = parseJson<IMGCommonSelfClickReadyBtn>(dataJson)

        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfClickReadyBtn(handle, res)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_CLICK_CANCEL_READY_BTN:{ // 7. 取消准备按钮点击状态
        const res = parseJson<IMGCommonSelfClickCancelReadyBtn>(dataJson)

        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfClickCancelReadyBtn(handle, res)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_CLICK_START_BTN: { // 8. 开始游戏按钮点击状态
        const res = parseJson<IMGCommonSelfClickCancelReadyBtn>(dataJson)

        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfClickStartBtn(handle, res)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_CLICK_SHARE_BTN: { // 9. 分享按钮点击状态
        const mgCommonSelfClickShareBtn = parseJson<IMGCommonSelfClickShareBtn>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfClickShareBtn(handle, mgCommonSelfClickShareBtn)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_GAME_STATE: { // 10. 游戏状态
        const mgCommonGameState = parseJson<IMGCommonGameState>(dataJson)
        this.sudFSMMGCache.onGameMGCommonGameState(mgCommonGameState)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonGameState(handle, mgCommonGameState)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_CLICK_GAME_SETTLE_CLOSE_BTN: { // 11. 结算界面关闭按钮点击状态（2021-12-27新增）
        const mgCommonSelfClickGameSettleCloseBtn = parseJson<IMGCommonSelfClickGameSettleCloseBtn>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfClickGameSettleCloseBtn(handle, mgCommonSelfClickGameSettleCloseBtn)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_CLICK_GAME_SETTLE_AGAIN_BTN: { // 12. 结算界面再来一局按钮点击状态（2021-12-27新增）
        const mgCommonSelfClickGameSettleAgainBtn = parseJson<IMGCommonSelfClickGameSettleAgainBtn>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfClickGameSettleAgainBtn(handle, mgCommonSelfClickGameSettleAgainBtn)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_GAME_SOUND_LIST: { // 13. 游戏上报游戏中的声音列表（2021-12-30新增，现在只支持碰碰我最强）
        const mgCommonGameSoundList = parseJson<IMGCommonGameSoundList>(dataJson)

        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonGameSoundList(handle, mgCommonGameSoundList)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_GAME_SOUND:{ // 14. 游通知app层播放声音（2021-12-30新增，现在只支持碰碰我最强）
        const mgCommonGameSound = parseJson<IMGCommonGameSound>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonGameSound(handle, mgCommonGameSound)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_GAME_BG_MUSIC_STATE: { // 15. 游戏通知app层播放背景音乐状态（2022-01-07新增，现在只支持碰碰我最强）
        const mgCommonGameBgMusicState = parseJson<IMGCommonGameBgMusicState>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonGameBgMusicState(handle, mgCommonGameBgMusicState)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_GAME_SOUND_STATE: { // 16. 游戏通知app层播放音效的状态（2022-01-07新增，现在只支持碰碰我最强）
        const mgCommonGameSoundState = parseJson<IMGCommonGameSoundState>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonGameSoundState(handle, mgCommonGameSoundState)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_GAME_ASR: { // 17. ASR状态(开启和关闭语音识别状态，v1.1.45.xx 版本新增)
        const mgCommonGameASR = parseJson<IMGCommonGameASR>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonGameASR(handle, mgCommonGameASR)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_MICROPHONE: { // 18. 麦克风状态（2022-02-08新增）
        const mgCommonSelfMicrophone = parseJson<IMGCommonSelfMicrophone>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfMicrophone(handle, mgCommonSelfMicrophone)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_HEADPHONE:{ // 19. 耳机（听筒，扬声器）状态（2022-02-08新增）
        const mgCommonSelfHeadphone = parseJson<IMGCommonSelfHeadphone>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonSelfHeadphone(handle, mgCommonSelfHeadphone)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_APP_COMMON_SELF_X_RESP: { // 20. App通用状态操作结果错误码（2022-05-10新增）
        const mgCommonAPPCommonSelfXResp = parseJson<IMGCommonAPPCommonSelfXResp>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonAPPCommonSelfXResp(handle, mgCommonAPPCommonSelfXResp)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_GAME_ADD_AI_PLAYERS: { // 21. 游戏通知app层添加陪玩机器人是否成功（2022-05-17新增）
        const mgCommonGameAddAIPlayers = parseJson<IMGCommonGameAddAIPlayers>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onGameMGCommonGameAddAIPlayers(handle, mgCommonGameAddAIPlayers)
        }
        break
      }
      default:
        ISudFSMStateHandleUtils.handleSuccess(handle)
        break
    }
  }

  /**
   * 游戏玩家状态变化
   * APP接入方需要调用handle.success或handle.fail
   *
   * @param handle   操作
   * @param userId   用户id
   * @param state    状态命令
   * @param dataJson 状态值
   */
  public onPlayerStateChange(handle: ISudFSMStateHandle, userId: string, state: string, dataJson: string) {
    const listener = this.sudFSMMGListener
    // const parseJson = JSON.parse(dataJson)

    switch (state) {
      case SudMGPMGState.MG_COMMON_PLAYER_IN: { // 1.加入状态（已修改）
        const mgCommonPlayerIn = parseJson<IMGCommonPlayerIn>(dataJson)
        this.sudFSMMGCache.onPlayerMGCommonPlayerIn(userId, mgCommonPlayerIn)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonPlayerIn(handle, userId, mgCommonPlayerIn)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_PLAYER_READY: { // 2.准备状态（已修改）
        const mgCommonPlayerReady = parseJson<IMGCommonPlayerReady>(dataJson)
        this.sudFSMMGCache.onPlayerMGCommonPlayerReady(userId, mgCommonPlayerReady)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonPlayerReady(handle, userId, mgCommonPlayerReady)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_PLAYER_CAPTAIN: { // 3.队长状态（已修改）
        const mgCommonPlayerCaptain = parseJson<IMGCommonPlayerCaptain>(dataJson)
        this.sudFSMMGCache.onPlayerMGCommonPlayerCaptain(userId, mgCommonPlayerCaptain)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonPlayerCaptain(handle, userId, mgCommonPlayerCaptain)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_PLAYER_PLAYING: { // 4.游戏状态（已修改）
        const mgCommonPlayerPlaying = parseJson<IMGCommonPlayerPlaying>(dataJson)
        this.sudFSMMGCache.onPlayerMGCommonPlayerPlaying(userId, mgCommonPlayerPlaying)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonPlayerPlaying(handle, userId, mgCommonPlayerPlaying)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_PLAYER_ONLINE: { // 5.玩家在线状态
        const mgCommonPlayerOnline = parseJson<IMGCommonPlayerOnline>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonPlayerOnline(handle, userId, mgCommonPlayerOnline)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_PLAYER_CHANGE_SEAT: { // 6.玩家换游戏位状态
        const mgCommonPlayerChangeSeat = parseJson<IMGCommonPlayerChangeSeat>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonPlayerChangeSeat(handle, userId, mgCommonPlayerChangeSeat)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_CLICK_GAME_PLAYER_ICON: { // 7. 游戏通知app点击玩家头像（2022-02-09新增，现在只支持飞行棋ludo，仅用于游戏场景中的玩家头像）
        const mgCommonSelfClickGamePlayerIcon = parseJson<IMGCommonSelfClickGamePlayerIcon>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonSelfClickGamePlayerIcon(handle, userId, mgCommonSelfClickGamePlayerIcon)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_DIE_STATUS: { // 8. 游戏通知app玩家死亡状态（2022-04-24新增）
        const mgCommonSelfDieStatus = parseJson<IMGCommonSelfDieStatus>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonSelfDieStatus(handle, userId, mgCommonSelfDieStatus)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_TURN_STATUS:{ // 9. 游戏通知app轮到玩家出手状态（2022-04-24新增）
        const mgCommonSelfTurnStatus = parseJson<IMGCommonSelfTurnStatus>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonSelfTurnStatus(handle, userId, mgCommonSelfTurnStatus)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_SELF_SELECT_STATUS: { // 10. 游戏通知app玩家选择状态（2022-04-24新增）
        const mgCommonSelfSelectStatus = parseJson<IMGCommonSelfSelectStatus>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonSelfSelectStatus(handle, userId, mgCommonSelfSelectStatus)
        }
        break
      }
      case SudMGPMGState.MG_COMMON_GAME_COUNTDOWN_TIME: { // 11. 游戏通知app层当前游戏剩余时间（2022-05-23新增，目前UMO生效）
        const mgCommonGameCountdownTime = parseJson<IMGCommonGameCountdownTime>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGCommonGameCountdownTime(handle, userId, mgCommonGameCountdownTime)
        }
        break
      }
      case SudMGPMGState.MG_DG_SELECTING:{ // 1. 选词中状态（已修改）
        const mgdgSelecting = parseJson<IMGDGSelecting>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGDGSelecting(handle, userId, mgdgSelecting)
        }
        break
      }
      case SudMGPMGState.MG_DG_PAINTING: { // 2. 作画中状态（已修改）
        const mgdgPainting = parseJson<IMGDGPainting>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGDGPainting(handle, userId, mgdgPainting)
        }
        break
      }
      case SudMGPMGState.MG_DG_ERRORANSWER: { // 3. 显示错误答案状态（已修改）
        const mgdgErroranswer = parseJson<IMGDGErroranswer>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGDGErroranswer(handle, userId, mgdgErroranswer)
        }
        break
      }
      case SudMGPMGState.MG_DG_TOTALSCORE: { // 4. 显示总积分状态（已修改）
        const mgdgTotalscore = parseJson<IMGDGTotalscore>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGDGTotalscore(handle, userId, mgdgTotalscore)
        }
        break
      }
      case SudMGPMGState.MG_DG_SCORE: { // 5. 本次获得积分状态（已修改）
        const mgdgScore = parseJson<IMGDGScore>(dataJson)
        if (listener == null) {
          ISudFSMStateHandleUtils.handleSuccess(handle)
        } else {
          listener.onPlayerMGDGScore(handle, userId, mgdgScore)
        }
        break
      }
      default:
        ISudFSMStateHandleUtils.handleSuccess(handle)
        break
    }
  }

  // 返回该用户是否为游戏队长
  public isCaptain(userId: string): boolean {
    return this.sudFSMMGCache.isCaptain(userId)
  }

  // 返回该玩家是否正在游戏中
  public playerIsPlaying(userId: string): boolean {
    return this.sudFSMMGCache.playerIsPlaying(userId)
  }

  // 返回该玩家是否已准备
  public playerIsReady(userId: string): boolean {
    return this.sudFSMMGCache.playerIsReady(userId)
  }

  // 返回该玩家是否已加入了游戏
  public playerIsIn(userId: string): boolean {
    return this.sudFSMMGCache.playerIsIn(userId)
  }

  // 获取当前游戏中的人数
  public getPlayerInNumber(): number {
    return this.sudFSMMGCache.getPlayerInNumber()
  }

  // 是否数字炸弹
  public isHitBomb(): boolean {
    return this.sudFSMMGCache.isHitBomb()
  }

  // 销毁游戏
  public destroyMG() {
    this.sudFSMMGCache.destroyMG()
  }

  /**
   * 返回当前游戏的状态，数值参数{@link SudMGPMGState.MGCommonGameState}
   */
  public getGameState(): number {
    return this.sudFSMMGCache.getGameState()
  }
}
