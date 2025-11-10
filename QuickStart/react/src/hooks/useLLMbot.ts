import { SDKGameView } from "QuickStart"
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react"
import { ISudAiAgent, IModelAIPlayers } from "sudmgp-sdk-js-test/type"
import { AudioPlayer } from './audioPlayer'
import { generateName } from 'utils/randomName'

function base64ToBlobUrl(base64: string) {
  // 分割 MIME 和 Base64 数据
  const [header, data] = base64.split(';base64,')
  const mime = header.replace('data:', '')
  // 解码 Base64
  const bytes = Uint8Array.from(atob(data), c => c.charCodeAt(0))
  // 生成 Blob URL
  const blob = new Blob([bytes], { type: mime })
  return URL.createObjectURL(blob)
}
interface IAiModel {
  aiPlayers: IModelAIPlayers[]
  isReady: number

}

interface aiMsgContent {
  uid: string
  content: string
  audioData?: any
}

const useMapState = <K, V extends object>(initialMap: Iterable<[K, V]> | (() => Map<K, V>) = new Map()) => {
  const [map, setMap] = useState<Map<K, V>>(() => {
    if (typeof initialMap === 'function') {
      return initialMap()
    }
    return new Map(initialMap)
  })

  // 添加或更新键值对（自动合并旧值）
  const set = useCallback((
    key: K,
    value: V | Partial<V> | ((prev: V | undefined) => V)
  ) => {
    setMap(prev => {
      const newMap = new Map(prev)
      const current = newMap.get(key)

      if (typeof value === 'function') {
        // 函数式更新：set(key, prev => newValue)
        newMap.set(key, (value as (prev: V | undefined) => V)(current))
      } else if (current && typeof value === 'object' && !Array.isArray(value)) {
        // 对象合并：{ ...old, ...new }
        newMap.set(key, { ...current, ...value } as V)
      } else {
        // 直接设置
        newMap.set(key, value as V)
      }
      return newMap
    })
  }, [])

  // 删除键
  const remove = useCallback((key: K) => {
    setMap(prevMap => {
      const newMap = new Map(prevMap)
      newMap.delete(key)
      return newMap
    })
  }, [])

  // 重置为初始状态或清空
  const reset = useCallback((newMap?: Iterable<[K, V]> | Map<K, V>) => {
    setMap(new Map(newMap))
  }, [initialMap])

  // 获取当前 Map 状态
  const get = useCallback((key: K) => map.get(key), [map])

  // 检查键是否存在
  const has = useCallback((key: K) => map.has(key), [map])

  // 获取 Map 大小
  const size = map.size

  return {
    map,
    set,
    remove,
    reset,
    get,
    has,
    size
  }
}

