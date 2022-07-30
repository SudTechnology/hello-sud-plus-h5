
// import java.util.List;

/**
 * APP to MG 的通用状态定义
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/APPFST/
 */

export interface Ludo {
  mode: number; // mode: 默认赛制，0: 快速, 1: 经典;
  chessNum: number; // chessNum: 默认棋子数量, 2: 对应2颗棋子; 4: 对应4颗棋子;
  item: number; // item: 默认道具, 1: 有道具, 0: 没有道具
}

export interface AIPlayers {
  userId: string; // 玩家id
  avatar: string; // 头像url
  name: string; // 名字
  gender: 'male' | 'female'; // 性别 male：男，female：女
}

interface APPCommonSelfIn {
  // rue 加入游戏，false 退出游戏
  isIn: boolean

  // 加入的游戏位(座位号) 默认传seatIndex = -1 随机加入，seatIndex 从0开始，不可大于座位数
  seatIndex?: number

  // 默认为ture, 带有游戏位(座位号)的时候，如果游戏位(座位号)已经被占用，是否随机分配一个空位坐下 isSeatRandom=true 随机分配空位坐下，isSeatRandom=false 不随机分配
  isSeatRandom?: boolean

  // 不支持分队的游戏：数值填1；支持分队的游戏：数值填1或2（两支队伍）；
  teamId?: number
}

interface APPCommonSelfTextHitStateParams {
  // true 命中，false 未命中
  isHit: boolean;

  // 单个关键词， 兼容老版本
  keyWord: string;

  // 返回转写文本
  text: string;

  // text:文本包含匹配; number:数字等于匹配
  wordType : string;

  // 命中关键词，可以包含多个关键词
  keyWordList: Array<String>;

  // 在number模式下才有，返回转写的多个数字
  numberList: Array<number>;
 }

export class SudMGPAPPState {
  /**
   * 1. 加入状态
   * 最低版本: v1.1.30.xx
   */
  public static APP_COMMON_SELF_IN = "app_common_self_in"

  /**
    * 1. 加入状态 模型
    * 用户（本人）加入游戏/退出游戏
    * 正确流程：
    * 1.isIn=true: 加入游戏=>准备游戏=>开始游戏;
    * 2.isIn=false: 结束=>取消准备=>退出游戏;
    */
  public static APPCommonSelfIn = function ({ isIn, seatIndex, isSeatRandom, teamId }: APPCommonSelfIn) {
    const res: APPCommonSelfIn = {
      isIn,
      seatIndex,
      isSeatRandom,
      teamId
    }
    return res
  }

  /**
   * 2. 准备状态
   * 最低版本: v1.1.30.xx
   */
  public static APP_COMMON_SELF_READY = "app_common_self_ready"

  /**
   * 2. 准备状态 模型
   * 用户（本人）准备/取消准备
   */
  public static APPCommonSelfReady = function (isReady: boolean) {
    // true 准备，false 取消准备
    return {
      isReady
    }
  }

  /**
   * 3. 游戏状态
   * 最低版本: v1.1.30.xx
   */
  public static APP_COMMON_SELF_PLAYING = "app_common_self_playing"

  /**
   * 3. 游戏状态 模型
   * 用户游戏状态，如果用户在游戏中，建议：
   * a.空出屏幕中心区：
   * 关闭全屏礼物特效；
   * b.部分强操作类小游戏（spaceMax为true），尽量收缩原生UI，给游戏留出尽量大的操作空间：
   * 收缩公屏；
   * 收缩麦位；
   * 如果不在游戏中，则恢复。
   */
  public static APPCommonSelfPlaying = function (isPlaying: boolean, reportGameInfoExtras?: string) {
    // true 开始游戏，false 结束游戏
    // isPlaying: boolean;
    // string类型，Https服务回调report_game_info参数，最大长度1024字节，超过则截断（2022-01-21）
    // reportGameInfoExtras: string;
    return {
      isPlaying,
      reportGameInfoExtras
    }
  }

  /**
  * 4. 队长状态
  * 最低版本: v1.1.30.xx
  */
  public static APP_COMMON_SELF_CAPTAIN = "app_common_self_captain"

  /**
    * 4. 队长状态 模型
    * 用户是否为队长，队长在游戏中会有开始游戏的权利。
    */
  public static APPCommonSelfCaptain = function (curCaptainUID: string) {
    // 必填，指定队长uid
    // curCaptainUID: string
    return {
      curCaptainUID
    }
  }

  /**
   * 5. 踢人
   * v1.1.30.xx
   */
  public static APP_COMMON_SELF_KICK = "app_common_self_kick"

  /**
     * 5. 踢人 模型
     * 用户（本人，队长）踢其他玩家；
     * 队长才能踢人；
     */
  public static APPCommonSelfKick = function (kickedUID: string) {
    // 被踢用户uid
    // kickedUID: string;
    return {
      kickedUID
    }
  }

  /**
   * 6. 结束游戏
   * v1.1.30.xx
   */
  public static APP_COMMON_SELF_END = "app_common_self_end"

