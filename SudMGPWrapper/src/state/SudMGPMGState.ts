/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */

export class SudMGPMGState {
  // region MG状态机-通用状态-游戏
  // 参考文档：https://docs.sud.tech/zh-CN/app/Client/MGFSM/CommonStateGame.html
  /**
   * 1. 公屏消息（已修改）
   * 最低版本: v1.1.30.xx
   */
  public static MG_COMMON_PUBLIC_MESSAGE = "mg_common_public_message"

  /**
   * 2. 关键词状态
   */
  public static MG_COMMON_KEY_WORD_TO_HIT = "mg_common_key_word_to_hit"

  /**
   * 3. 游戏结算状态
   */
  public static MG_COMMON_GAME_SETTLE = "mg_common_game_settle"

  /**
   * 4. 加入游戏按钮点击状态
   */
  public static MG_COMMON_SELF_CLICK_JOIN_BTN = "mg_common_self_click_join_btn"

  /**
   * 5. 取消加入(退出)游戏按钮点击状态
   */
  public static MG_COMMON_SELF_CLICK_CANCEL_JOIN_BTN = "mg_common_self_click_cancel_join_btn"

  /**
   * 6. 准备按钮点击状态
   */
  public static MG_COMMON_SELF_CLICK_READY_BTN = "mg_common_self_click_ready_btn"

  /**
   * 7. 取消准备按钮点击状态
   */
  public static MG_COMMON_SELF_CLICK_CANCEL_READY_BTN = "mg_common_self_click_cancel_ready_btn"

  /**
   * 8. 开始游戏按钮点击状态
   */
  public static MG_COMMON_SELF_CLICK_START_BTN = "mg_common_self_click_start_btn"

  /**
   * 9. 分享按钮点击状态
   */
  public static MG_COMMON_SELF_CLICK_SHARE_BTN = "mg_common_self_click_share_btn"

  /**
   * 10. 游戏状态
   */
  public static MG_COMMON_GAME_STATE = "mg_common_game_state"

  /**
   * 11. 结算界面关闭按钮点击状态（2021-12-27新增）
   */
  public static MG_COMMON_SELF_CLICK_GAME_SETTLE_CLOSE_BTN = "mg_common_self_click_game_settle_close_btn"

  /**
   * 12. 结算界面再来一局按钮点击状态（2021-12-27新增）
   */
  public static MG_COMMON_SELF_CLICK_GAME_SETTLE_AGAIN_BTN = "mg_common_self_click_game_settle_again_btn"

  /**
   * 13. 游戏上报游戏中的声音列表（2021-12-30新增，现在只支持碰碰我最强）
   */
  public static MG_COMMON_GAME_SOUND_LIST = "mg_common_game_sound_list"

  /**
   * 14. 游通知app层播放声音（2021-12-30新增，现在只支持碰碰我最强）
   */
  public static MG_COMMON_GAME_SOUND = "mg_common_game_sound"

  /**
   * 15. 游戏通知app层播放背景音乐状态（2022-01-07新增，现在只支持碰碰我最强）
   */
  public static MG_COMMON_GAME_BG_MUSIC_STATE = "mg_common_game_bg_music_state"

  /**
   * 16. 游戏通知app层播放音效的状态（2022-01-07新增，现在只支持碰碰我最强）
   */
  public static MG_COMMON_GAME_SOUND_STATE = "mg_common_game_sound_state"

  /**
   * 17. ASR状态(开启和关闭语音识别状态，v1.1.45.xx 版本新增)
   */
  public static MG_COMMON_GAME_ASR = "mg_common_game_asr"

  /**
   * 18. 麦克风状态（2022-02-08新增）
   */
  public static MG_COMMON_SELF_MICROPHONE = "mg_common_self_microphone"

  /**
   * 19. 耳机（听筒，扬声器）状态（2022-02-08新增）
   */
  public static MG_COMMON_SELF_HEADPHONE = "mg_common_self_headphone"

