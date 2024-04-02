import { SDKGameView } from '../quick' // SudMGP类型

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
  // 玩家自己退出游戏
  function userSelfQuickGame() {
    nSudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfPlaying(false)
  }
  // 添加AI玩家
  function pushAIPlayer() {
    const id = Math.floor((Math.random() + 1) * 10000).toString()
    const data = [{ userId: id, avatar: 'https://dev-sud-static.sudden.ltd/avatar/6.jpg', name: `AI${id}`, gender: "male" }]
    console.log('[ pushAIPlayer data ] >', data)
    // @ts-ignore
    nSudSDK.sudFSTAPPDecorator.notifyAPPCommonGameAddAIPlayers(data, 1)
  }

  // 关闭背景音乐
  function closeBgMusic() {
    nSudSDK.sudFSTAPPDecorator.notifyAPPCommonOpenBgMusic(false)
  }

  // 关闭音效
  function closeMusic() {
    nSudSDK.sudFSTAPPDecorator.notifyAPPCommonOpenSound(false)
  }
  return {
    joinGame,
    quitGame,
    readyGame,
    cancelReadyGame,
    startGame,
    userSelfQuickGame,
    pushAIPlayer,
    closeBgMusic,
    closeMusic
  }
}
export default useCustomApi
