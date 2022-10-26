import React from 'react'
import { Popup, Form, Button, TextArea } from 'antd-mobile'

interface IProp {
  visible: boolean
  onClose: () => void
  onFinish: (value: any) => void
}
const GameSetting: React.FC<IProp> = (props) => {
  return (
    <Popup
      visible={props.visible}
      position='right'
      showCloseButton
      onClose={props.onClose}
      bodyStyle={{ width: '100vw', padding: '30px 0', overflowY: 'scroll' }}>
        <Form
          onFinish={props.onFinish}
          footer={
            <Button block type='submit' color='primary' size='large'>
              确认
            </Button>
          }
        >
          <Form.Item name="value" label="json配置">
            <TextArea rows={20} />
          </Form.Item>
          {/* <Form.Item name="gameMode" initialValue={1} label="gameMode">
            <Input />
          </Form.Item>
          <Form.Item name="gameCPU" label="gameCPU">
            <Radio.Group>
              <Radio value={0}>
                CPU正常功耗
              </Radio>
              <Radio value={1}>
                CPU低功耗
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item initialValue={100} name="gameSoundVolume" label="gameSoundVolume">
            <Input></Input>
          </Form.Item>

          <Form.Item name={['ui', 'gameSettle', 'hide']} label="gameCPU">
            <Radio.Group>
              <Radio value={1}>true</Radio>
              <Radio value={0}>false</Radio>
            </Radio.Group>
          </Form.Item> */}

        </Form>
     </Popup>
  )
}
export default GameSetting