export const useLLMbot = (gameId: string, roomId: string, language: string, userId?: string | null, goBack?: (data: any) => void) => {
  const [SudSDK, setSudSDK] = useState<SDKGameView>()
  const [aiAgent, setAiAgent] = useState<ISudAiAgent | null>(null)
  const [aiUserContentList, setAiUserContentList] = useState<aiMsgContent[]>([])
  const contentRef = useRef<HTMLDivElement | null>(null)
  const contentInnerRef = useRef<HTMLDivElement | null>(null)
  const [realUserId, setRealUserId] = useState(userId)
  const [isGamePlayerMicStateOk, setIsGamePlayerMicStateOk] = useState(false)
  const { map: userAudioPlayStateMap, set: setUserAudioPlayState } = useMapState<string, {state: number, uid: string}>()
  const { map: userMap, set: setUserMapState } = useMapState<string, IModelAIPlayers>()

  // 页面挂载后进行sdk初始化
  useEffect(() => {
    const player = new AudioPlayer()
    player.setEndListener((data) => {
      if (data) {
        const parseData = data.data
        setUserAudioPlayState(parseData.uid, { state: 0, uid: parseData.uid })
      }
    })
    // 要挂载的元素
    const root = document.getElementById('game')
    const detailUserId = userId || Math.floor((Math.random() + 1) * 10000).toString()
    setUserMapState(detailUserId, {
      userId: detailUserId // 玩家id
    })
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
                if (data) {
                  const parseData = JSON.parse(data)
                  console.log('[ parseData uid] >', parseData.uid, '[ parseData content] >', parseData.content)
                  setUserAudioPlayState(parseData.uid, { state: 1, uid: parseData.uid })
                  player.pushSrc({ src: base64ToBlobUrl(`data:audio/aac;base64,${parseData.audioData}`), data: parseData })
                  const list = aiUserContentList
                  list.push(parseData)
                  setAiUserContentList([...list])
                }
              }
            })
          }
        },
        onGameStateChange(handle, state, data) {
          switch (state) {
            case 'mg_common_game_player_mic_state': {
              console.log('[ 可以开始推送麦克说话状态 ] >', data)
              setIsGamePlayerMicStateOk(true)
              break
            }
          }
          return false
        },
        onGetGameViewInfo(handle, dataJson) {
          const width = root.clientWidth
          const height = root.clientHeight
          const data = JSON.parse(dataJson)
          const dpr = data.ratio || 1
          console.log(width, height, 'width,height', dataJson, 'dataJson', 'dpr', dpr)
          const viewGameRect = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 200
          }
          const gameViewInfo = {
            ret_code: 0,
            ret_msg: "success",
            view_size: {
              width: width * dpr,
              height: height * dpr
            },
            view_game_rect: viewGameRect
          }
          console.log(gameViewInfo, 'gameViewInfo')

          handle.success(JSON.stringify(gameViewInfo))
        },
        onGameMGCommonGameBackLobby(handle, data) {
          // 返回游戏大厅
          console.log('onGameMGCommonGameBackLobby', data)

          goBack && goBack(data)
        }
      })
      setSudSDK(nsdk)
      nsdk.login(detailUserId)
    }
  }, [])

  useEffect(() => {
    if (!aiAgent || !isGamePlayerMicStateOk) {
      return
    }
    console.log('[ app_common_game_player_mic_statenotify ] >', userAudioPlayStateMap)
    // 控制游戏展示对应玩家的声浪效果
    userAudioPlayStateMap.forEach((value) => {
      // value: {
      //     "uid": "user id",    // 玩家id
      //     "state": 0            // 0：停止说话 1：说话中
      // }
      SudSDK && SudSDK.sudFSTAPPDecorator.notifyAPPCommon('app_common_game_player_mic_state', JSON.stringify(value))
    })
  }, [isGamePlayerMicStateOk, aiAgent, SudSDK, userAudioPlayStateMap])

  // 滚动到底部
  const scrollToBottom = () => {
    if (contentRef.current) {
      const height = contentInnerRef.current!.clientHeight || 0
      contentRef.current.scrollTop = height
    }
  }

  useLayoutEffect(() => {
    scrollToBottom()
  }, [aiUserContentList])

  const addAiBot = () => {
    let aiuId = Math.floor((Math.random() + 1) * 1000000).toString()
    if (aiuId === realUserId) {
      aiuId = `988${aiuId}`
    }
    const avatar = Math.floor(Math.random() * 20)
    const aiPlayer = {
      userId: aiuId, // 玩家id
      avatar: `https://dev-sud-static.sudden.ltd/avatar/${avatar}.jpg`, // 头像url
      name: `${generateName()}`, // 名字
      gender: 'male', // 性别 male：男，female：女
      aiId: Math.floor(Math.random() * 275) + 1 // 随机一个ai性格 目前支持1~370
    }
    const aiPlayers: IAiModel = {
      aiPlayers: [aiPlayer],
      isReady: 1 // 机器人加入后是否自动准备 1：自动准备，0：不自动准备 默认为1
    }

    setUserMapState(aiuId, aiPlayer)
    console.log('[ add aiPlayers ] >', aiPlayers)
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
    realUserId,
    userMap,
    userAudioPlayStateMap,
    setUserAudioPlayState,

    contentInnerRef,
    contentRef,
    aiUserContentList,
    SudSDK,
    aiAgent,
    sendText,
    addAiBot
  }
}
