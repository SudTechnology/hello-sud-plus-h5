/**
 * 游戏配置模型
 * 参考文档：https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG/onGetGameCfg.html
 */
export declare class GameUi {
    gameSettle: GameSettle;
    ping: GamePing;
    version: GameVersion;
    level: GameLevel;
    lobby_setting_btn: GameLobbySettingBtn;
    lobby_help_btn: GameLobbyHelpBtn;
    lobby_players: GameLobbyPlayers;
    lobby_player_captain_icon: GameLobbyPlayerCaptainIcon;
    lobby_player_kickout_icon: GameLobbyPlayerKickoutIcon;
    lobby_rule: GameLobbyRule;
    lobby_game_setting: GameLobbyGameSetting;
    join_btn: GameJoinBtn;
    cancel_join_btn: GameCancelJoinBtn;
    ready_btn: GameReadyBtn;
    cancel_ready_btn: GameCancelReadyBtn;
    start_btn: GameStartBtn;
    share_btn: GameShareBtn;
    game_setting_btn: GameSttingBtn;
    game_help_btn: GameHelpBtn;
    game_settle_close_btn: GameSettleCloseBtn;
    game_settle_again_btn: GameSettleAgainBtn;
    game_bg: GameBg;
    block_change_seat: BlockChangeSeat;
}
declare class GameSettle {
    hide: boolean;
}
declare class GamePing {
    hide: boolean;
}
declare class GameVersion {
    hide: boolean;
}
declare class GameLevel {
    hide: boolean;
}
declare class GameLobbySettingBtn {
    hide: boolean;
}
declare class GameLobbyHelpBtn {
    hide: boolean;
}
declare class GameLobbyPlayers {
    custom: boolean;
    hide: boolean;
}
declare class GameLobbyPlayerCaptainIcon {
    hide: boolean;
}
declare class GameLobbyPlayerKickoutIcon {
    hide: boolean;
}
declare class GameLobbyRule {
    hide: boolean;
}
declare class GameLobbyGameSetting {
    hide: boolean;
}
declare class GameJoinBtn {
    custom: boolean;
    hide: boolean;
}
declare class GameCancelJoinBtn {
    custom: boolean;
    hide: boolean;
}
declare class GameReadyBtn {
    custom: boolean;
    hide: boolean;
}
declare class GameCancelReadyBtn {
    custom: boolean;
    hide: boolean;
}
declare class GameStartBtn {
    custom: boolean;
    hide: boolean;
}
declare class GameShareBtn {
    custom: boolean;
    hide: boolean;
}
declare class GameSttingBtn {
    hide: boolean;
}
declare class GameHelpBtn {
    hide: boolean;
}
declare class GameSettleCloseBtn {
    custom: boolean;
}
declare class GameSettleAgainBtn {
    custom: boolean;
}
declare class GameBg {
    hide: boolean;
}
declare class BlockChangeSeat {
    custom: boolean;
}
export declare class GameConfigModel {
    gameMode: number;
    gameCPU: number;
    gameSoundControl: number;
    gameSoundVolume: number;
    ui: GameUi;
}
export {};
