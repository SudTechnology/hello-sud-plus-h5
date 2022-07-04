/* eslint-disable no-unused-vars */
//  @ts-nocheck
export const useGameDetail = () => {
  const initGame = () => {
    // @ts-ignore
    const SudMGP = window.SudMGP
    if (!SudMGP) {
      return
    }
    // 获取屏幕宽高
    const num = Math.floor((Math.random() + 1) * 10000)
    const roomId = `90114`
    console.log(num)
    const parent1 = document.getElementById('game')
    const width = parent1?.clientWidth
    const height = parent1?.clientHeight
    console.log(width, height)

    const userId = `user12321${num}`
    SudMGP.testLogin(userId, "1461564080052506636", {
      onSuccess: function (retCode, code, expireDate) {
        // SudMGP.initSDK("1461564080052506636", "03pNxK2lEXsKiiwrBQ9GbH541Fk2Sfnc", "www.sud.tech", false, {
        SudMGP.initSDK("1461564080052506636", "03pNxK2lEXsKiiwrBQ9GbH541Fk2Sfnc", "tech.sud.mgp.hello", false, {
          onSuccess: function () {
            // 用户自定义进度条
            // SudMGP.getSudCfg().setShowCustomLoading(true)
            // SudMGP.getSudCfg().setShowLoadingGameBg(false)
            var fstApp = SudMGP.loadMG(userId, roomId, code, "1468180338417074177", "zh-CN", {
              onGameLog: function () {
                console.log("onGameLog")
              },

              onGameLoadingProgress: function (stage, retCode, progress) {
                console.log("onGameLoadingProgress", stage, retCode, progress)
              },

              onGameStarted: function () {
                console.log("onGameStarted")
              },

              onGameDestroyed: function () {
                console.log("onGameDestroyed")
              },

              onExpireCode: function (handle, dataJson) {
                console.log("onExpireCode")
              },

              onGetGameViewInfo: function (handle, dataJson) {
                var gameViewInfo = {
                  ret_code: 0,
                  ret_msg: "success",
                  view_size: {
                    width,
                    height
                  },
                  view_game_rect: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                  }
                }

                handle.success(JSON.stringify(gameViewInfo))
              },

              onGetGameCfg: function (handle, dataJson) {
                console.log("onGetGameCfg")

                var sudMGCfg = {
                  gameMode: 1,
                  gameCPU: 0,
                  gameSoundControl: 0,
                  gameSoundVolume: 100,
                  ui: {
                    gameSettle: {
                      hide: false
                    },
                    ping: {
                      hide: false
                    },
                    version: {
                      hide: false
                    },
                    level: {
                      hide: false
                    },
                    lobby_setting_btn: {
                      hide: false
                    }
                  }
                }

                console.log(sudMGCfg)
                handle.success(JSON.stringify(sudMGCfg))
              },

              onGameStateChange: function (handle, state, dataJson) {
                var kSuccess = {
                  retCode: 0,
                  retMsg: "success"
                }
                handle.success(JSON.stringify(kSuccess))
              },

              onPlayerStateChange: function (handle, userId, state, dataJson) {
                console.log("onPlayerStateChange")
              }
            }, parent1)
          },

          onFailure: function (retCode, retMsg) {
          }
        })
      },
      onFailure: function (retMsg) {

      }
    })
  }
  return {
    initGame
  }
}
