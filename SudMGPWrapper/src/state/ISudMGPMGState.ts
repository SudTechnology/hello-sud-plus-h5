/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */

/**
 * 1. 公屏消息（已修改）
 * 向公屏发送消息，字段含义如下
 * type
 * 0 通知
 * 1 提醒
 * 2 结算
 * 3 其他
 * msg
 * <!-- -->内为转义字段：
 * <!--name:用户昵称|uid:用户UID|color:建议颜色-->
 * 其中name/uid/color均为可选字段，字段为空的情况如下：
 * <!--name:|uid:|color:-->
 * SDK仅会缓存最新一条。
 */

interface IMGCommonPublicMessageMsgUser {
  // 默认内容
  defaultStr: string;
  // 用户名称
  name: string;
  // 用户id
  uid: string;
  // 颜色值
  color: string;
}

export interface IMGCommonPublicMessageMsgText {
  defaultStr: string // 默认文本
  "zh-CN"?: string // 中文(简体)
  "zh-HK"?: string // 中文(香港)

  "zh-MO"?: string // 中文(澳门)
  "zh-SG"?: string //  中文(新加坡)
  "zh-TW"?: string // 中文(繁体

  "en-US"?: string // 英语(美国)
  "en-GB"?: string // 英语(英国)
  "ms-BN"?: string // 马来语(文莱达鲁萨兰)
  "ms-MY"?: string // 马来语(马来西亚)
  "vi-VN"?: string // 越南语
  "id-ID"?: string // 印度尼西亚语
  "es-ES"?: string // 西班牙语(传统)
  "ja-JP"?: string // 日语
  "ko-KR"?: string //  朝鲜语
  "th-TH"?: string // 泰语
  "ar-SA"?: string // 阿拉伯语(沙特阿拉伯)
  "ur-PK"?: string // 乌都语
  "tr-TR"?: string // 土耳其语
}

interface IMGCommonPublicMessageMsg {
  phrase: number,
  text?: IMGCommonPublicMessageMsgText
  user?: IMGCommonPublicMessageMsgUser
}
export interface IMGCommonPublicMessage {
  type: number
  msg: IMGCommonPublicMessageMsg[]
}

// region MG状态机-通用状态-游戏
/**
 * MG to APP 的状态定义
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/MGFSM/
 */

/**
 * 2. 关键词状态
 */
export interface IMGCommonKeyWordToHit {
  // 必填字段；text:文本包含匹配; number:数字等于匹配(必填字段)；默认:text（你画我猜、你说我猜）；数字炸弹填number；
  wordType: string;

  // 单个关键词，兼容老版本
  word: string;

  // 必填字段；关键词列表，可以传送多个关键词
  wordList: string[];

  // 必填字段；关键词语言，默认:zh-CN；
  wordLanguage : string;
}

/**
 * 3. 游戏结算状态
 */

/**
 * 游戏结果玩家定义
 */
export interface IPlayerResult {
   // 用户id
  uid: string;
   // 排名 从 1 开始
  rank: number;
   // 奖励
  award: number;
   // 积分
  score: number;
   // 是否逃跑 1：逃跑 0：非逃跑
  isEscaped: number;
   // 杀自己的玩家的id
  killerId : string;
}

export interface IMGCommonGameSettle {
  gameMode: number
  gameRoundId: string
  results: IPlayerResult[]
}

/**
 * 4. 加入游戏按钮点击状态 模型
 * 用户（本人）点击加入按钮，或者点击头像加入
 */
export interface IMGCommonSelfClickJoinBtn {
  // 点击头像加入游戏对应的座位号，int 类型，从0开始， 如果seatIndex=-1，则是随机加入一个空位，如果seatIndex 大于座位数，则加入不成功
  seatIndex: number
}

/**
 * 5. 取消加入(退出)游戏按钮点击状态 模型
 * 用户（本人）点击取消加入按钮
 */
export interface IMGCommonSelfClickCancelJoinBtn {

}

