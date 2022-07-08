import { SudFSTAPPDecorator } from "./decorator/SudFSTAPPDecorator"
import { SudFSMMGDecorator } from "./decorator/SudFSMMGDecorator"
import { SudFSMMGListener } from "./decorator/SudFSMMGListener"
import { GameConfigModel } from "./model/GameConfigModel"
import { GameViewInfoModel } from "./model/GameViewInfoModel"
import { SudMGPMGState } from "./state/SudMGPMGState"
import { SudMGPAPPState } from "./state/SudMGPAPPState"
import { GameCommonStateUtils } from "./utils/GameCommonStateUtils"
import { ISudFSMStateHandleUtils } from "./utils/ISudFSMStateHandleUtils"

export const SudMGPWrapper = {
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
    SudMGPMGState, //  游戏调用APP
    SudMGPAPPState // APP调用游戏
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
  SudMGPMGState, //  游戏调用APP
  SudMGPAPPState, // APP调用游戏
  ISudFSMStateHandleUtils,
  GameCommonStateUtils // 工具函数
}
