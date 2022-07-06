/**
 * APP to MG 的通用状态定义
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/APPFST/
 */
export interface Ludo {
    mode: number;
    chessNum: number;
    item: number;
}
export interface AIPlayers {
    userId: string;
    avatar: string;
    name: string;
    gender: 'male' | 'female';
}
interface APPCommonSelfIn {
    isIn: boolean;
    seatIndex: number;
    isSeatRandom: boolean;
    teamId: number;
}
interface APPCommonSelfTextHitStateParams {
    isHit: boolean;
    keyWord: string;
    text: string;
    wordType: string;
    keyWordList: Array<String>;
    numberList: Array<number>;
}
export declare class SudMGPAPPState {
    /**
     * 1. 加入状态
     * 最低版本: v1.1.30.xx
     */
    static APP_COMMON_SELF_IN: string;
    /**
      * 1. 加入状态 模型
      * 用户（本人）加入游戏/退出游戏
      * 正确流程：
      * 1.isIn=true: 加入游戏=>准备游戏=>开始游戏;
      * 2.isIn=false: 结束=>取消准备=>退出游戏;
      */
    static APPCommonSelfIn: ({ isIn, seatIndex, isSeatRandom, teamId }: APPCommonSelfIn) => APPCommonSelfIn;
    /**
     * 2. 准备状态
     * 最低版本: v1.1.30.xx
     */
    static APP_COMMON_SELF_READY: string;
    /**
     * 2. 准备状态 模型
     * 用户（本人）准备/取消准备
     */
    static APPCommonSelfReady: (isReady: boolean) => {
        isReady: boolean;
    };
    /**
     * 3. 游戏状态
     * 最低版本: v1.1.30.xx
     */
    static APP_COMMON_SELF_PLAYING: string;
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
    static APPCommonSelfPlaying: (isPlaying: boolean, reportGameInfoExtras: string) => {
        isPlaying: boolean;
        reportGameInfoExtras: string;
    };
    /**
    * 4. 队长状态
    * 最低版本: v1.1.30.xx
    */
    static APP_COMMON_SELF_CAPTAIN: string;
    /**
      * 4. 队长状态 模型
      * 用户是否为队长，队长在游戏中会有开始游戏的权利。
      */
    static APPCommonSelfCaptain: (curCaptainUID: string) => {
        curCaptainUID: string;
    };
    /**
     * 5. 踢人
     * v1.1.30.xx
     */
    static APP_COMMON_SELF_KICK: string;
    /**
       * 5. 踢人 模型
       * 用户（本人，队长）踢其他玩家；
       * 队长才能踢人；
       */
    static APPCommonSelfKick: (kickedUID: string) => {
        kickedUID: string;
    };
    /**
     * 6. 结束游戏
     * v1.1.30.xx
     */
    static APP_COMMON_SELF_END: string;
    /**
     * 6. 结束游戏 模型
     * 用户（本人，队长）结束（本局）游戏
     */
    static APPCommonSelfEnd: () => {};
    /**
     * 7. 房间状态（depreated 已废弃v1.1.30.xx）
     */
    static APP_COMMON_SELF_ROOM: string;
    /**
     * 8. 麦位状态（depreated 已废弃v1.1.30.xx）
     */
    static APP_COMMON_SELF_SEAT: string;
    /**
     * 9. 麦克风状态
     */
    static APP_COMMON_SELF_MICROPHONE: string;
    /**
     * 9. 麦克风状态 模型
     * 用户（本人）麦克风状态，建议：
     * 进入房间后初始通知一次；
     * 每次变更（开麦/闭麦/禁麦/解麦）通知一次；
     */
    static APPCommonSelfMicrophone: (isOn: boolean, isDisabled: boolean) => {
        isOn: boolean;
        isDisabled: boolean;
    };
    /**
       * 10. 文字命中状态
       */
    static APP_COMMON_SELF_TEXT_HIT: string;
    /**
     * 10. 文字命中状态 模型
     * 用户（本人）聊天信息命中关键词状态，建议：
     * 精确匹配；
     * 首次聊天内容命中关键词之后，后续聊天内容不翻转成未命中；
     * 直至小游戏侧关键词更新，再将状态翻转为未命中；
     */
    static APPCommonSelfTextHitState: (data: APPCommonSelfTextHitStateParams) => {
        isHit: boolean;
        keyWord: string;
        text: string;
        wordType: string;
        keyWordList: String[];
        numberList: number[];
    };
    /**
     * 11. 打开或关闭背景音乐（2021-12-27新增）
     */
    static APP_COMMON_OPEN_BG_MUSIC: string;
    /**
     * 11. 打开或关闭背景音乐（2021-12-27新增） 模型
     */
    static APPCommonOpenBgMusic: (isOpen: boolean) => {
        isOpen: boolean;
    };
    /**
     * 12. 打开或关闭音效（2021-12-27新增）
     */
    static APP_COMMON_OPEN_SOUND: string;
    /**
     * 12. 打开或关闭音效（2021-12-27新增） 模型
     */
    static APPCommonOpenSound: (isOpen: boolean) => {
        isOpen: boolean;
    };
    /**
     * 13. 打开或关闭游戏中的振动效果（2021-12-27新增）
     */
    static APP_COMMON_OPEN_VIBRATE: string;
    /**
     * 13. 打开或关闭游戏中的振动效果（2021-12-27新增）模型
     */
    static APPCommonOpenVibrate: (isOpen: boolean) => {
        isOpen: boolean;
    };
    /**
     * 14. 设置游戏的音量大小（2021-12-31新增）
     */
    static APP_COMMON_GAME_SOUND_VOLUME: string;
    /**
     * 14. 设置游戏的音量大小（2021-12-31新增）模型
     */
    static APPCommonGameSoundVolume: (volume: number) => {
        volume: number;
    };
    /**
     * 15.  设置游戏玩法选项（2022-05-10新增）
     */
    static APP_COMMON_GAME_SETTING_SELECT_INFO: string;
    /**
     * 15.  设置游戏玩法选项（2022-05-10新增） 模型
     */
    static APPCommonGameSettingSelectInfo: (ludo: Ludo) => {
        ludo: Ludo;
    };
    /**
     * 16. 设置游戏中的AI玩家（2022-05-11新增）
     */
    static APP_COMMON_GAME_ADD_AI_PLAYERS: string;
    /**
     * 16. 设置游戏中的AI玩家（2022-05-11新增） 模型
     */
    static APPCommonGameAddAIPlayers: (aiPlayers: AIPlayers[], isReady?: number) => {
        aiPlayers: AIPlayers[];
        isReady: number;
    };
}
export {};
