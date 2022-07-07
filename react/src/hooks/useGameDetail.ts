import { SDKGameView } from "QuickStart"
import { useEffect, useState } from "react"

export const useGameDetail = (gameId: string) => {
  const gameRoomId = `90114`
  const [SudSDk, setSudSDk] = useState<SDKGameView>()
  // 页面挂载后进行sdk初始化
  useEffect(() => {
    const root = document.getElementById('game')
    const userId = Math.floor((Math.random() + 1) * 10000).toString()
    if (root) {
      const nsdk = new SDKGameView({ root, gameRoomId, gameId, userId })
      setSudSDk(nsdk)
      nsdk.login(userId)
      console.log(SudSDk)
    }
  }
  , [])
  return {
    SudSDk
  }
}
