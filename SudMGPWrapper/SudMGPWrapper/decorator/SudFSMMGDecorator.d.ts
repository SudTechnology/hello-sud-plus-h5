import { ISudFSMMG, ISudFSMStateHandle } from '../type/core';
import { SudFSMMGListener } from './SudFSMMGListener';
export declare class SudFSMMGDecorator implements ISudFSMMG {
    private sudFSMMGListener;
    private sudFSMMGCache;
    /**
     * 设置回调
     *
     * @param listener 监听器
     */
    setSudFSMMGListener(listener: SudFSMMGListener): void;
    /**
     * 游戏日志
     * 最低版本：v1.1.30.xx
     */
    onGameLog(dataJson: string): void;
    /**
     * 游戏加载进度
     *
     * @param stage    阶段：start=1,loading=2,end=3
     * @param retCode  错误码：0成功
     * @param progress 进度：[0, 100]
     */
    onGameLoadingProgress(stage: number, retCode: number, progress: number): void;
    /**
     * 游戏开始
     * 最低版本：v1.1.30.xx
     */
    onGameStarted(): void;
    /**
     * 游戏销毁
     * 最低版本：v1.1.30.xx
     */
    onGameDestroyed(): void;
    /**
     * Code过期，需要实现
     * APP接入方需要调用handle.success或handle.fail
     *
     * @param dataJson {"code":"value"}
     */
    onExpireCode(handle: ISudFSMStateHandle, dataJson: string): void;
    /**
     * 获取游戏View信息，需要实现
     * APP接入方需要调用handle.success或handle.fail
     *
     * @param handle   操作
     * @param dataJson {}
     */
    onGetGameViewInfo(handle: ISudFSMStateHandle, dataJson: string): void;
    /**
     * 获取游戏Config，需要实现
     * APP接入方需要调用handle.success或handle.fail
     *
     * @param handle   操作
     * @param dataJson {}
     *                 最低版本：v1.1.30.xx
     */
    onGetGameCfg(handle: ISudFSMStateHandle, dataJson: string): void;
    /**
     * 游戏状态变化
     * APP接入方需要调用handle.success或handle.fail
     *
     * @param handle   操作
     * @param state    状态命令
     * @param dataJson 状态值
     */
    onGameStateChange(handle: ISudFSMStateHandle, state: string, dataJson: string): void;
    /**
     * 游戏玩家状态变化
     * APP接入方需要调用handle.success或handle.fail
     *
     * @param handle   操作
     * @param userId   用户id
     * @param state    状态命令
     * @param dataJson 状态值
     */
    onPlayerStateChange(handle: ISudFSMStateHandle, userId: string, state: string, dataJson: string): void;
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
