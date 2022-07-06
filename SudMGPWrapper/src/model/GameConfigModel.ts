/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */
/**
 * 游戏配置模型
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG/onGetGameCfg.html
 */

// 游戏配置中，ui部分
export class GameUi {
  public gameSettle = new GameSettle() // 结算界面
  public ping = new GamePing() // 界面中的ping值
  public version = new GameVersion() // 界面中的版本信息值
  public level = new GameLevel() // 大厅中的段位信息
  public lobby_setting_btn = new GameLobbySettingBtn() // 大厅的设置按钮
  public lobby_help_btn = new GameLobbyHelpBtn() // 大厅的帮助按钮
  public lobby_players = new GameLobbyPlayers() // 大厅玩家展示位
  public lobby_player_captain_icon = new GameLobbyPlayerCaptainIcon() // 大厅玩家展示位上队长标识
  public lobby_player_kickout_icon = new GameLobbyPlayerKickoutIcon() // 大厅玩家展示位上踢人标识
  public lobby_rule = new GameLobbyRule() // 大厅的玩法规则描述文字
  public lobby_game_setting = new GameLobbyGameSetting() // 玩法设置
  public join_btn = new GameJoinBtn() // 加入按钮
  public cancel_join_btn = new GameCancelJoinBtn() // 取消加入按钮
  public ready_btn = new GameReadyBtn() // 准备按钮
  public cancel_ready_btn = new GameCancelReadyBtn() // 取消准备按钮
  public start_btn = new GameStartBtn() // 开始按钮
  public share_btn = new GameShareBtn() // 分享
  public game_setting_btn = new GameSttingBtn() // 游戏场景中的设置按钮
  public game_help_btn = new GameHelpBtn() // 游戏场景中的帮助按钮
  public game_settle_close_btn = new GameSettleCloseBtn() // 游戏结算界面中的关闭按钮
  public game_settle_again_btn = new GameSettleAgainBtn() // 游戏结算界面中的再来一局按钮
  public game_bg = new GameBg()// 是否隐藏背景图，包括大厅和战斗
  public block_change_seat = new BlockChangeSeat() // 自定义阻止换座位
}

// 结算界面
class GameSettle {
  public hide = false // 是否隐藏结算界面（false: 显示； true: 隐藏，默认为 false）
}

// 界面中的ping值
class GamePing {
  public hide = false // 是否隐藏ping值（false: 显示；true: 隐藏，默认为false）
}

// 界面中的版本信息值
class GameVersion {
  public hide = false // 是否隐藏版本信息（false: 显示； true: 隐藏，默认为false）
}

// 大厅中的段位信息
class GameLevel {
  public hide = false // 是否隐藏段位信息（false: 显示； true: 隐藏，默认为false）
}

// 大厅的设置按钮
class GameLobbySettingBtn {
  public hide = false // 是否隐藏大厅的设置按钮（false: 显示； true: 隐藏，默认为false）
}

// 大厅的帮助按钮
class GameLobbyHelpBtn {
  public hide = false // 是否隐藏大厅的帮助按钮（false: 显示； true: 隐藏，默认为false）
}

// 大厅玩家展示位
class GameLobbyPlayers {
  public custom = false // 大厅玩家展示位头像点击加入（false: 游戏处理逻辑； true: 游戏只通知按钮点击事件，不处理；默认为false）
  public hide = false // 是否隐藏大厅玩家展示位（false: 显示； true: 隐藏，默认为false）
}

// 大厅玩家展示位上队长标识
class GameLobbyPlayerCaptainIcon {
  public hide = false // 是否隐藏大厅玩家展示位上队长标识（false: 显示； true: 隐藏，默认为false）
}

// 大厅玩家展示位上踢人标识
class GameLobbyPlayerKickoutIcon {
  public hide = false // 是否隐藏大厅玩家展示位上踢人标识（false: 显示； true: 隐藏，默认为false）
}

// 大厅的玩法规则描述文字
class GameLobbyRule {
  public hide = false // 是否隐藏大厅的玩法规则描述文字（false: 显示； true: 隐藏，默认为false）
}

