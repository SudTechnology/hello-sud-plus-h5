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

  public game_setting_select_pnl = new GameSettingSelectPnl() // 大厅中的玩法选择设置面板
  public game_managed_image = new GameManagedImage() // 游戏中的托管图标
  public game_table_image = new GameTableImage() // 游戏中牌桌背景图 （注：只对某些带牌桌类游戏有作用）
  public game_countdown_time = new GameCountdownTime() // 游戏中游戏倒计时显示 （注：现在只针对umo生效）
  public game_selected_tips = new GameSelectedTips() // 游戏中所选择的玩法提示文字 （注：现在只针对ludo生效）
  public nft_avatar = new NFTAvatar() // 控制NFT头像的开关
  public game_opening = new GameOpening() // 控制开场动画的开关
  public game_mvp = new GameMvp() // 游戏结算前的mvp动画
  public umo_icon = new UmoIcon() // 游戏中动画和头像右上角的UMO图标
  public logo = new Logo() // 大厅中的logo

  public game_players = new GamePlayers() // 游戏中的游戏位
  public bullet_screens_btn = new BulletScreensBtn() // 你画我猜，你说我猜『弹幕开关』按钮
  public round_over_poop_btn = new RoundOverPoopBtn() // 你画我猜，小局结算界面点击扔大便按钮
  public round_over_good_btn = new RoundOverGoodBtn() // 你画我猜，小局结算界面点击点赞按钮
  public mask = new Mask() // 游戏中所有蒙版
  public worst_teammate_tip = new WorstTeammateTip() // 友尽闯关中最坑队友的弹框
  public game_over_tip = new GameOverTip() // 友尽闯关中玩家逃跑导致游戏结束弹框
  public lobby_animation = new LobbyAnimation() // 碰碰我最强大厅动画
  public game_effect = new GameEffect() // 消消乐中的特效
  public game_burst_send_btn = new GameBurstSendBtn() // 谁是卧底发送爆词按钮
  public player_pair_singular = new PlayerPairSignular() // okey101 玩家左上角单双牌
  public game_rank_info = new GameRankInfo() // 怪物消消乐玩家左上角排名
  public auxiliary = new Auxiliary() // 是否隐藏游戏中的辅助线（只支持桌球）
  public ob_pnl = new ObPnl() // 是否隐藏OB玩家观看的提示（只支持ludo）
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
// ！！！这里只隐藏加载完成后的背景图，加载中背景图如需隐藏则调用：{SudGIP.getCfg().setShowLoadingGameBg(false); }
class GameBg {
  // （false: 显示； true: 隐藏，默认为false）
  public hide = false
}

// 自定义阻止换座位
class BlockChangeSeat {
  // （false: 可以换座位； true: 不可以换座位；默认为false）
  public custom = false
}

// 大厅中的玩法选择设置面板
class GameSettingSelectPnl {
  // 是否隐藏大厅中的玩法选择设置面板（false: 显示； true: 隐藏，默认为false）
  public hide = false
}

// 游戏中的托管图标
class GameManagedImage {
  // 是否隐藏游戏中的托管图标（false: 显示； true: 隐藏，默认为false）
  public hide = false
}

// 游戏中牌桌背景图 （注：只对某些带牌桌类游戏有作用）
class GameTableImage {
  // 是否隐藏游戏牌桌背景图（false: 显示； true: 隐藏，默认为false）
  public hide = false
}

// 游戏中游戏倒计时显示 （注：现在只针对umo生效）
class GameCountdownTime {
  // 是否隐藏游戏中游戏倒计时显示（false: 显示； true: 隐藏，默认为false）
  public hide = false
}

// 游戏中所选择的玩法提示文字 （注：现在只针对ludo生效）
class GameSelectedTips {
  // 是否隐藏游戏中所选择的玩法提示文字显示（false: 显示； true: 隐藏，默认为false）
  public hide = false
}

// 控制NFT头像的开关
class NFTAvatar {
  // true隐藏 false显示
  public hide = true
}

// 控制开场动画的开关
class GameOpening {
  // true隐藏 false显示
  public hide = true
}

// 游戏结算前的mvp动画
class GameMvp {
  // true隐藏 false显示
  public hide = true
}

// 游戏中动画和头像右上角的UMO图标
class UmoIcon {
  // 是否隐藏游戏中动画和头像右上角的UMO图标并改为UNO（false: 不隐藏，依然显示UMO； true: 隐藏，改为显示UNO，默认为false）
  public hide = false
}

