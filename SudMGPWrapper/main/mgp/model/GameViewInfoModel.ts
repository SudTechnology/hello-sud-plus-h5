/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */

/**
 * 游戏视图
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG/onGetGameViewInfo.html
 */

interface GameViewSizeModel {
  // 游戏View的宽 （单位像素）
  width: number

  // 游戏View的高 （单位像素）
  height: number
}

interface GameViewRectModel {
  // 相对于view_size左边框偏移（单位像素）
  left: number
  // 相对于view_size上边框偏移（单位像素）
  top: number
  // 相对于view_size右边框偏移（单位像素）
  right: number
  // 相对于view_size下边框偏移（单位像素）
  bottom: number
}

export class GameViewInfoModel {
  // 返回码
  public ret_code: number = 0

  // 返回消息
  public ret_msg: string = ''

  // 游戏View的大小
  public view_size: GameViewSizeModel = {
    width: 0,
    height: 0
  }

  // 游戏安全操作区域
  public view_game_rect: GameViewRectModel = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
}