  /**
   * 6. 结束游戏 模型
   * 用户（本人，队长）结束（本局）游戏
   */
  public static APPCommonSelfEnd = function () {
    // 当前不需要传参
    return {}
  }

  /**
   * 7. 房间状态（depreated 已废弃v1.1.30.xx）
   */
  public static APP_COMMON_SELF_ROOM = "app_common_self_room"

  /**
   * 8. 麦位状态（depreated 已废弃v1.1.30.xx）
   */
  public static APP_COMMON_SELF_SEAT = "app_common_self_seat"

  /**
   * 9. 麦克风状态
   */
  public static APP_COMMON_SELF_MICROPHONE = "app_common_self_microphone"

  /**
   * 9. 麦克风状态 模型
   * 用户（本人）麦克风状态，建议：
   * 进入房间后初始通知一次；
   * 每次变更（开麦/闭麦/禁麦/解麦）通知一次；
   */
  public static APPCommonSelfMicrophone = function (isOn: boolean, isDisabled: boolean) {
    // true 开麦，false 闭麦
    // isOn: boolean;

    // true 被禁麦，false 未被禁麦
    // isDisabled: boolean;
    return {
      isOn,
      isDisabled
    }
  }

  /**
     * 10. 文字命中状态
     */
  public static APP_COMMON_SELF_TEXT_HIT = "app_common_self_text_hit"

  /**
   * 10. 文字命中状态 模型
   * 用户（本人）聊天信息命中关键词状态，建议：
   * 精确匹配；
   * 首次聊天内容命中关键词之后，后续聊天内容不翻转成未命中；
   * 直至小游戏侧关键词更新，再将状态翻转为未命中；
   */

  public static APPCommonSelfTextHitState = function (data: APPCommonSelfTextHitStateParams) {
    // // true 命中，false 未命中
    // isHit: boolean;

    // // 单个关键词， 兼容老版本
    // keyWord: string;

    // // 返回转写文本
    // text: string;

    // // text:文本包含匹配; number:数字等于匹配
    // wordType : string;

    // // 命中关键词，可以包含多个关键词
    // keyWordList: Array<String>;

    // // 在number模式下才有，返回转写的多个数字
    // numberList: Array<number>;
    return {
      ...data
    }
  }

  /**
   * 11. 打开或关闭背景音乐（2021-12-27新增）
   */
  public static APP_COMMON_OPEN_BG_MUSIC = "app_common_open_bg_music"

  /**
   * 11. 打开或关闭背景音乐（2021-12-27新增） 模型
   */
  public static APPCommonOpenBgMusic = function (isOpen: boolean) {
    // true 打开背景音乐，false 关闭背景音乐
    // isOpen: boolean;
    return {
      isOpen
    }
  }

  /**
   * 12. 打开或关闭音效（2021-12-27新增）
   */
  public static APP_COMMON_OPEN_SOUND = "app_common_open_sound"

  /**
   * 12. 打开或关闭音效（2021-12-27新增） 模型
   */
  public static APPCommonOpenSound = function (isOpen: boolean) {
    // true 打开音效，false 关闭音效
    // isOpen: boolean;
    return {
      isOpen
    }
  }

  /**
   * 13. 打开或关闭游戏中的振动效果（2021-12-27新增）
   */
  public static APP_COMMON_OPEN_VIBRATE = "app_common_open_vibrate"

  /**
   * 13. 打开或关闭游戏中的振动效果（2021-12-27新增）模型
   */
  public static APPCommonOpenVibrate = function (isOpen: boolean) {
    // true 打开振动效果，false 关闭振动效果
    // isOpen: boolean;
    return {
      isOpen
    }
  }

  /**
   * 14. 设置游戏的音量大小（2021-12-31新增）
   */
  public static APP_COMMON_GAME_SOUND_VOLUME = "app_common_game_sound_volume"

  /**
   * 14. 设置游戏的音量大小（2021-12-31新增）模型
   */
  public static APPCommonGameSoundVolume = function (volume: number) {
    // 音量大小 0 到 100
    // volume: number;
    return {
      volume
    }
  }

  /**
   * 15.  设置游戏玩法选项（2022-05-10新增）
   */
  public static APP_COMMON_GAME_SETTING_SELECT_INFO = "app_common_game_setting_select_info"

  /**
   * 15.  设置游戏玩法选项（2022-05-10新增） 模型
   */
  public static APPCommonGameSettingSelectInfo = function (ludo: Ludo) {
    // 游戏名称
    return {
      ludo
    }
  }

  /**
   * 16. 设置游戏中的AI玩家（2022-05-11新增）
   */
  public static APP_COMMON_GAME_ADD_AI_PLAYERS = "app_common_game_add_ai_players"

  /**
   * 16. 设置游戏中的AI玩家（2022-05-11新增） 模型
   */
  public static APPCommonGameAddAIPlayers = function (aiPlayers: AIPlayers[], isReady: number = 1) {
    // aiPlayers: [], // AI玩家
    // isReady: 1 // 机器人加入后是否自动准备 1：自动准备，0：不自动准备 默认为1
    return {
      aiPlayers,
      isReady
    }
  }
}