// 大厅中的logo
class Logo {
  // 是否隐藏大厅中的logo（false: 不隐藏； true: 隐藏，默认为false）
  public hide = false
}

class GamePlayers {
  // 是否隐藏游戏中的游戏位（false: 不隐藏； true: 隐藏，默认为false，暂时只支持你画我猜）
  public hide = false
}

// 你画我猜，你说我猜『弹幕开关』按钮
class BulletScreensBtn {
  // 是否隐藏 你画我猜，你说我猜『弹幕开关』按钮（false: 显示； true: 隐藏；默认为true）
  public hide = true
}

// 你画我猜，小局结算界面点击扔大便按钮
class RoundOverPoopBtn {
  public custom = false // 你画我猜，小局结算点击扔大便按钮抛事件（false: 正常点击； true: 游戏通知app按钮点击事件；默认为false）
  public hide = false // 小局结算点击扔大便按钮隐藏（false: 显示； true: 隐藏；默认为false）
}

// 你画我猜，小局结算界面点击点赞按钮
class RoundOverGoodBtn {
  public custom = false // 你画我猜，小局结算点击点赞按钮抛事件（false: 正常点击； true: 游戏通知app按钮点击事件；默认为false）
  public hide = false // 小局结算点击点赞按钮隐藏（false: 显示； true: 隐藏；默认为false）
}

// 游戏中所有蒙版
class Mask {
  // 游戏中的所有蒙版是否透明（false: 不透明，按默认显示； true: 完全透明，默认为false；暂时只支持部分游戏）
  public transparent = false
}

// 友尽闯关中最坑队友的弹框
class WorstTeammateTip {
  // 是否隐藏最坑队友弹框（false: 显示； true: 隐藏，默认为false；）只支持友尽闯关
  public hide = false
}

// 友尽闯关中玩家逃跑导致游戏结束弹框
class GameOverTip {
  // 是否隐藏玩家逃跑导致游戏结束弹框（false: 显示； true: 隐藏，默认为false；）只支持友尽闯关
  public hide = false
}

// 碰碰我最强大厅动画
class LobbyAnimation {
  // 是否隐藏碰碰我最强大厅动画（false: 显示； true: 隐藏，默认为false；）只支持碰碰我最强
  public hide = false
}

// 消消乐中的特效
class GameEffect {
  // 是否隐藏消消乐中的特效（false: 显示； true: 隐藏，默认为false；）只支持monstercrush(消消乐)
  public hide = false
}

// 谁是卧底发送爆词按钮
class GameBurstSendBtn {
  // 是否接管发送爆词按钮事件（false: 正常点击； 游戏通知app按钮点击事件；默认为false）只支持谁是卧底
  public custom = false
}

// okey101 玩家左上角单双牌
class PlayerPairSignular {
  // 是否隐藏玩家左上角单双牌（false: 显示， ture: 隐藏；默认为false）只支持okey101
  public hide = false
}

// 怪物消消乐玩家左上角排名
class GameRankInfo {
  // 是否隐藏玩家左上角排名（false: 显示， ture: 隐藏；默认为false）只支持怪物消消乐
  public hide = false
}

// 是否隐藏游戏中的辅助线（只支持桌球）
class Auxiliary {
  // 是否隐藏游戏中的辅助线（false: 显示， ture: 隐藏；默认为false）只支持桌球
  public hide = false
}

// 是否隐藏OB玩家观看的提示（只支持ludo）
class ObPnl {
  // 是否隐藏OB玩家观看的提示（false: 显示， ture: 隐藏；默认为false）只支持ludo
  public hide = false
}

export class GameConfigModel {
  public gameMode = 1 // 游戏模式（每个游戏默认模式是1，不填是1）
  public gameCPU = 0 // 游戏CPU（值为0和1；0：CPU正常功耗，1：CPU低功耗；默认是0，CPU正常功耗）
  public gameSoundControl = 0 // 游戏中声音的播放是否被app层接管（值为0和1；0：游戏播放声音，1：app层播放声音，游戏中不播放任何声音；默认是0）
  public gameSoundVolume = 100 // 游戏中音量的大小（值为0到100；默认是100）
  public viewScale = 1 // 主动缩放游戏（比如0.8就是缩放到原始大小0.8倍，默认为1.0）
  public autoScale = 0 // 自动根据安全区缩放游戏（默认0为不开启，设置为1就是开启自动适配缩放）
  public ui = new GameUi() // 对游戏ui界面的配置，可定制ui界面的显示与不显示
}
