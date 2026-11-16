import { appMap } from 'data/app'

interface CustomAppConfig {
  appId: string
  appKey: string
  enabled: boolean
}

const defaultAppId = '1461564080052506636'

export const getCustomAppConfig = (): CustomAppConfig | null => {
  try {
    const config = JSON.parse(localStorage.getItem('customAppConfig') || 'null')
    if (typeof config?.appId !== 'string' || typeof config?.appKey !== 'string' ||
      !config.appId.trim() || !config.appKey.trim()) {
      return null
    }
    return {
      appId: config.appId.trim(),
      appKey: config.appKey.trim(),
      enabled: config.enabled === true
    }
  } catch {
    return null
  }
}

export const getAppConfig = (presetAppId = localStorage.getItem('localAppId') || defaultAppId) => {
  const customConfig = getCustomAppConfig()
  if (customConfig?.enabled) {
    return { appId: customConfig.appId, appKey: customConfig.appKey }
  }

  const appId = Object.prototype.hasOwnProperty.call(appMap, presetAppId)
    ? presetAppId as keyof typeof appMap
    : defaultAppId
  return { appId, appKey: appMap[appId].appKey }
}
