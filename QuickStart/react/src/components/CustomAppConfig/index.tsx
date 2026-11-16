import React, { useState } from 'react'
import { Button, Form, Input, Modal, Toast } from 'antd-mobile'
import { getCustomAppConfig } from 'utils/appConfig'
import styles from './index.module.less'

const CustomAppConfig = () => {
  const [visible, setVisible] = useState(false)
  const [savedConfig, setSavedConfig] = useState(getCustomAppConfig)

  const saveConfig = (values: { appId: string, appKey: string }) => {
    const config = { appId: values.appId.trim(), appKey: values.appKey.trim(), enabled: true }
    localStorage.setItem('customAppConfig', JSON.stringify(config))
    setSavedConfig(config)
    setVisible(false)
    Toast.show({ icon: 'success', content: '自定义配置已启用' })
  }

  return (
    <div className={styles.entry}>
      <Button size='small' onClick={() => setVisible(true)}>自定义 App 配置</Button>
      {savedConfig?.enabled && (
        <div className={styles.current} role='status'>当前使用 AppID（自定义）：{savedConfig.appId}</div>
      )}
      <Modal
        className={styles.modal}
        visible={visible}
        title='自定义 App 配置'
        showCloseButton
        closeOnMaskClick
        destroyOnClose
        onClose={() => setVisible(false)}
        content={
          <>
            <p className={styles.status} role='status'>当前使用：{savedConfig?.enabled ? '自定义配置' : '预设配置'}</p>
            <Form
              layout='horizontal'
              initialValues={savedConfig || { appId: '', appKey: '' }}
              onFinish={saveConfig}
              footer={
                <Button block type='submit' color='primary'>确定</Button>
              }
            >
              <Form.Item label='AppID' name='appId' rules={[{ required: true, whitespace: true, message: '请输入 AppID' }]}>
                <Input aria-label='自定义 AppID' placeholder='请输入 AppID' autoComplete='off' clearable />
              </Form.Item>
              <Form.Item label='AppKey' name='appKey' rules={[{ required: true, whitespace: true, message: '请输入 AppKey' }]}>
                <Input aria-label='自定义 AppKey' type='password' placeholder='请输入 AppKey' autoComplete='off' clearable />
              </Form.Item>
            </Form>
          </>
        }
      />
    </div>
  )
}

export default CustomAppConfig
