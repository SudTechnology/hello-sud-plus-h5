import { SudFSTAPPDecorator } from "./decorator/SudFSTAPPDecorator";
import { SudFSMMGDecorator } from "./decorator/SudFSMMGDecorator";
import { SudFSMMGListener } from "./decorator/SudFSMMGListener";
import { GameConfigModel } from "./model/GameConfigModel";
import { GameViewInfoModel } from "./model/GameViewInfoModel";
import { SudMGPMGState } from "./state/SudMGPMGState";
import { SudMGPAPPState } from "./state/SudMGPAPPState";
import { GameCommonStateUtils } from "./utils/GameCommonStateUtils";
import { ISudFSMStateHandleUtils } from "./utils/ISudFSMStateHandleUtils";
export declare const SudMGPWrapper: {
    decorator: {
        SudFSTAPPDecorator: typeof SudFSTAPPDecorator;
        SudFSMMGDecorator: typeof SudFSMMGDecorator;
        SudFSMMGListener: typeof SudFSMMGListener;
    };
    model: {
        GameConfigModel: typeof GameConfigModel;
        GameViewInfoModel: typeof GameViewInfoModel;
    };
    state: {
        SudMGPMGState: typeof SudMGPMGState;
        SudMGPAPPState: typeof SudMGPAPPState;
    };
    utils: {
        ISudFSMStateHandleUtils: typeof ISudFSMStateHandleUtils;
        GameCommonStateUtils: typeof GameCommonStateUtils;
    };
};
export { SudFSTAPPDecorator, // 负责APP调用游戏
SudFSMMGDecorator, // 负责游戏调用APP
SudFSMMGListener, GameConfigModel, // 游戏配置模型
GameViewInfoModel, // 游戏视图安全区
SudMGPMGState, //  游戏调用APP
SudMGPAPPState, // APP调用游戏
ISudFSMStateHandleUtils, GameCommonStateUtils };
