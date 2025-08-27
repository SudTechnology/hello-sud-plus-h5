import { SDKGameView } from "QuickStart"
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react"
import { ISudAiAgent, IModelAIPlayers } from "sudmgp-sdk-js-test/type"
const surnames = [
  // 单姓（常见）
  '林', '周', '沈', '顾', '陆', '叶', '苏', '程', '谢', '萧',
  // 单姓（意境）
  '云', '风', '江', '山', '墨', '白', '宁', '岑', '晏', '凌',
  // 复姓
  '欧阳', '上官', '慕容', '司徒', '南宫', '诸葛', '东方', '端木', '闻人', '夏侯'
]
const modernNames = ['一然', '予安', '司衡', '景和', '知远', '星冉', '若洲', '清川', '南舟', '云起']
const classicNames = ['疏桐', '砚舟', '镜玄', '怀瑾', '墨珩', '清晏', '昭明', '溪亭', '望舒', '攸宁']
const natureNames = ['雪松', '云溪', '星河', '鹤鸣', '栖野', '听澜', '屿枫', '鹿蹊', '汀兰', '竹隐']

function generateName() {
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const isCompound = surname.length > 1 // 判断复姓
  const namePool = [...modernNames, ...classicNames, ...natureNames]
  let givenName = namePool[Math.floor(Math.random() * namePool.length)]

  // 复姓时取1-2字名字（避免过长）
  if (isCompound && givenName.length > 2) {
    givenName = givenName.substring(0, 2)
  }
  return surname + givenName
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
  // const { pushAudio, initAudio } = useAudio()
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
                if (data) {
                  const parseData = JSON.parse(data)
                  console.log('[ parseData uid] >', parseData.uid, '[ parseData content] >', parseData.content)
                  setUserAudioPlayState(parseData.uid, { state: 1, uid: parseData.uid })

                  // pushAudio(parseData, () => {
                  //   setUserAudioPlayState(parseData.uid, { state: 1, uid: parseData.uid })
                  //   const list = aiUserContentList
                  //   list.push(parseData)
                  //   setAiUserContentList([...list])
                  // })
                  // 如果不存在id，则录入
                  // const sound = new Howl({
                  //   src: `data:audio/wav;base64,${parseData.audioData}`, // 支持本地路径或 URL
                  //   html5: true, // 启用 HTML5 Audio 模式（解决移动端限制）
                  //   volume: 0.8, // 初始音量（0~1）
                  //   loop: false, // 循环播放
                  //   onend: () => setUserAudioPlayState(parseData.uid, { state: 0, uid: parseData.uid }),
                  //   onloaderror: (e) => console.log(e, 'play error')
                  //   // 事件监听
                  // })
                  const audio = new Audio(`data:audio/mp3;base64,${parseData.audioData}`)
                  // 播放结束
                  audio.addEventListener('ended', () => {
                    // 播放结束，更新uid的播放状态
                    setUserAudioPlayState(parseData.uid, { state: 0, uid: parseData.uid })
                  })

                  audio.oncanplaythrough = () => audio.play().catch(e => console.error("播放失败:", e))
                  audio.onerror = (e) => console.error("音频加载失败", e)
                  const list = aiUserContentList
                  list.push(parseData)
                  setAiUserContentList([...list])
                }
              }
            })
          }
        },
        onGameCustomerStateChange(handle, state, data) {
          switch (state) {
            case 'mg_common_game_player_mic_state': {
              console.log('[ 可以开始推送麦克说话状态 ] >', data)
              setIsGamePlayerMicStateOk(true)
            }
          }
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
    const aiPlayers: IAiModel = {
      aiPlayers: [
        {
          userId: aiuId, // 玩家id
          avatar: `https://dev-sud-static.sudden.ltd/avatar/${avatar}.jpg`, // 头像url
          // @ts-ignore
          name: `${generateName()}`, // 名字
          gender: 'male', // 性别 male：男，female：女
          aiId: Math.floor(Math.random() * 275) + 1 // 随机一个ai性格 目前支持1~370
        }
      ],
      isReady: 1 // 机器人加入后是否自动准备 1：自动准备，0：不自动准备 默认为1
    }
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