// 玩法设置
class GameLobbyGameSetting {
  public hide = false // 是否隐藏玩法设置（false: 显示； true: 隐藏，默认为false）
}

// 加入按钮
class GameJoinBtn {
  public custom = false // 加入按钮（false: 游戏处理逻辑； true: 游戏只通知按钮点击事件，不处理；默认为false）
  public hide = false // 是否隐藏加入按钮（false: 显示； true: 隐藏，默认为false）
}

// 取消加入按钮
class GameCancelJoinBtn {
  public custom = false // 取消加入按钮（false: 游戏处理逻辑； true: 游戏只通知按钮点击事件，不处理；默认为false）
  public hide = false // 是否隐藏取消加入按钮（false: 显示； true: 隐藏，默认为false）
}

// 准备按钮
class GameReadyBtn {
  public custom = false // 准备按钮（false: 游戏处理逻辑； true: 游戏只通知按钮点击事件，不处理；默认为false）
  public hide = false // 是否隐藏准备按钮（false: 显示； true: 隐藏，默认为false）
}

// 取消准备按钮
class GameCancelReadyBtn {
  public custom = false // 取消准备按钮（false: 游戏处理逻辑； true: 游戏只通知按钮点击事件，不处理；默认为false）
  public hide = false // 是否隐藏取消准备按钮（false: 显示； true: 隐藏，默认为false）
}

// 开始游戏按钮
class GameStartBtn {
  public custom = false // 开始游戏按钮（false: 游戏处理逻辑； true: 游戏只通知按钮点击事件，不处理；默认为false）
  public hide = false // 是否隐藏开始游戏按钮（false: 显示； true: 隐藏，默认为false）
}

// 分享按钮
class GameShareBtn {
  public custom = false // 分享按钮（false: 游戏处理逻辑； true: 游戏只通知按钮点击事件，不处理；默认为false）
  public hide = true // 是否隐藏分享按钮（false: 显示； true: 隐藏，默认为true）
}

// 游戏场景中的设置按钮
class GameSttingBtn {
  public hide = false // 是否隐藏游戏场景中的设置按钮（false: 显示； true: 隐藏，默认为false）
}

// 游戏场景中的帮助按钮
class GameHelpBtn {
  public hide = false // 是否隐藏游戏场景中的帮助按钮（false: 显示； true: 隐藏，默认为false）
}

// 游戏结算界面中的关闭按钮
class GameSettleCloseBtn {
  public custom = false // 游戏结算界面中的关闭按钮（false: 关闭结算界面返回大厅； true: 游戏通知按钮点击事件，并关闭结算界面返回大厅；默认为false）
}

// 游戏结算界面中的再来一局按钮
class GameSettleAgainBtn {
  // 游戏结算界面中的再来一局按钮
  // （false: 关闭结算界面返回大厅并将玩家设置为准备状态； true: 游戏通知按钮点击事件，并关闭结算界面返回大厅（不将玩家设置为准备状态）；默认为false）
  public custom = false
}

// 是否隐藏背景图，包括大厅和战斗
// ！！！这里只隐藏加载完成后的背景图，加载中背景图如需隐藏则调用：{SudMGP.getCfg().setShowLoadingGameBg(false); }
class GameBg {
  // （false: 显示； true: 隐藏，默认为false）
  public hide = false
}

// 自定义阻止换座位
class BlockChangeSeat {
  // （false: 可以换座位； true: 不可以换座位；默认为false）
  public custom = false
}

export class GameConfigModel {
  public gameMode = 1 // 游戏模式（每个游戏默认模式是1，不填是1）
  public gameCPU = 0 // 游戏CPU（值为0和1；0：CPU正常功耗，1：CPU低功耗；默认是0，CPU正常功耗）
  public gameSoundControl = 0 // 游戏中声音的播放是否被app层接管（值为0和1；0：游戏播放声音，1：app层播放声音，游戏中不播放任何声音；默认是0）
  public gameSoundVolume = 100 // 游戏中音量的大小（值为0到100；默认是100）
  public ui = new GameUi() // 对游戏ui界面的配置，可定制ui界面的显示与不显示
}
