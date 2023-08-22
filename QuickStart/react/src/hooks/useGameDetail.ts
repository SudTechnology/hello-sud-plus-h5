import { SDKGameView } from "QuickStart"
import { useEffect, useState } from "react"

export function loadGame(gameId: string, roomId: string, language: string, userId?: string | null, goBack?: (data: any) => void) {
  const root = document.getElementById('game')
  if (root) {
    const detailUserId = userId || Math.floor((Math.random() + 1) * 10000).toString()

    const nsdk = new SDKGameView({ root, gameRoomId: roomId, gameId, userId: detailUserId, language })
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
    const demoCfg = localStorage.getItem('demoCfg')
    if (demoCfg) {
      const demoCfgParse = JSON.parse(demoCfg)
      if (demoCfgParse.customLoading) {
        nsdk.beforeInitSdk = function (SudMGP) {
          return new Promise(() => {
            SudMGP.getSudCfg().setShowCustomLoading(true)
          })
        }
        nsdk.sudFSMMGDecorator.onGameLoadingProgress = function (stage: number, retCode: number, progress: number) {
          console.log(stage, retCode, progress, '自定义进度')
        }
      }
    }

    nsdk.login(detailUserId!)
    return nsdk
  }
}

export const useGameDetail = (gameId: string, roomId: string, language: string, userId?: string | null, goBack?: (data: any) => void) => {
  const [SudSDK, setSudSDK] = useState<SDKGameView>()
  // 页面挂载后进行sdk初始化
  useEffect(() => {
    // 要挂载的元素
    const sdk = loadGame(gameId, roomId, language, userId, goBack)
    setSudSDK(sdk)
  }
  , [])
  return {
    SudSDK
  }
}
