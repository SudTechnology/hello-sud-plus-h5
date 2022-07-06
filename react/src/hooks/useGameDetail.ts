import { SDKGameView } from "QuickStart"
import { useEffect } from "react"

export const useGameDetail = (gameId: string) => {
  const gameRoomId = `90114`
  // 页面挂载后进行sdk初始化
  useEffect(() => {
    const root = document.getElementById('game')
    const userId = Math.floor((Math.random() + 1) * 10000).toString()
    if (root) {
      const sdk = new SDKGameView({ root, gameRoomId, gameId, userId })
      sdk.login(userId)
      console.log(sdk)
    }
  }
  , [])
}