  /**
   * 20. App通用状态操作结果错误码（2022-05-10新增）
   */
  public static MG_COMMON_APP_COMMON_SELF_X_RESP = "mg_common_app_common_self_x_resp"

  /**
   * 21. 游戏通知app层添加陪玩机器人是否成功（2022-05-17新增）
   */
  public static MG_COMMON_GAME_ADD_AI_PLAYERS = "mg_common_game_add_ai_players"

  /**
   * 22. 游戏通知app层回到大厅（2022-08-10新增）
   */
  public static MG_COMMON_BACK_LOBBY = "mg_common_back_lobby"

  // endregion 通用状态-游戏

  // region MG状态机-通用状态-玩家
  // 参考：https://docs.sud.tech/zh-CN/app/Client/MGFSM/CommonStatePlayer.html

  /**
   * 1.加入状态（已修改）
   * 最低版本: v1.1.30.xx
   */
  public static MG_COMMON_PLAYER_IN = "mg_common_player_in"

  /**
   * 2.准备状态（已修改）
   * 最低版本: v1.1.30.xx
   */
  public static MG_COMMON_PLAYER_READY = "mg_common_player_ready"

  /**
   * 3.队长状态（已修改）
   * 最低版本: v1.1.30.xx
   */
  public static MG_COMMON_PLAYER_CAPTAIN = "mg_common_player_captain"

  /**
   * 4.游戏状态（已修改）
   * 最低版本: v1.1.30.xx
   */
  public static MG_COMMON_PLAYER_PLAYING = "mg_common_player_playing"

  /**
   * 5.玩家在线状态
   */
  public static MG_COMMON_PLAYER_ONLINE = "mg_common_player_online"

  /**
   * 6.玩家换游戏位状态
   */
  public static MG_COMMON_PLAYER_CHANGE_SEAT = "mg_common_player_change_seat"

  /**
   * 7. 游戏通知app点击玩家头像（2022-02-09新增，现在只支持飞行棋ludo，仅用于游戏场景中的玩家头像）
   */
  public static MG_COMMON_SELF_CLICK_GAME_PLAYER_ICON = "mg_common_self_click_game_player_icon"

  /**
   * 8. 游戏通知app玩家死亡状态（2022-04-24新增）
   */
  public static MG_COMMON_SELF_DIE_STATUS = "mg_common_self_die_status"

  /**
   * 9. 游戏通知app轮到玩家出手状态（2022-04-24新增）
   */
  public static MG_COMMON_SELF_TURN_STATUS = "mg_common_self_turn_status"

  /**
   * 10. 游戏通知app玩家选择状态（2022-04-24新增）
   */
  public static MG_COMMON_SELF_SELECT_STATUS = "mg_common_self_select_status"

  /**
   * 11. 游戏通知app层当前游戏剩余时间（2022-05-23新增，目前UMO生效）
   */
  public static MG_COMMON_GAME_COUNTDOWN_TIME = "mg_common_game_countdown_time"

  // endregion 通用状态-玩家

  // region 碰碰我最强
  // endregion 碰碰我最强

  // region 飞刀达人
  // endregion 飞刀达人

  // region 你画我猜
  // 参考文档：https://docs.sud.tech/zh-CN/app/Client/MGFSM/DrawGuess.html

  /**
   * 1. 选词中状态（已修改）
   */
  public static MG_DG_SELECTING = "mg_dg_selecting"

  /**
   * 2. 作画中状态（已修改）
   */
  public static MG_DG_PAINTING = "mg_dg_painting"

  /**
   * 3. 显示错误答案状态（已修改）
   */
  public static MG_DG_ERRORANSWER = "mg_dg_erroranswer"

  /**
   * 4. 显示总积分状态（已修改）
   */
  public static MG_DG_TOTALSCORE = "mg_dg_totalscore"

  /**
   * 5. 本次获得积分状态（已修改）
   */
  public static MG_DG_SCORE = "mg_dg_score"

  // endregion 你画我猜
}