/**
 * 6. 准备按钮点击状态 模型
 */

export interface IMGCommonSelfClickReadyBtn {
}

/**
 * 7. 取消准备按钮点击状态 模型
 */
export interface IMGCommonSelfClickCancelReadyBtn {
}

/**
* 8. 开始游戏按钮点击状态 模型
*/
export interface IMGCommonSelfClickStartBtn {
}

/**
 * 9. 分享按钮点击状态 模型
 * 用户（本人）点击分享按钮
 */
export interface IMGCommonSelfClickShareBtn {
}

/**
* 10. 游戏状态 模型
* gameState=0 (idle 状态，游戏未开始，空闲状态）；
* gameState=1（loading 状态，所有玩家都准备好，队长点击了开始游戏按钮，等待加载游戏场景开始游戏，游戏即将开始提示阶段）；
* gameState=2（playing状态，游戏进行中状态）
*/

export interface IMGCommonGameStateValueType {
  UNKNOW: -1, // 未知
  IDLE: 0,
  LOADING: 1,
  PLAYING: 2
}

export const MGCommonGameStateValue: IMGCommonGameStateValueType = {
  UNKNOW: -1, // 未知
  IDLE: 0,
  LOADING: 1,
  PLAYING: 2
}

export type IMGCommonGameStateValue = typeof MGCommonGameStateValue[keyof typeof MGCommonGameStateValue]
export interface IMGCommonGameState {
  gameState: IMGCommonGameStateValue

}

/**
 * 11. 结算界面关闭按钮点击状态（2021-12-27新增） 模型
 * 用户（本人）点击结算界面关闭按钮
 */
export interface IMGCommonSelfClickGameSettleCloseBtn {
}

/**
 * 12. 结算界面再来一局按钮点击状态（2021-12-27新增）模型
 * 用户（本人）点击结算界面再来一局按钮
 */
export interface IMGCommonSelfClickGameSettleAgainBtn {
}

/**
 * 13. 游戏上报游戏中的声音列表（2021-12-30新增，现在只支持碰碰我最强） 模型
 * 游戏上报本游戏中所有的声音资源列表
 */
export type IMGCommonGameSoundList = IMGCommonGameSoundSource[]

export interface IMGCommonGameSoundSource {
  // 声音资源的名字
  name: string;
  // 声音资源的URL链接
  url: string;
  // 声音资源类型
  type: string;
}

/**
 * 14. 游通知app层播放声音（2021-12-30新增，现在只支持碰碰我最强） 模型
 * 游戏通知app层播放背景音乐的开关状态
 */

export interface IMGCommonGameSound {
  // 是否播放 isPlay==true(播放)，isPlay==false(停止)
  isPlay: boolean
  // 要播放的声音文件名，不带后缀
  name: string;
  // 声音资源类型
  type: string
  // 播放次数；注：times == 0 为循环播放
  times: string
  // https://www.xxxx.xx/xxx.mp3"  声音资源的url链接
  url: string
}

/**
 * 15. 游戏通知app层播放背景音乐状态（2022-01-07新增，现在只支持碰碰我最强） 模型
 * 游戏通知app层播放背景音乐的开关状态
 */
export interface IMGCommonGameBgMusicState {
  // state 背景音乐的开关状态 true: 开，false: 关
  state: boolean
}

/**
* 16. 游戏通知app层播放音效的状态（2022-01-07新增，现在只支持碰碰我最强） 模型
* 游戏通知app层播放音效的状态
*/
export interface IMGCommonGameSoundState {
  // state 背景音乐的开关状态 true: 开，false: 关
  state: boolean
}

/**
 * 17. ASR状态(开启和关闭语音识别状态，v1.1.45.xx 版本新增) 模型
 */
