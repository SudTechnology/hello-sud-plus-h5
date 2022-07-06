/**
 * 游戏视图
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG/onGetGameViewInfo.html
 */
interface GameViewSizeModel {
    width: number;
    height: number;
}
interface GameViewRectModel {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export declare class GameViewInfoModel {
    ret_code: number;
    ret_msg: string;
    view_size: GameViewSizeModel;
    view_game_rect: GameViewRectModel;
}
export {};
