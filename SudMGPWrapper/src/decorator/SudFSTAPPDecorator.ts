/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */

import { ISudFSTAPP, ISudListenerNotifyStateChange } from "../type/core"
import { SudMGPAPPState, Ludo, AIPlayers } from "../state/SudMGPAPPState"

const notifyStateChangeFun = {
  onSuccess: () => {},
  onFailure: () => {}
}
/**
 * ISudFSTAPP的装饰类，接近于业务
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/API/ISudFSTAPP.html
 */
export class SudFSTAPPDecorator {
  /**
   * APP调用游戏的接口
   */
  private iSudFSTAPP: ISudFSTAPP | undefined

  /**
   * 设置app调用sdk的对象
   *
   * @param iSudFSTAPP
   */

  public setISudFSTAPP(iSudFSTAPP: ISudFSTAPP): void {
    this.iSudFSTAPP = iSudFSTAPP
  }

  public notifyAPPCommon() {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const args = arguments
      console.log(args, 'args')

      // @ts-ignore
      iSudFSTAPP.notifyStateChange(...args)
    }
  }

  // region 状态通知，ISudFSTAPP.notifyStateChange

  /**
   * 发送
   * 1. 加入状态
   *
   * @param isIn         true 加入游戏，false 退出游戏
   * @param seatIndex    加入的游戏位(座位号) 默认传seatIndex = -1 随机加入，seatIndex 从0开始，不可大于座位数
   * @param isSeatRandom 默认为ture, 带有游戏位(座位号)的时候，如果游戏位(座位号)已经被占用，是否随机分配一个空位坐下 isSeatRandom=true 随机分配空位坐下，isSeatRandom=false 不随机分配
   * @param teamId       不支持分队的游戏：数值填1；支持分队的游戏：数值填1或2（两支队伍）；
   */
  public notifyAPPCommonSelfIn(isIn: boolean, seatIndex?: number, isSeatRandom?: boolean, teamId?: number) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonSelfIn({ isIn, seatIndex, isSeatRandom, teamId })
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_SELF_IN, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 2. 准备状态
   * 用户（本人）准备/取消准备
   *
   * @param isReady true 准备，false 取消准备
   */
  public notifyAPPCommonSelfReady(isReady: boolean) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonSelfReady(isReady)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_SELF_READY, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 3. 游戏状态 模型
   * 用户游戏状态，如果用户在游戏中，建议：
   * a.空出屏幕中心区：
   * 关闭全屏礼物特效；
   * b.部分强操作类小游戏（spaceMax为true），尽量收缩原生UI，给游戏留出尽量大的操作空间：
   * 收缩公屏；
   * 收缩麦位；
   * 如果不在游戏中，则恢复。
   *
   * @param isPlaying            true 开始游戏，false 结束游戏
   * @param reportGameInfoExtras string类型，Https服务回调report_game_info参数，最大长度1024字节，超过则截断（2022-01-21）
   */
  public notifyAPPCommonSelfPlaying(isPlaying: boolean, reportGameInfoExtras?: string) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonSelfPlaying(isPlaying, reportGameInfoExtras)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_SELF_PLAYING, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 4. 队长状态
   * 用户是否为队长，队长在游戏中会有开始游戏的权利。
   *
   * @param curCaptainUID 必填，指定队长uid
   */
  public notifyAPPCommonSelfCaptain(curCaptainUID: string) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonSelfCaptain(curCaptainUID)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_SELF_CAPTAIN, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 5. 踢人
   * 用户（本人，队长）踢其他玩家；
   * 队长才能踢人；
   *
   * @param kickedUID 被踢用户uid
   */
  public notifyAPPCommonSelfKick(kickedUID: string) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonSelfKick(kickedUID)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_SELF_KICK, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 6. 结束游戏
   * 用户（本人，队长）结束（本局）游戏
   */
  public notifyAPPCommonSelfEnd() {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonSelfEnd()
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_SELF_END, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 9. 麦克风状态
   * 用户（本人）麦克风状态，建议：
   * 进入房间后初始通知一次；
   * 每次变更（开麦/闭麦/禁麦/解麦）通知一次；
   *
   * @param isOn       true 开麦，false 闭麦
   * @param isDisabled true 被禁麦，false 未被禁麦
   */
  public notifyAPPCommonSelfMicrophone(isOn: boolean, isDisabled: boolean) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonSelfMicrophone(isOn, isDisabled)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_SELF_MICROPHONE, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 10. 文字命中状态
   * 用户（本人）聊天信息命中关键词状态，建议：
   * 精确匹配；
   * 首次聊天内容命中关键词之后，后续聊天内容不翻转成未命中；
   * 直至小游戏侧关键词更新，再将状态翻转为未命中；
   *
   * @param isHit       true 命中，false 未命中
   * @param keyWord     单个关键词， 兼容老版本
   * @param text        返回转写文本
   * @param wordType    text:文本包含匹配; number:数字等于匹配
   * @param keyWordList 命中关键词，可以包含多个关键词
   * @param numberList  在number模式下才有，返回转写的多个数字
   */
  public notifyAPPCommonSelfTextHitState(isHit: boolean, keyWord: string, text: string,
    wordType: string, keyWordList: string[], numberList: number[]) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonSelfTextHitState({ isHit, keyWord, text, wordType, keyWordList, numberList })
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_SELF_TEXT_HIT, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 11. 打开或关闭背景音乐（2021-12-27新增）
   *
   * @param isOpen true 打开背景音乐，false 关闭背景音乐
   */
  public notifyAPPCommonOpenBgMusic(isOpen: boolean) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonOpenBgMusic(isOpen)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_OPEN_BG_MUSIC, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 12. 打开或关闭音效（2021-12-27新增）
   *
   * @param isOpen true 打开音效，false 关闭音效
   */
  public notifyAPPCommonOpenSound(isOpen: boolean) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonOpenSound(isOpen)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_OPEN_SOUND, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 13. 打开或关闭游戏中的振动效果（2021-12-27新增）
   *
   * @param isOpen 打开振动效果，false 关闭振动效果
   */
  public notifyAPPCommonOpenVibrate(isOpen: boolean) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonOpenVibrate(isOpen)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_OPEN_VIBRATE, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 14. 设置游戏的音量大小（2021-12-31新增）
   *
   * @param volume 音量大小 0 到 100
   */
  public notifyAPPCommonGameSoundVolume(volume: number) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonGameSoundVolume(volume)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_GAME_SOUND_VOLUME, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 15.  设置游戏玩法选项（2022-05-10新增）
   *
   * @param ludo ludo游戏
   */
  public notifyAPPCommonGameSettingSelectInfo(ludo: Ludo) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonGameSettingSelectInfo(ludo)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_GAME_SETTING_SELECT_INFO, JSON.stringify(state), notifyStateChangeFun)
    }
  }

  /**
   * 发送
   * 16. 设置游戏中的AI玩家（2022-05-11新增）
   *
   * @param aiPlayers AI玩家
   * @param isReady   机器人加入后是否自动准备 1：自动准备，0：不自动准备 默认为1
   */
  public notifyAPPCommonGameAddAIPlayers(aiPlayers: AIPlayers[], isReady: number) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      const state = SudMGPAPPState.APPCommonGameAddAIPlayers(aiPlayers, isReady)
      iSudFSTAPP.notifyStateChange(SudMGPAPPState.APP_COMMON_GAME_ADD_AI_PLAYERS, JSON.stringify(state), notifyStateChangeFun)
    }
  }
  // endregion 状态通知，ISudFSTAPP.notifyStateChange

  // region 生命周期
  public startMG() {

  }

  public pauseMG() {

  }

  public playMG() {

  }

  public stopMG() {

  }

  public destroyMG() {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      iSudFSTAPP.destroyMG()
    }
  }

  // endregion 生命周期

  /**
   * 更新code
   *
   * @param code
   * @param listener
   */
  public updateCode(code: string, listener: ISudListenerNotifyStateChange) {
    const iSudFSTAPP = this.iSudFSTAPP
    if (iSudFSTAPP != null) {
      iSudFSTAPP.updateCode(code, listener)
    }
  }

  /**
   * 音频流数据
   */
  // public pushAudio(buffer: Buffer, bufferLength: number) {
  //   const iSudFSTAPP = this.iSudFSTAPP
  //   if (iSudFSTAPP != null) {
  //     iSudFSTAPP.pushAudio(buffer, bufferLength)
  //   }
  // }
}
