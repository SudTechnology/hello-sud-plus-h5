import { SudFSTAPPDecorator } from "./decorator/SudFSTAPPDecorator"
import { SudFSMMGDecorator } from "./decorator/SudFSMMGDecorator"
import { SudFSMMGListener } from "./decorator/SudFSMMGListener"
import { GameConfigModel } from "./model/GameConfigModel"
import { GameViewInfoModel } from "./model/GameViewInfoModel"
import { SudGIPMGState } from "./state/SudGIPMGState"
import { SudGIPAPPState } from "./state/SudGIPAPPState"
import { GameCommonStateUtils } from "./utils/GameCommonStateUtils"
import { ISudFSMStateHandleUtils } from "./utils/ISudFSMStateHandleUtils"

export const SudGIPWrapper = {
  decorator: {
    SudFSTAPPDecorator, // 负责APP调用游戏
    SudFSMMGDecorator, // 负责游戏调用APP
    SudFSMMGListener
  },
  model: {
    GameConfigModel, // 游戏配置模型
    GameViewInfoModel // 游戏视图安全区
  },
  state: {
    SudGIPMGState,
    SudGIPAPPState
  },
  utils: {
    ISudFSMStateHandleUtils,
    GameCommonStateUtils // 工具函数
  }
}

export {
  SudFSTAPPDecorator, // 负责APP调用游戏
  SudFSMMGDecorator, // 负责游戏调用APP
  SudFSMMGListener,
  GameConfigModel, // 游戏配置模型
  GameViewInfoModel, // 游戏视图安全区
  SudGIPMGState,
  SudGIPAPPState,
  ISudFSMStateHandleUtils,
  GameCommonStateUtils // 工具函数
}
