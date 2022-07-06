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
    defaultStr: string;
    name: string;
    uid: string;
    color: string;
}
export interface IMGCommonPublicMessageMsgText {
    defaultStr: string;
    "zh-CN"?: string;
    "zh-HK"?: string;
    "zh-MO"?: string;
    "zh-SG"?: string;
    "zh-TW"?: string;
    "en-US"?: string;
    "en-GB"?: string;
    "ms-BN"?: string;
    "ms-MY"?: string;
    "vi-VN"?: string;
    "id-ID"?: string;
    "es-ES"?: string;
    "ja-JP"?: string;
    "ko-KR"?: string;
    "th-TH"?: string;
    "ar-SA"?: string;
    "ur-PK"?: string;
    "tr-TR"?: string;
}
interface IMGCommonPublicMessageMsg {
    phrase: number;
    text?: IMGCommonPublicMessageMsgText;
    user?: IMGCommonPublicMessageMsgUser;
}
export interface IMGCommonPublicMessage {
    type: number;
    msg: IMGCommonPublicMessageMsg[];
}
/**
 * MG to APP 的状态定义
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/MGFSM/
 */
/**
 * 2. 关键词状态
 */
export interface IMGCommonKeyWordToHit {
    wordType: string;
    word: string;
    wordList: string[];
    wordLanguage: string;
}
/**
 * 3. 游戏结算状态
 */
/**
 * 游戏结果玩家定义
 */
export interface IPlayerResult {
    uid: string;
    rank: number;
    award: number;
    score: number;
    isEscaped: number;
    killerId: string;
}
export interface IMGCommonGameSettle {
    gameMode: number;
    gameRoundId: string;
    results: IPlayerResult[];
}
/**
 * 4. 加入游戏按钮点击状态 模型
 * 用户（本人）点击加入按钮，或者点击头像加入
 */
export interface IMGCommonSelfClickJoinBtn {
    seatIndex: number;
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
    UNKNOW: -1;
    IDLE: 0;
    LOADING: 1;
    PLAYING: 2;
}
export declare const MGCommonGameStateValue: IMGCommonGameStateValueType;
export declare type IMGCommonGameStateValue = typeof MGCommonGameStateValue[keyof typeof MGCommonGameStateValue];
export interface IMGCommonGameState {
    gameState: IMGCommonGameStateValue;
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
export declare type IMGCommonGameSoundList = IMGCommonGameSoundSource[];
export interface IMGCommonGameSoundSource {
    name: string;
    url: string;
    type: string;
}
/**
 * 14. 游通知app层播放声音（2021-12-30新增，现在只支持碰碰我最强） 模型
 * 游戏通知app层播放背景音乐的开关状态
 */
export interface IMGCommonGameSound {
    isPlay: boolean;
    name: string;
    type: string;
    times: string;
    url: string;
}
/**
 * 15. 游戏通知app层播放背景音乐状态（2022-01-07新增，现在只支持碰碰我最强） 模型
 * 游戏通知app层播放背景音乐的开关状态
 */
export interface IMGCommonGameBgMusicState {
    state: boolean;
}
/**
* 16. 游戏通知app层播放音效的状态（2022-01-07新增，现在只支持碰碰我最强） 模型
* 游戏通知app层播放音效的状态
*/
export interface IMGCommonGameSoundState {
    state: boolean;
}
/**
 * 17. ASR状态(开启和关闭语音识别状态，v1.1.45.xx 版本新增) 模型
 */
export interface IMGCommonGameASR {
    isOpen: boolean;
    wordList: string[];
    wordLanguage: string;
    wordType: string;
    isCloseConnHitted: boolean;
    enableIsHit: boolean;
    enableIsReturnText: boolean;
}
/**
 * 18. 麦克风状态（2022-02-08新增） 模型
 * 游戏通知app麦克风状态
 */
export interface IMGCommonSelfMicrophone {
    isOn: boolean;
}
/**
 * 19. 耳机（听筒，扬声器）状态（2022-02-08新增） 模型
 */
export interface IMGCommonSelfHeadphone {
    isOn: boolean;
}
/**
 * 20. App通用状态操作结果错误码（2022-05-10新增） 模型
 */
export interface IMGCommonAPPCommonSelfXResp {
    state: String;
    resultCode: number;
    isIn: boolean;
    isReady: boolean;
    isPlaying: boolean;
    reportGameInfoExtras: string;
    curCaptainUID: string;
    kickedUID: string;
}
/**
 * 21. 游戏通知app层添加陪玩机器人是否成功（2022-05-17新增） 模型
 */
export interface IMGCommonGameAddAIPlayers {
    resultCode: number;
    userIds: string[];
}
/**
 * 1.加入状态（已修改） 模型
 * 用户是否加入游戏；
 * 游戏开始后，未加入的用户为OB视角。
 */
export interface IMGCommonPlayerIn {
    isIn: boolean;
    teamId: number;
    reason: number;
    kickUID: string;
}
/**
 * 2.准备状态（已修改） 模型
 * 用户是否为队长，队长在游戏中会有开始游戏的权利。
 */
export interface IMGCommonPlayerReady {
    isReady: boolean;
}
/**
 * 3.队长状态（已修改） 模型
 * 用户是否为队长，队长在游戏中会有开始游戏的权利。
 */
export interface IMGCommonPlayerCaptain {
    isCaptain: boolean;
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
    isPlaying: boolean;
    gameRoundId: string;
    reason: number;
    spaceMax: boolean;
}
/**
 * 5.玩家在线状态 模型
 */
export interface IMGCommonPlayerOnline {
    isOnline: boolean;
}
/**
 * 6.玩家换游戏位状态 模型
 */
export interface IMGCommonPlayerChangeSeat {
    preSeatIndex: number;
    currentSeatIndex: number;
}
/**
 * 7. 游戏通知app点击玩家头像（2022-02-09新增，现在只支持飞行棋ludo，仅用于游戏场景中的玩家头像）模型
 */
export interface IMGCommonSelfClickGamePlayerIcon {
    uid: String;
}
/**
 * 8. 游戏通知app玩家死亡状态（2022-04-24新增）模型
 */
export interface IMGCommonSelfDieStatus {
    uid: string;
    isDeath: boolean;
}
/**
 * 9. 游戏通知app轮到玩家出手状态（2022-04-24新增）模型
 */
export interface IMGCommonSelfTurnStatus {
    uid: string;
    isTurn: boolean;
}
/**
 * 10. 游戏通知app玩家选择状态（2022-04-24新增）模型
 */
export interface IMGCommonSelfSelectStatus {
    uid: string;
    isSelected: boolean;
}
/**
 * 11. 游戏通知app层当前游戏剩余时间（2022-05-23新增，目前UMO生效）模型
 */
export interface IMGCommonGameCountdownTime {
    countdown: number;
}
/**
   * 1. 选词中状态（已修改） 模型
   * 选词中，头像正下方
   */
export interface IMGDGSelecting {
    isSelecting: boolean;
}
/**
 * 2. 作画中状态（已修改） 模型
 * 作画中，头像正下方
 */
export interface IMGDGPainting {
    isPainting: boolean;
}
/**
 * 3. 显示错误答案状态（已修改） 模型
 * 错误的答案，最多6中文，头像正下方
 */
export interface IMGDGErroranswer {
    msg: string;
}
/**
 * 4. 显示总积分状态（已修改） 模型
 * 总积分，位于头像右上角
 */
export interface IMGDGTotalscore {
    msg: string;
}
/**
 * 5. 本次获得积分状态（已修改） 模型
 * 本次积分，头像正下方
 */
export interface IMGDGScore {
    msg: string;
}
export {};
