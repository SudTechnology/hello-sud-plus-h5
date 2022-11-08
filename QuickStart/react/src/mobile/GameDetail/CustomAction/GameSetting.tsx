import React from 'react'
import { Popup, Form, Button, TextArea } from 'antd-mobile'

interface IProp {
  visible: boolean
  onClose: () => void
  onFinish: (value: any) => void
}

const gameConfig = JSON.stringify({
  gameMode: 1,
  gameCPU: 0,
  gameSoundControl: 0,
  gameSoundVolume: 100,
  ui: {
    gameSettle: {
      hide: false
    },
    ping: {
      hide: false
    },
    version: {
      hide: false
    },
    level: {
      hide: false
    },
    lobby_setting_btn: {
      hide: false
    },
    lobby_help_btn: {
      hide: false
    },
    lobby_players: {
      custom: false,
      hide: false
    },
    lobby_player_captain_icon: {
      hide: false
    },
    lobby_player_kickout_icon: {
      hide: false
    },
    lobby_rule: {
      hide: false
    },
    lobby_game_setting: {
      hide: false
    },
    join_btn: {
      custom: false,
      hide: false
    },
    cancel_join_btn: {
      custom: false,
      hide: false
    },
    ready_btn: {
      custom: false,
      hide: false
    },
    cancel_ready_btn: {
      custom: false,
      hide: false
    },
    start_btn: {
      custom: false,
      hide: false
    },
    share_btn: {
      custom: false,
      hide: true
    },
    game_setting_btn: {
      hide: false
    },
    game_help_btn: {
      hide: false
    },
    game_settle_close_btn: {
      custom: false
    },
    game_settle_again_btn: {
      custom: false
    },
    game_bg: {
      hide: false
    },
    block_change_seat: {
      custom: false
    }
  }
}, null, 2)
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
          <Form.Item initialValue={gameConfig} name="value" label="默认配置">
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
