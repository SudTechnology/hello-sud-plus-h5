/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */

import { IMGCommonGameState, IMGCommonKeyWordToHit, IMGCommonPlayerCaptain, IMGCommonPlayerIn, IMGCommonPlayerPlaying, IMGCommonPlayerReady, MGCommonGameStateValue } from "../state/ISudMGPMGState"

/**
 * 游戏回调数据缓存
 */
export class SudFSMMGCache {
  private captainUserId: string | undefined // 记录当前队长的用户id
  private mgCommonGameStateModel: IMGCommonGameState | null | undefined // 全局游戏状态
  private _isHitBomb = false // 是否数字炸弹
  public playerInSet = new Map<string, any>() // 记录已经加入了游戏的玩家
  public playerReadySet = new Map<string, any>() // 记录已经准备好的游戏玩家
  public playerPlayingMap = new Map<string, IMGCommonPlayerPlaying>() // 记录玩家的游戏状态

  // 队长状态 处理
  public onPlayerMGCommonPlayerCaptain(userId: string, model: IMGCommonPlayerCaptain) {
    if (model != null) {
      try {
        if (model.isCaptain) {
          this.captainUserId = userId
        } else {
          if (userId === this.captainUserId) {
            this.captainUserId = '0'
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  };

  // 游戏状态 处理
  public onGameMGCommonGameState(model: IMGCommonGameState) {
    this.mgCommonGameStateModel = model
  }

  // 玩家加入状态处理
  public onPlayerMGCommonPlayerIn(userId: string, model: IMGCommonPlayerIn) {
    if (model != null) {
      if (model.isIn) {
        this.playerInSet.set(userId, userId)
      } else {
        this.playerInSet.delete(userId)
        this.playerReadySet.delete(userId)
      }
    }
  }

  public getJoinedGamePlayerIdList(): string[] {
    return Array.from(this.playerInSet.values())
  }

  // 玩家准备状态
  public onPlayerMGCommonPlayerReady(userId: string, model: IMGCommonPlayerReady) {
    if (model != null) {
      if (model.isReady) {
        this.playerReadySet.set(userId, userId)
      } else {
        this.playerReadySet.delete(userId)
      }
    }
  }

  // 玩家游戏状态
  public onPlayerMGCommonPlayerPlaying(userId: string, model: IMGCommonPlayerPlaying) {
    if (model != null) {
      this.playerPlayingMap.set(userId, model)
    }
  }

  // 关键词状态
  public onGameMGCommonKeyWordToHit(model: IMGCommonKeyWordToHit) {
    if (model != null) {
      this._isHitBomb = model.wordType === "number"
    }
  }

  // 返回该用户是否为游戏队长
  public isCaptain(userId: string): boolean {
    return this.captainUserId === userId
  }

  // 返回该玩家是否正在游戏中
  public playerIsPlaying(userId: string): boolean {
    const mgCommonPlayerPlaying = this.playerPlayingMap.get(userId)
    if (mgCommonPlayerPlaying != null) {
      return mgCommonPlayerPlaying.isPlaying
    }
    return false
  }

  // 返回该玩家是否已准备
  public playerIsReady(userId: string): boolean {
    return this.playerReadySet.has(userId)
  }

  // 返回该玩家是否已加入了游戏
  public playerIsIn(userId: string): boolean {
    return this.playerInSet.has(userId)
  }

  // 获取当前游戏中的人数
  public getPlayerInNumber(): number {
    return this.playerInSet.size
  }

  // 是否数字炸弹
  public isHitBomb(): boolean {
    return this._isHitBomb
  }

  // 销毁游戏
  public destroyMG() {
    this.captainUserId = '0'
    this.mgCommonGameStateModel = null
    this._isHitBomb = false
    this.playerInSet.clear()
    this.playerReadySet.clear()
    this.playerPlayingMap.clear()
  }

  /**
     * 返回当前游戏的状态，数值参数{@link SudMGPMGState.MGCommonGameState}
     */
  public getGameState(): number {
    if (this.mgCommonGameStateModel != null) {
      return this.mgCommonGameStateModel.gameState
    }
    return MGCommonGameStateValue.UNKNOW
  }
}
