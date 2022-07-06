export interface ISudFSMStateHandle {
    success(dataJson: string): void;
    fail(dataJson: string): void;
}
export interface ISudListenerNotifyStateChange {
    onSuccess(dataJson: string): void;
    onFailure(retCode: number, retMsg: string): void;
}
export interface ISudFSTAPP {
    _getFstAppCtxId(): string;
    _onGameCustomCommand(ctxId: number, cmd: string, param: string, state: string, dataJson: string): void;
    _onAppCustomCommandEventCallback(ctxId: number, state: string, dataJson: string): void;
    /**
     * 获取游戏View
     * @return
     */
    getGameView(): any;
    /**
     * 销毁游戏
     * @return
     */
    destroyMG(): boolean;
    /**
     * 更新code
     * @param code
     * @param listener
     */
    updateCode(code: string, listener: ISudListenerNotifyStateChange): void;
    /**
     * 获取游戏状态
     * @param state
     * @return
     */
    notifyStateChange(state: string, dataJson: string, listener: ISudListenerNotifyStateChange): void;
    /**
     * 游戏加载失败，重新加载
     */
    reloadMG(): void;
}
export interface ISudFSMMG {
    /**
     * 游戏日志
     * 最低版本：v1.1.30.xx
     */
    onGameLog(dataJson: string): void;
    /**
     * 游戏加载进度(loadMG)
     * @param stage 阶段：start=1,loading=2,end=3
     * @param retCode 错误码：0成功
     * @param progress 进度：[0, 100]
     * 最低版本：v1.1.52.xx
     */
    onGameLoadingProgress(stage: number, retCode: number, progress: number): void;
    /**
     * 游戏开始（游戏长连接建立完成）
     * 最低版本：v1.1.30.xx
     */
    onGameStarted(): void;
    /**
     * 游戏销毁
     * 最低版本：v1.1.30.xx
     */
    onGameDestroyed(): void;
    /**
     * Code过期
     * APP接入方需要调用handle.success或handle.fail
     * @param dataJson {"code":"value"}
     */
    onExpireCode(handle: ISudFSMStateHandle, dataJson: string): void;
    /**
     * 获取游戏View信息
     * APP接入方需要调用handle.success或handle.fail
     * @param handle
     * @param dataJson {}
     */
    onGetGameViewInfo(handle: ISudFSMStateHandle, dataJson: string): void;
    /**
     * 获取游戏Config
     * APP接入方需要调用handle.success或handle.fail
     * @param handle
     * @param dataJson {}
     * 最低版本：v1.1.30.xx
     */
    onGetGameCfg(handle: ISudFSMStateHandle, dataJson: string): void;
    /**
     * 游戏状态变化
     * APP接入方需要调用handle.success或handle.fail
     * @param handle
     * @param state
     * @param dataJson
     */
    onGameStateChange(handle: ISudFSMStateHandle, state: string, dataJson: string): void;
    /**
     * 游戏玩家状态变化
     * APP接入方需要调用handle.success或handle.fail
     * @param handle
     * @param userId
     * @param state
     * @param dataJson
     */
    onPlayerStateChange(handle: ISudFSMStateHandle, userId: string, state: string, dataJson: string): void;
}
