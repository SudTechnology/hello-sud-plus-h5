import { IMGCommonGameState, IMGCommonKeyWordToHit, IMGCommonPlayerCaptain, IMGCommonPlayerIn, IMGCommonPlayerPlaying, IMGCommonPlayerReady } from "../state/ISudMGPMGState";
/**
 * 游戏回调数据缓存
 */
export declare class SudFSMMGCache {
    private captainUserId;
    private mgCommonGameStateModel;
    private _isHitBomb;
    private playerInSet;
    private playerReadySet;
    private playerPlayingMap;
    onPlayerMGCommonPlayerCaptain(userId: string, model: IMGCommonPlayerCaptain): void;
    onGameMGCommonGameState(model: IMGCommonGameState): void;
    onPlayerMGCommonPlayerIn(userId: string, model: IMGCommonPlayerIn): void;
    onPlayerMGCommonPlayerReady(userId: string, model: IMGCommonPlayerReady): void;
    onPlayerMGCommonPlayerPlaying(userId: string, model: IMGCommonPlayerPlaying): void;
    onGameMGCommonKeyWordToHit(model: IMGCommonKeyWordToHit): void;
    isCaptain(userId: string): boolean;
    playerIsPlaying(userId: string): boolean;
    playerIsReady(userId: string): boolean;
    playerIsIn(userId: string): boolean;
    getPlayerInNumber(): number;
    isHitBomb(): boolean;
    destroyMG(): void;
    /**
       * 返回当前游戏的状态，数值参数{@link SudMGPMGState.MGCommonGameState}
       */
    getGameState(): number;
}
