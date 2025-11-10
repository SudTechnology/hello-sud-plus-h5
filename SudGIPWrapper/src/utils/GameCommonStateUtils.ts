/*
 * Copyright © Sud.Tech
 * https://sud.tech
 */

import { IMGCommonPublicMessage, IMGCommonPublicMessageMsgText } from "../state/ISudGIPMGState"

/**
 * 游戏通用状态工具类
 */
export class GameCommonStateUtils {
  /**
     * 解析公屏消息
     *
     * @param publicMessage
     * @return
     */
  public static parseMGCommonPublicMessage(publicMessage: IMGCommonPublicMessage, languageCode: keyof IMGCommonPublicMessageMsgText): string | null {
    if (publicMessage == null || publicMessage.msg == null || publicMessage.msg.length === 0) {
      return null
    }
    let str = ''
    const msg = publicMessage.msg
    for (let i = 0; i < msg.length; i++) {
      const msgModel = msg[i]
      switch (msgModel.phrase) {
        case 1: {
          const text = this.parseI18nText(languageCode, msgModel.text as IMGCommonPublicMessageMsgText)
          if (text != null) {
            str += text
          }
          break
        }
        case 2:
          if (msgModel.user != null && msgModel.user.name != null) {
            str += msgModel.user.name
          }
          break
      }
    }
    return str
  }

  /**
     * 根据当前的语言码，选择对应语言的文字
     *
     * @param languageCode 语言代码
     * @param model        游戏发过来的文本对象
     * @return 返回选择的字符串
     */
  public static parseI18nText(languageCode: keyof IMGCommonPublicMessageMsgText, model: IMGCommonPublicMessageMsgText): string | undefined | null {
    if (model === null || !model) return null
    if (languageCode == null) return model.defaultStr

    // 精准匹配
    const text = this.i18nPrecise(languageCode, model)

    if (!text) {
      // 如果未匹配到，则尝试模糊匹配
      if (this.isMatchLanguage(languageCode, "zh")) {
        return model['zh-CN']
      }
      return model['en-US']
    } else {
      return text
    }
  }

  /** 精准匹配 */
  private static i18nPrecise(languageCode: keyof IMGCommonPublicMessageMsgText, model: IMGCommonPublicMessageMsgText): string | undefined {
    return model[languageCode]
  }

  /**
     * 判断是否是该语言
     */
  private static isMatchLanguage(languageCode: string, matchLanguageCode: string): boolean {
    if (languageCode != null && matchLanguageCode != null) {
      return matchLanguageCode === languageCode || languageCode.startsWith(matchLanguageCode + "-")
    }
    return false
  }
}
