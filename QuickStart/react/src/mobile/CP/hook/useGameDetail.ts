import { SDKGameView } from "../quick"
import { useEffect, useState } from "react"
import { getQueryParam } from 'utils'

export const useGameDetail = (goBack?: (data: any) => void) => {
  const roomId = getQueryParam('roomId') || ''
  const userId = getQueryParam('userId') || ''
  const gameId = getQueryParam('gameId') || ''
  const appId = getQueryParam('appId') || ''
  const appKey = getQueryParam('appKey') || ''
  const gameUrl = getQueryParam('gameUrl') || ''

  const language = getQueryParam('language') || 'zh-CN'
  const [SudSDK, setSudSDK] = useState<SDKGameView>()
  // 页面挂载后进行sdk初始化
  useEffect(() => {
    // 要挂载的元素
    const root = document.getElementById('game')
    const detailUserId = userId || Math.floor((Math.random() + 1) * 10000).toString()
    if (!gameId || !appId || !appKey || !gameUrl) {
      console.error('gameId, appId, appKey, gameUrl有参数缺失', {
        gameId,
        appId,
        appKey,
        gameUrl
      })
      return
    }
    if (root) {
      const nsdk = new SDKGameView({ root, roomId, appId, appKey, gameId, gameUrl, userId: detailUserId, language })

      nsdk.setSudFSMMGListener({
        onGameStarted() {
          const gameConf = localStorage.getItem('gameconfig')
          if (gameConf) {
            const gameConfData = JSON.parse(gameConf)
            console.log('[ gameConfData hd data] >', gameConfData)
            if (gameConfData.ui.hd && gameConfData.ui.hd.show) {
              // 高清适配处理
              const gameView = document.getElementById('game')
              gameView?.classList.add('hd')
            }
          }
        },
        onGameMGCommonGameBackLobby(handle, data) {
          // 返回游戏大厅
          console.log('onGameMGCommonGameBackLobby', data)

          goBack && goBack(data)
        }
      })
      // 自定义loading
      // nsdk.beforeInitSdk = function (SudMGP) {
      //   return new Promise(() => {
      //     SudMGP.getSudCfg().setShowCustomLoading(true)
      //   })
      // }
      // nsdk.sudFSMMGDecorator.onGameLoadingProgress = function (stage: number, retCode: number, progress: number) {
      //   console.log(stage, retCode, progress, '自定义进度')
      // }
      setSudSDK(nsdk)
      nsdk.login(detailUserId)
    }
  }
  , [])
  return {
    SudSDK
  }
}
