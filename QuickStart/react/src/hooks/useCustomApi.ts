import { SDKGameView } from '../QuickStart' // SudMGP类型

const useCustomApi = (SudSDK: SDKGameView | undefined) => {
  if (!SudSDK) {
    return {}
  }
  const nSudSDK: SDKGameView = SudSDK
  // 加入游戏
  function joinGame() {
    nSudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfIn(true, -1, true)
  }

  // 退出游戏
  function quitGame() {
    nSudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfIn(false)
  }

  // 准备游戏
  function readyGame() {
    nSudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfReady(true)
  }
  // 取消准备
  function cancelReadyGame() {
    nSudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfReady(false)
  }

  // 开始游戏
  function startGame() {
    nSudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfPlaying(true)
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