export interface IMGCommonGameASR {
  // true:打开语音识别 false:关闭语音识别
  isOpen: boolean
  // 必填字段；关键词列表，可以传送多个关键词
  wordList: string[];
  // 必填字段；关键词语言，默认:zh-CN(老版本游戏可能没有)；透传
  wordLanguage: string;
  // 必填字段；text:文本包含匹配; number:数字等于匹配(必填字段)；默认:text(老版本游戏可能没有)；数字炸弹填number；透传
  wordType: string;
  // 必填字段；false: 命中不停止；true:命中停止(必填字段)；默认:true(老版本游戏可能没有) 你演我猜填false；透传
  isCloseConnHitted: boolean
  // 必填字段，是否需要匹配关键字， 默认是true,   如果是false, 则只简单的返回语音识别文本；透传
  enableIsHit: boolean
  // 必填字段，是否需要返回转写文本，默认是true
  enableIsReturnText: boolean
}

/**
 * 18. 麦克风状态（2022-02-08新增） 模型
 * 游戏通知app麦克风状态
 */
export interface IMGCommonSelfMicrophone {
  // 麦克风开关状态 true: 开，false: 关
  isOn: boolean
}

/**
 * 19. 耳机（听筒，扬声器）状态（2022-02-08新增） 模型
 */
export interface IMGCommonSelfHeadphone {
  // 耳机（听筒，喇叭）开关状态 true: 开，false: 关
  isOn: boolean
}

/**
 * 20. App通用状态操作结果错误码（2022-05-10新增） 模型
 */
export interface IMGCommonAPPCommonSelfXResp {
  state: String; // 字段必填, 参考：游戏业务错误 https://docs.sud.tech/zh-CN/app/Client/APPFST/CommonState.html
  resultCode: number; // 字段必填，参考：游戏业务错误 https://docs.sud.tech/zh-CN/app/Server/ErrorCode.html
  isIn: boolean // 当state=app_common_self_in时，字段必填
  isReady: boolean // 当state=app_common_self_ready时，字段必填
  isPlaying: boolean // 当state=app_common_self_playing时，字段必填
  reportGameInfoExtras: string // 当state=app_common_self_playing时，字段必填
  curCaptainUID: string // 当state=app_common_self_captain时，字段必填
  kickedUID: string // 当state=app_common_self_kick时，字段必填
}

/**
 * 21. 游戏通知app层添加陪玩机器人是否成功（2022-05-17新增） 模型
 */
export interface IMGCommonGameAddAIPlayers {
  resultCode: number, // 返回码 0：成功，非0：不成功
  userIds: string[]// 加入成功的playerId列表
}

/**
 * 22. 游戏通知app层添加陪玩机器人是否成功（2022-08-10新增） 模型
 */
export interface IMGCommonGameBackLobby {
  leaveGame: number, // 0, 1: 需要调用退出游戏的方法
}

// endregion 通用状态-游戏

/**
 * 1.加入状态（已修改） 模型
 * 用户是否加入游戏；
 * 游戏开始后，未加入的用户为OB视角。
 */
export interface IMGCommonPlayerIn {
  // true 已加入，false 未加入
  isIn: boolean,

  // 加入哪支队伍
  teamId: number,

  // 当isIn==false时有效；0 主动退出，1 被踢;（reason默认-1，无意义便于处理）
  reason: number,

  // 当reason==1时有效；kickUID为踢人的用户uid；判断被踢的人是本人条件(onPlayerStateChange(userId==kickedUID == selfUID)；（kickUID默认""，无意义便于处理）
  kickUID: string
}

/**
 * 2.准备状态（已修改） 模型
 * 用户是否为队长，队长在游戏中会有开始游戏的权利。
 */
export interface IMGCommonPlayerReady {
  // 当retCode==0时有效；true 已准备，false 未准备
  isReady: boolean
}

/**
 * 3.队长状态（已修改） 模型
 * 用户是否为队长，队长在游戏中会有开始游戏的权利。
 */
export interface IMGCommonPlayerCaptain {
  // true 是队长，false 不是队长；
  isCaptain: boolean
}

