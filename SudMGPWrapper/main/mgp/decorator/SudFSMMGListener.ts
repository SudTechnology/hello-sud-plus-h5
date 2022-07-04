/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */

import { ISudFSMStateHandle } from "SudMGP/core"
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
  IMGCommonSelfClickStartBtn,
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
import { ISudFSMStateHandleUtils } from "../utils/ISudFSMStateHandleUtils"

/**
 * {@link SudFSMMGDecorator} 回调定义
 */
export class SudFSMMGListener implements ISudFSMMGListener {
  onGameLog(str: string): void {
    throw new Error("Method not implemented.")
  }

  onGameStarted(): void {
    throw new Error("Method not implemented.")
  }

  onGameDestroyed(): void {
    throw new Error("Method not implemented.")
  }

  onExpireCode(handle: ISudFSMStateHandle, dataJson: string): void {
    throw new Error("Method not implemented.")
  }

  onGetGameViewInfo(handle: ISudFSMStateHandle, dataJson: string): void {
    throw new Error("Method not implemented.")
  }

  onGetGameCfg(handle: ISudFSMStateHandle, dataJson: string): void {
    throw new Error("Method not implemented.")
  }

  /**
     * 1.游戏公屏消息
     */
  onGameMGCommonPublicMessage(handle: ISudFSMStateHandle, model: IMGCommonPublicMessage) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 2. 关键词状态
  //  */
  onGameMGCommonKeyWordToHit(handle: ISudFSMStateHandle, model: IMGCommonKeyWordToHit) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 3. 游戏结算状态
  //  */
  onGameMGCommonGameSettle(handle: ISudFSMStateHandle, model: IMGCommonGameSettle) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 4. 加入游戏按钮点击状态
  //  */
  onGameMGCommonSelfClickJoinBtn(handle: ISudFSMStateHandle, model: IMGCommonSelfClickJoinBtn) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 5. 取消加入(退出)游戏按钮点击状态
  //  */
  onGameMGCommonSelfClickCancelJoinBtn(handle: ISudFSMStateHandle, model: IMGCommonSelfClickCancelJoinBtn) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 6. 准备按钮点击状态
  //  */
  onGameMGCommonSelfClickReadyBtn(handle: ISudFSMStateHandle, model: IMGCommonSelfClickReadyBtn) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 7. 取消准备按钮点击状态
  //  */
  onGameMGCommonSelfClickCancelReadyBtn(handle: ISudFSMStateHandle, model: IMGCommonSelfClickCancelReadyBtn) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 8. 开始游戏按钮点击状态
  //  */
  onGameMGCommonSelfClickStartBtn(handle: ISudFSMStateHandle, model: IMGCommonSelfClickStartBtn) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 9. 分享按钮点击状态
  //  */
  onGameMGCommonSelfClickShareBtn(handle: ISudFSMStateHandle, model: IMGCommonSelfClickShareBtn) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 10. 游戏状态
  //  */
  onGameMGCommonGameState(handle: ISudFSMStateHandle, model: IMGCommonGameState) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 11. 结算界面关闭按钮点击状态（2021-12-27新增）
  //  */
  onGameMGCommonSelfClickGameSettleCloseBtn(handle: ISudFSMStateHandle, model: IMGCommonSelfClickGameSettleCloseBtn) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 12. 结算界面再来一局按钮点击状态（2021-12-27新增）
  //  */
  onGameMGCommonSelfClickGameSettleAgainBtn(handle: ISudFSMStateHandle, model: IMGCommonSelfClickGameSettleAgainBtn) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 13. 游戏上报游戏中的声音列表（2021-12-30新增，现在只支持碰碰我最强）
  //  */
  onGameMGCommonGameSoundList(handle: ISudFSMStateHandle, model: IMGCommonGameSoundList) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 14. 游通知app层播放声音（2021-12-30新增，现在只支持碰碰我最强）
  //  */
  onGameMGCommonGameSound(handle: ISudFSMStateHandle, model: IMGCommonGameSound) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 15. 游戏通知app层播放背景音乐状态（2022-01-07新增，现在只支持碰碰我最强）
  //  */
  onGameMGCommonGameBgMusicState(handle: ISudFSMStateHandle, model: IMGCommonGameBgMusicState) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 16. 游戏通知app层播放音效的状态（2022-01-07新增，现在只支持碰碰我最强）
  //  */
  onGameMGCommonGameSoundState(handle: ISudFSMStateHandle, model: IMGCommonGameSoundState) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 17. ASR状态(开启和关闭语音识别状态，v1.1.45.xx 版本新增)
  //  */
  onGameMGCommonGameASR(handle: ISudFSMStateHandle, model: IMGCommonGameASR) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 18. 麦克风状态（2022-02-08新增）
  //  */
  onGameMGCommonSelfMicrophone(handle: ISudFSMStateHandle, model: IMGCommonSelfMicrophone) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 19. 耳机（听筒，扬声器）状态（2022-02-08新增）
  //  */
  onGameMGCommonSelfHeadphone(handle: ISudFSMStateHandle, model: IMGCommonSelfHeadphone) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 20. App通用状态操作结果错误码（2022-05-10新增）
  //  */
  onGameMGCommonAPPCommonSelfXResp(handle: ISudFSMStateHandle, model: IMGCommonAPPCommonSelfXResp) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 21. 游戏通知app层添加陪玩机器人是否成功（2022-05-17新增）
  //  */
  onGameMGCommonGameAddAIPlayers(handle: ISudFSMStateHandle, model: IMGCommonGameAddAIPlayers) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }
  // // endregion 游戏回调APP 通用状态

  // // region 游戏回调APP 玩家状态

  // /**
  //  * 1.加入状态（已修改）
  //  */
  onPlayerMGCommonPlayerIn(handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerIn) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 2.准备状态（已修改）
  //  */
  onPlayerMGCommonPlayerReady(handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerReady) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 3.队长状态（已修改）
  //  */
  onPlayerMGCommonPlayerCaptain(handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerCaptain) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 4.游戏状态（已修改）
  //  */
  onPlayerMGCommonPlayerPlaying(handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerPlaying) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 5.玩家在线状态
  //  */
  onPlayerMGCommonPlayerOnline(handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerOnline) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 6.玩家换游戏位状态
  //  */
  onPlayerMGCommonPlayerChangeSeat(handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerChangeSeat) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 7. 游戏通知app点击玩家头像（2022-02-09新增，现在只支持飞行棋ludo，仅用于游戏场景中的玩家头像）
  //  */
  onPlayerMGCommonSelfClickGamePlayerIcon(handle: ISudFSMStateHandle, userId: string, model: IMGCommonSelfClickGamePlayerIcon) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 8. 游戏通知app玩家死亡状态（2022-04-24新增）
  //  */
  onPlayerMGCommonSelfDieStatus(handle: ISudFSMStateHandle, userId: string, model: IMGCommonSelfDieStatus) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 9. 游戏通知app轮到玩家出手状态（2022-04-24新增）
  //  */
  onPlayerMGCommonSelfTurnStatus(handle: ISudFSMStateHandle, userId: string, model: IMGCommonSelfTurnStatus) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 10. 游戏通知app玩家选择状态（2022-04-24新增）
  //  */
  onPlayerMGCommonSelfSelectStatus(handle: ISudFSMStateHandle, userId: string, model: IMGCommonSelfSelectStatus) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 11. 游戏通知app层当前游戏剩余时间（2022-05-23新增，目前UMO生效）
  //  */
  onPlayerMGCommonGameCountdownTime(handle: ISudFSMStateHandle, userId: string, model: IMGCommonGameCountdownTime) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // // endregion 游戏回调APP 玩家状态

  // // region 游戏回调APP 玩家状态 你画我猜
  // // 参考文档：https://github.com/SudTechnology/sud-mgp-doc/blob/main/Client/MG%20FSM/%E4%BD%A0%E7%94%BB%E6%88%91%E7%8C%9C.md

  // /**
  //  * 1. 选词中状态（已修改）
  //  */
  onPlayerMGDGSelecting(handle: ISudFSMStateHandle, userId: string, model: IMGDGSelecting) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 2. 作画中状态（已修改）
  //  */
  onPlayerMGDGPainting(handle: ISudFSMStateHandle, userId: string, model: IMGDGPainting) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 3. 显示错误答案状态（已修改）
  //  */
  onPlayerMGDGErroranswer(handle: ISudFSMStateHandle, userId: string, model: IMGDGErroranswer) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 4. 显示总积分状态（已修改）
  //  */
  onPlayerMGDGTotalscore(handle: ISudFSMStateHandle, userId: string, model: IMGDGTotalscore) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // /**
  //  * 5. 本次获得积分状态（已修改）
  //  */
  onPlayerMGDGScore(handle: ISudFSMStateHandle, userId: string, model: IMGDGScore) {
    ISudFSMStateHandleUtils.handleSuccess(handle)
  }

  // endregion 游戏回调APP 玩家状态 你画我猜
}

export interface ISudFSMMGListener {

    /**
     * 游戏日志
     * 最低版本：v1.1.30.xx
     */
    onGameLog(str: string): void

    /**
     * 游戏开始，需要实现
     * 最低版本：v1.1.30.xx
     */
    onGameStarted(): void

    /**
     * 游戏销毁，需要实现
     * 最低版本：v1.1.30.xx
     */
    onGameDestroyed(): void

    /**
     * Code过期，需要实现
     * APP接入方需要调用handle.success或handle.fail
     *
     * @param dataJson {"code":"value"}
     */
    onExpireCode(handle: ISudFSMStateHandle, dataJson: string): void

    /**
     * 获取游戏View信息，需要实现
     * APP接入方需要调用handle.success或handle.fail
     *
     * @param handle
     * @param dataJson {}
     */
    onGetGameViewInfo(handle: ISudFSMStateHandle, dataJson: string): void

    /**
     * 获取游戏Config，需要实现
     * APP接入方需要调用handle.success或handle.fail
     *
     * @param handle
     * @param dataJson {}
     *                 最低版本：v1.1.30.xx
     */
    onGetGameCfg(handle: ISudFSMStateHandle, dataJson: string): void
}
