import { SDKGameView, MG_STATE } from "../mobile/DataGameDetail/QuickStart"
import { useEffect, useState } from "react"
import { getAccount, createOrder } from 'api/dataGame'
import type { CreateOrderParams } from 'api/dataGame'

export const useDataGameDetail = (gameId: string, roomId: string, language: string, userId?: string | null, goBack?: (data: any) => void) => {
  const [SudSDK, setSudSDK] = useState<SDKGameView>()
  const [coin, setCoin] = useState<number | null>(null)
  const [coinError, setCoinError] = useState('')
  // 页面挂载后进行sdk初始化
  useEffect(() => {
    // 卸载后不再 setState
    let cancelled = false
    // 要挂载的元素
    const root = document.getElementById('game')
    const detailUserId = userId || Math.floor((Math.random() + 1) * 10000).toString()
    if (root) {
      const nsdk = new SDKGameView({ root, gameRoomId: roomId, gameId, userId: detailUserId, language })

      /**
       * 拉取积分余额，对应安卓 CustomGameActivity.getAccountInfo(1754-1800)。
       * @param notifyGame 是否把余额回传给游戏。安卓只在 handleMgCommonGameGetScore 的 onSuccess 里
       *                   调 notifyAppCommonGameScore(1814)，登录后(428-439)和下单后(1988-1999)那两次
       *                   拉取都只刷 UI、不回传，所以这里同样只有 get_score 分支传 true。
       */
      const fetchCoin = (notifyGame: boolean) => {
        getAccount({ user_id: nsdk.userId, app_id: nsdk.SudMGP_APP_ID })
          .then(res => {
            if (cancelled) return
            const value = res?.data?.coin
            if (typeof value !== 'number') {
              setCoinError(res?.ret_msg || '获取失败')
              return
            }
            setCoin(value)
            setCoinError('')
            if (notifyGame) {
              nsdk.notifyAppCommonGameScore(value)
            }
          })
          .catch(error => {
            if (cancelled) return
            // 安卓 get_score 失败只打日志、不回传游戏(1806-1808)
            console.log('req user coin err:', error?.ret_msg)
            setCoinError(error?.ret_msg || '获取失败')
          })
      }

      /**
       * 提交订单并回传结果，对应安卓 handleMgCommonGameSetScore(1840-1915) 与
       * handleMgCommonGameCreateOrder(1936-2018) 的公共收尾。
       * 成功回传 result:1 后执行 onSuccess；失败（含网络异常与 ret_code!=0）必须回传 result:0，
       * 因为游戏在等下单结果，不给会卡住游戏内流程。
       */
      const submitOrder = (params: CreateOrderParams, onSuccess: () => void) => {
        createOrder(params)
          .then(() => {
            if (cancelled) return
            nsdk.notifyAppCommonCreateOrderResult(1)
            onSuccess()
          })
          .catch(error => {
            if (cancelled) return
            console.log('create-order fail:', error?.ret_msg)
            nsdk.notifyAppCommonCreateOrderResult(0)
          })
      }

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
            if (gameConfData.ui.root_bg_color) {
              const gameTopContainer = document.getElementById('game-top-container')
              // @ts-ignore
              gameTopContainer.style.backgroundColor = gameConfData.ui.root_bg_color
            }
          }
        },
        onGameMGCommonGameBackLobby(handle, data) {
          // 返回游戏大厅
          console.log('onGameMGCommonGameBackLobby', data)

          goBack && goBack(data)
        },
        // 对应安卓 CustomGameActivity.onGameStateChange(1596) 里 switch 的 1638-1646 三个 case
        onGameStateChange(handle, state, dataJson) {
          try {
            const payload = dataJson ? JSON.parse(dataJson) : {}
            switch (state) {
              // 游戏通知app获取积分
              case MG_STATE.GAME_GET_SCORE:
                fetchCoin(true)
                break

              // 游戏通知app带入积分：下单扣减，成功后本地扣余额（安卓 1892 mUserCoin -= totalScore）
              case MG_STATE.GAME_SET_SCORE: {
                const totalScore = payload.totalScore
                submitOrder({
                  user_id: nsdk.userId,
                  app_id: nsdk.SudMGP_APP_ID,
                  from_uid: nsdk.userId, // 安卓：自己给自己
                  to_uid: nsdk.userId,
                  mg_id: gameId, // 字符串直传，转 number 会丢精度
                  room_id: roomId,
                  cmd: 'add_score',
                  value: totalScore,
                  payload: '{}'
                }, () => setCoin(prev => (prev === null ? prev : prev - totalScore)))
                break
              }

              // 游戏通知app创建订单（打赏/购买道具，由游戏发起）：字段透传，成功后重新拉取余额（安卓 1988-1999）
              case MG_STATE.GAME_CREATE_ORDER:
                submitOrder({
                  user_id: nsdk.userId,
                  app_id: nsdk.SudMGP_APP_ID,
                  from_uid: payload.fromUid, // 游戏侧 camelCase -> 服务端 snake_case
                  to_uid: payload.toUid,
                  mg_id: gameId,
                  room_id: roomId,
                  cmd: payload.cmd,
                  value: payload.value,
                  payload: payload.payload ?? '' // 安卓 optString("payload") 语义
                }, () => fetchCoin(false))
                break
            }
          } catch (e) {
            // 安卓每个 handler 都包了 try/catch，这里同样不能让异常冒泡打断 decorator 的后续分发
            console.error('[ onGameStateChange ] >', state, e)
          }
          // 保持返回 false：这三个 state 不在 wrapper 的状态表里，会落到 default 分支自动 handleSuccess
          return false
        }
      })
      // 自定义loading
      // nsdk.beforeInitSdk = function (SudMGP) {
      //   return new Promise(() => {
      //     SudMGP.getSudCfg().setShowCustomLoading(true)
      //   })
      // }
      // nsdk.sudFSMMGDecorator.onGameLoadingProgress = function (stage: number, retCode: number, progress: number) {
      //   console.log('[ stage, retCode, progress ] >', stage, retCode, progress, '自定义进度')
      // }
      setSudSDK(nsdk)
      nsdk.login(detailUserId)
        // 等价安卓 onLoginSuccess -> initGameSDK -> getAccountInfo(426-439)：
        // 必须等 /login/v1 建好账户再拉余额，否则服务端返回 1013 RET_ACCOUNT_NOT_EXIST
        .then(() => {
          if (!cancelled) fetchCoin(false)
        })
        .catch(error => {
          console.error('[ login ] >', error)
        })
    }

    return () => {
      cancelled = true
    }
  }
  , [])
  return {
    SudSDK,
    coin,
    coinError
  }
}
