import { IMGCommonPublicMessage, IMGCommonPublicMessageMsgText } from "../state/ISudMGPMGState";
/**
 * 游戏通用状态工具类
 */
export declare class GameCommonStateUtils {
    /**
       * 解析公屏消息
       *
       * @param publicMessage
       * @return
       */
    static parseMGCommonPublicMessage(publicMessage: IMGCommonPublicMessage, languageCode: keyof IMGCommonPublicMessageMsgText): string | null;
    /**
       * 根据当前的语言码，选择对应语言的文字
       *
       * @param languageCode 语言代码
       * @param model        游戏发过来的文本对象
       * @return 返回选择的字符串
       */
    static parseI18nText(languageCode: keyof IMGCommonPublicMessageMsgText, model: IMGCommonPublicMessageMsgText): string | undefined | null;
    /** 精准匹配 */
    private static i18nPrecise;
    /**
       * 判断是否是该语言
       */
    private static isMatchLanguage;
}
