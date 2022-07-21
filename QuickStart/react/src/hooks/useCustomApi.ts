
const useCustomApi = (SudSDk: any) => {
  // 加入游戏
  function joinGame() {
    SudSDk.sudFSTAPPDecorator.notifyAPPCommonSelfIn(true, -1, true)
  }

  // 退出游戏
  function quitGame() {
    SudSDk.sudFSTAPPDecorator.notifyAPPCommonSelfIn(false)
  }

  // 准备游戏
  function readyGame() {
    SudSDk.sudFSTAPPDecorator.notifyAPPCommonSelfReady(true)
  }
  // 取消准备
  function cancelReadyGame() {
    SudSDk.sudFSTAPPDecorator.notifyAPPCommonSelfReady(false)
  }

  // 开始游戏
  function startGame() {
    SudSDk.sudFSTAPPDecorator.notifyAPPCommonSelfPlaying(true)
  }
  return {
    joinGame,
    quitGame,
    readyGame,
    cancelReadyGame,
    startGame
  }
}
export default useCustomApi
