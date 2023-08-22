// import { useState } from 'react'
import { SDKGameView } from '../QuickStart' // SudMGP类型

const customApi = (SudSDK: SDKGameView | undefined) => {
  // 加入游戏
  function joinGame() {
    console.log('[ SudSDK ] >', SudSDK)
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfIn(true, -1, true)
  }

  // 退出游戏
  function quitGame() {
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfIn(false)
  }

  // 准备游戏
  function readyGame() {
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfReady(true)
  }
  // 取消准备
  function cancelReadyGame() {
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfReady(false)
  }

  // 开始游戏
  function startGame() {
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfPlaying(true)
  }
  // 玩家自己退出游戏
  function userSelfQuickGame() {
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommonSelfPlaying(false)
  }
  // 添加AI玩家
  function pushAIPlayer() {
    const id = Math.floor((Math.random() + 1) * 10000).toString()
    const data = [{ userId: id, avatar: 'https://dev-sud-static.sudden.ltd/avatar/6.jpg', name: `AI${id}`, gender: "male" }]
    console.log('[ pushAIPlayer data ] >', data)
    // @ts-ignore
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommonGameAddAIPlayers(data, 1)
  }

  // 关闭背景音乐
  function closeBgMusic() {
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommonOpenBgMusic(false)
  }

  // 关闭音效
  function closeMusic() {
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommonOpenSound(false)
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
export default customApi
