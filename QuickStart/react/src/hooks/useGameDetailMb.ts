import { SDKGameView } from "QuickStart"
import { useEffect, useState } from "react"

interface IProps {
  gameId: string,
  roomId: string,
  language: string,
  userId?: string | null,
  goBack?: (data: any) => void
}
const unJoinGameIdList = ['1557194155570024449', '1557194487352053761']

const createAi = () => {
  const id = Math.floor((Math.random() + 1) * 100000).toString()
  const imgId = Math.floor(Math.random() * 10) + 1
  const ai = { userId: id, avatar: `https://dev-sud-static.sudden.ltd/avatar/${imgId}.jpg`, name: `AI${id}`, gender: "male" }
  return ai
}
const createAiList = (count: number) => {
  const list = []
  for (let i = 0; i < count; i++) {
    const curr = createAi()
    list.push(curr)
  }
  return list
}

export const useGameDetail = (props: IProps) => {
  const { gameId, roomId, language, userId, goBack } = props
  const [SudSDK, setSudSDK] = useState<SDKGameView>()
  // 页面挂载后进行sdk初始化
  function pushAIPlayer(nsdk: SDKGameView, data: any) {
    // const id = Math.floor((Math.random() + 1) * 100000).toString()
    // const id2 = Math.floor((Math.random() + 1) * 200000).toString()

    // // @ts-ignore
    // const data = [
    //   { userId: id, avatar: 'https://dev-sud-static.sudden.ltd/avatar/5.jpg', name: `AI${id}`, gender: "male" },
    //   { userId: id2, avatar: 'https://dev-sud-static.sudden.ltd/avatar/6.jpg', name: `AI${id2}`, gender: "male" }
    // ]
    console.log('[ pushAIPlayer data ] >', data)
    nsdk.sudFSTAPPDecorator.notifyAPPCommonGameAddAIPlayers(data, 1)
  }
  useEffect(() => {
    // 要挂载的元素
    const root = document.getElementById('game')
    const detailUserId = userId || Math.floor((Math.random() + 1) * 10000).toString()
    if (root) {
      const nsdk = new SDKGameView({ root, gameRoomId: roomId, gameId, userId: detailUserId, language })

      nsdk.setSudFSMMGListener({
        onGameStarted() {
          console.log('========自定义的game start=====')
        },
        onGameMGCommonGameBackLobby(handle, data) {
          // 返回游戏大厅
          console.log('onGameMGCommonGameBackLobby', data)

          goBack && goBack(data)
        },
        onGameMGCommonSelfClickJoinBtn(handle, res) {
          console.log('[ onGameMGCommonSelfClickJoinBtn ] >', handle, res)
          handle.success(JSON.stringify(res))
          nsdk && nsdk.sudFSTAPPDecorator.notifyAPPCommonSelfIn(true)
          if (unJoinGameIdList.indexOf(gameId) === -1) {
            setTimeout(() => {
              const list = createAiList(6)
              pushAIPlayer(nsdk, list)
            }, 300)
          }
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
