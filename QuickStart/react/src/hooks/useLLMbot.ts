import { SDKGameView } from "QuickStart"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ISudAiAgent, IModelAIPlayers } from "SudMGP/SudMGP/lib/type"

interface IAiModel {
  aiPlayers: IModelAIPlayers[]
  isReady: number

}

interface aiMsgContent {
  uid: string
  content: string
  audioData?: any
}

export const useLLMbot = (gameId: string, roomId: string, language: string, userId?: string | null, goBack?: (data: any) => void) => {
  const [SudSDK, setSudSDK] = useState<SDKGameView>()
  const [aiAgent, setAiAgent] = useState<ISudAiAgent | null>(null)
  const [aiUserContentList, setAiUserContentList] = useState<aiMsgContent[]>([])
  const contentRef = useRef<HTMLDivElement | null>(null)
  const contentInnerRef = useRef<HTMLDivElement | null>(null)
  const [realUserId, setRealUserId] = useState(userId)

  // 页面挂载后进行sdk初始化
  useEffect(() => {
    // 要挂载的元素
    const root = document.getElementById('game')
    const detailUserId = userId || Math.floor((Math.random() + 1) * 10000).toString()
    setRealUserId(detailUserId)
    if (root) {
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
          // 在onGameStarted触发之后去拿，可以保证返回对象不为空
          const ai = nsdk.iSudFSTAPP?.getAiAgent()
          console.log('[ ai ] >', ai)
          if (ai) {
            setAiAgent(ai!)
            ai.setISudListenerAiAgent({
              // 接收大模型AI玩家的消息
              onRoomChatMessage(data) {
                console.log('[ onRoomChatMessage data ] >', data)

                if (data) {
                  const parseData = JSON.parse(data)
                  console.log('[ parseData ] >', parseData)

                  const audio = new Audio(`data:audio/wav;base64,${parseData.audioData}`)
                  audio.play().catch(e => console.error("播放失败:", e))
                  const list = aiUserContentList
                  list.push(parseData)
                  setAiUserContentList([...list])
                }
              }
            })
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
  }, [])

  // 滚动到底部
  const scrollToBottom = () => {
    if (contentRef.current) {
      const height = contentInnerRef.current!.clientHeight || 0
      console.log('[ height ] >', height)
      contentRef.current.scrollTop = height
    }
  }

  useLayoutEffect(() => {
    scrollToBottom()
  }, [aiUserContentList])

  const addAiBot = () => {
    let aiuId = Math.floor((Math.random() + 1) * 10000).toString()
    if (aiuId === realUserId) {
      aiuId = `988${aiuId}`
    }
    const aiPlayers: IAiModel = {
      aiPlayers: [
        {
          userId: aiuId, // 玩家id
          avatar: 'https://dev-sud-static.sudden.ltd/avatar/6.jpg', // 头像url
          name: `ai-${aiuId}`, // 名字
          gender: 'male', // 性别 male：男，female：女
          aiId: Math.floor(Math.random() * 275) + 1 // 随机一个ai性格 目前支持1~370
        }
      ],
      isReady: 1 // 机器人加入后是否自动准备 1：自动准备，0：不自动准备 默认为1
    }
    SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommon('app_common_game_add_big_scale_model_ai_players', JSON.stringify(aiPlayers))
  }

  const sendText = (text: string) => {
    if (aiAgent && text) {
      aiAgent.sendText(text)
      if (realUserId) {
        const list = aiUserContentList
        list.push({ uid: realUserId, content: text })
        setAiUserContentList([...list])
      }
    }
  }
  return {
    contentInnerRef,
    contentRef,
    aiUserContentList,
    SudSDK,
    sendText,
    addAiBot
  }
}
