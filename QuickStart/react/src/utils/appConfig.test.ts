/* eslint-env jest */
import { appMap } from 'data/app'
import { getAppConfig, getCustomAppConfig } from './appConfig'

const defaultAppId = '1461564080052506636'
const presetAppId = '1473207032642564097'
const customConfig = { appId: '2109931702132596739', appKey: 'custom-app-key', enabled: true }

beforeEach(() => localStorage.clear())

test('uses the default or selected local preset without custom configuration', () => {
  expect(getAppConfig()).toEqual({ appId: defaultAppId, ...appMap[defaultAppId] })
  localStorage.setItem('localAppId', presetAppId)
  expect(getAppConfig()).toEqual({ appId: presetAppId, ...appMap[presetAppId] })
})

test('uses enabled custom credentials, trimming whitespace and preserving the full string ID', () => {
  localStorage.setItem('localAppId', presetAppId)
  localStorage.setItem('customAppConfig', JSON.stringify({
    ...customConfig,
    appId: ` ${customConfig.appId} `,
    appKey: ` ${customConfig.appKey} `
  }))
  expect(getCustomAppConfig()).toEqual(customConfig)
  expect(getAppConfig()).toEqual({ appId: customConfig.appId, appKey: customConfig.appKey })
})

test('restores the selected preset when custom credentials are disabled without changing stored or preset data', () => {
  const presets = JSON.stringify(appMap)
  const savedConfig = JSON.stringify({ ...customConfig, enabled: false })
  localStorage.setItem('localAppId', presetAppId)
  localStorage.setItem('customAppConfig', savedConfig)

  expect(getCustomAppConfig()).toEqual({ ...customConfig, enabled: false })
  expect(getAppConfig()).toEqual({ appId: presetAppId, ...appMap[presetAppId] })
  expect(localStorage.getItem('localAppId')).toBe(presetAppId)
  expect(localStorage.getItem('customAppConfig')).toBe(savedConfig)
  expect(JSON.stringify(appMap)).toBe(presets)
})

test('allows enabled custom credentials to override an explicit production preset', () => {
  const productionAppId = '2109931702132596738'
  expect(getAppConfig(productionAppId)).toEqual({ appId: productionAppId, ...appMap[productionAppId] })
  localStorage.setItem('customAppConfig', JSON.stringify(customConfig))
  expect(getAppConfig(productionAppId)).toEqual({ appId: customConfig.appId, appKey: customConfig.appKey })
})

test.each([
  '{invalid json',
  'null',
  '[]',
  '{}',
  JSON.stringify({ ...customConfig, appId: 123 }),
  JSON.stringify({ ...customConfig, appKey: false }),
  JSON.stringify({ ...customConfig, appId: '   ' }),
  JSON.stringify({ ...customConfig, appKey: '   ' })
])('falls back to the selected preset for invalid saved credentials: %s', savedConfig => {
  localStorage.setItem('localAppId', presetAppId)
  localStorage.setItem('customAppConfig', savedConfig)
  expect(getCustomAppConfig()).toBeNull()
  expect(getAppConfig()).toEqual({ appId: presetAppId, ...appMap[presetAppId] })
})

test('enables custom configuration only when enabled is the boolean true', () => {
  localStorage.setItem('customAppConfig', JSON.stringify({ ...customConfig, enabled: 'true' }))
  expect(getCustomAppConfig()).toEqual({ ...customConfig, enabled: false })
  expect(getAppConfig()).toEqual({ appId: defaultAppId, ...appMap[defaultAppId] })
})

test('safely falls back to the default for an unknown preset without overwriting the selection', () => {
  localStorage.setItem('localAppId', 'unknown-app')
  expect(getAppConfig()).toEqual({ appId: defaultAppId, ...appMap[defaultAppId] })
  expect(localStorage.getItem('localAppId')).toBe('unknown-app')
})