/**
 * 4.游戏状态（已修改）模型
 * 用户游戏状态，如果用户在游戏中，建议：
 * a.空出屏幕中心区：
 * 关闭全屏礼物特效；
 * b.部分强操作类小游戏（spaceMax为true），尽量收缩原生UI，给游戏留出尽量大的操作空间：
 * 收缩公屏；
 * 收缩麦位；
 * 如果不在游戏中，则恢复。
 */
export interface IMGCommonPlayerPlaying {
  // true 游戏中，false 未在游戏中；
  isPlaying: boolean,
  // 本轮游戏id，当isPlaying==true时有效
  gameRoundId: string,
  // 当isPlaying==false时有效；isPlaying=false, 0:正常结束 1:提前结束（自己不玩了）2:无真人可以提前结束（无真人，只有机器人） 3:所有人都提前结束；（reason默认-1，无意义便于处理）
  reason: number,
  // true 建议尽量收缩原生UI，给游戏留出尽量大的操作空间 false 初始状态；
  spaceMax: boolean
}

/**
 * 5.玩家在线状态 模型
 */
export interface IMGCommonPlayerOnline {
  // true：在线，false： 离线
  isOnline: boolean
}

/**
 * 6.玩家换游戏位状态 模型
 */
export interface IMGCommonPlayerChangeSeat {
  // 换位前的游戏位(座位号)
  preSeatIndex: number,
  // 换位成功后的游戏位(座位号)
  currentSeatIndex: number
}

/**
 * 7. 游戏通知app点击玩家头像（2022-02-09新增，现在只支持飞行棋ludo，仅用于游戏场景中的玩家头像）模型
 */
export interface IMGCommonSelfClickGamePlayerIcon {
  // 被点击头像的用户id
  uid: String
}

/**
 * 8. 游戏通知app玩家死亡状态（2022-04-24新增）模型
 */
export interface IMGCommonSelfDieStatus {
  uid: string, // 用户id
  isDeath: boolean // 玩家是否死亡 true:死亡, false: 未死亡；默认 false
}

/**
 * 9. 游戏通知app轮到玩家出手状态（2022-04-24新增）模型
 */
export interface IMGCommonSelfTurnStatus {
  uid: string, // 用户id
  isTurn: boolean // 是否轮到玩家出手 true:是上面uid玩家的出手回合, false: 不是上面uid玩家的出手回合；默认false
}

/**
 * 10. 游戏通知app玩家选择状态（2022-04-24新增）模型
 */
export interface IMGCommonSelfSelectStatus {
  uid: string, // 用户id
  isSelected: boolean // 玩家是否选择 true:选择, false: 未选择； 默认false
}

/**
 * 11. 游戏通知app层当前游戏剩余时间（2022-05-23新增，目前UMO生效）模型
 */
export interface IMGCommonGameCountdownTime {
  // 剩余时间，单位为秒
  countdown: number
}

// endregion 通用状态-玩家

/**
   * 1. 选词中状态（已修改） 模型
   * 选词中，头像正下方
   */
export interface IMGDGSelecting {
  // bool 类型 true：正在选词中，false: 不在选词中
  isSelecting: boolean
}

/**
 * 2. 作画中状态（已修改） 模型
 * 作画中，头像正下方
 */
export interface IMGDGPainting {
  // true: 绘画中，false: 取消绘画
  isPainting: boolean
}

/**
 * 3. 显示错误答案状态（已修改） 模型
 * 错误的答案，最多6中文，头像正下方
 */
export interface IMGDGErroranswer {
  // 字符串类型，展示错误答案
  msg: string
}

/**
 * 4. 显示总积分状态（已修改） 模型
 * 总积分，位于头像右上角
 */
export interface IMGDGTotalscore {
  // 字符串类型 总积分
  msg: string
}

/**
 * 5. 本次获得积分状态（已修改） 模型
 * 本次积分，头像正下方
 */
export interface IMGDGScore {
  // string类型，展示本次获得积分
  msg: string
}
