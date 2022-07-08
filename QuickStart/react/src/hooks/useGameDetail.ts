import { SDKGameView } from "QuickStart"
import { useEffect, useState } from "react"

export const useGameDetail = (gameId: string) => {
  const gameRoomId = `90114` // 房间id
  const [SudSDk, setSudSDk] = useState<SDKGameView>()
  // 页面挂载后进行sdk初始化
  useEffect(() => {
    // 要挂载的元素
    const root = document.getElementById('game')
    const userId = Math.floor((Math.random() + 1) * 10000).toString()
    if (root) {
      const nsdk = new SDKGameView({ root, gameRoomId, gameId, userId })

      nsdk.setSudFSMMGListener({
        onGameStarted() {
          console.log('-========自定义的game start=====')
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
      setSudSDk(nsdk)
      nsdk.login(userId)
    }
  }
  , [])
  return {
    SudSDk
  }
}
