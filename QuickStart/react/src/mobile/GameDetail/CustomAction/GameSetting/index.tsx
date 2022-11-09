import React from 'react'
import { Popup, Input, Form, Button, Radio, Switch } from 'antd-mobile'
import styles from './index.module.less'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

interface IProp {
  visible: boolean
  onClose: () => void
  onFinish: (value: any) => void
}

const GameSetting: React.FC<IProp> = (props) => {
  const [form] = Form.useForm()

  return (
    <Popup
      visible={props.visible}
      position='right'
      showCloseButton
      onClose={props.onClose}
      bodyStyle={{ width: '100vw', padding: '30px 0 0' }}>
        <div className={cx('content')}>
          <Form
            onFinish={props.onFinish}
            mode='card'
            form={form}
            layout='horizontal'
            className={cx('form')}
            footer={null}>
              <Form.Item name="gameMode" initialValue={1} label="gameMode">
                <Input />
              </Form.Item>
              <Form.Item name="gameCPU" initialValue={0} label="gameCPU">
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
              <Form.Header>gameSettle</Form.Header>

              <Form.Item name={['ui', 'gameSettle', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>
              <Form.Header>ping</Form.Header>

              <Form.Item name={['ui', 'ping', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>version</Form.Header>

              <Form.Item name={['ui', 'version', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>
              <Form.Header>level</Form.Header>
              <Form.Item name={['ui', 'level', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>lobby_setting_btn</Form.Header>
              <Form.Item name={['ui', 'lobby_setting_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>lobby_help_btn</Form.Header>
              <Form.Item name={['ui', 'lobby_help_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>lobby_players</Form.Header>
              <Form.Item name={['ui', 'lobby_players', 'custom']} initialValue={false} label='custom'>
                <Switch/>
              </Form.Item>
              <Form.Item name={['ui', 'lobby_players', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>lobby_player_captain_icon</Form.Header>
              <Form.Item name={['ui', 'lobby_player_captain_icon', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>lobby_player_kickout_icon</Form.Header>
              <Form.Item name={['ui', 'lobby_player_kickout_icon', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>lobby_rule</Form.Header>
              <Form.Item name={['ui', 'lobby_rule', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>lobby_game_setting</Form.Header>
              <Form.Item name={['ui', 'lobby_game_setting', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>join_btn</Form.Header>
              <Form.Item name={['ui', 'join_btn', 'custom']} initialValue={false} label='custom'>
                <Switch/>
              </Form.Item>
              <Form.Item name={['ui', 'join_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>cancel_join_btn</Form.Header>
              <Form.Item name={['ui', 'cancel_join_btn', 'custom']} initialValue={false} label='custom'>
                <Switch/>
              </Form.Item>
              <Form.Item name={['ui', 'cancel_join_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>ready_btn</Form.Header>
              <Form.Item name={['ui', 'ready_btn', 'custom']} initialValue={false} label='custom'>
                <Switch/>
              </Form.Item>
              <Form.Item name={['ui', 'ready_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>cancel_ready_btn</Form.Header>
              <Form.Item name={['ui', 'cancel_ready_btn', 'custom']} initialValue={false} label='custom'>
                <Switch/>
              </Form.Item>
              <Form.Item name={['ui', 'cancel_ready_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>start_btn</Form.Header>
              <Form.Item name={['ui', 'start_btn', 'custom']} initialValue={false} label='custom'>
                <Switch/>
              </Form.Item>
              <Form.Item name={['ui', 'start_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>share_btn</Form.Header>
              <Form.Item name={['ui', 'share_btn', 'custom']} initialValue={false} label='custom'>
                <Switch/>
              </Form.Item>
              <Form.Item name={['ui', 'share_btn', 'hide']} initialValue={true} label='hide'>
                <Switch defaultChecked/>
              </Form.Item>

              <Form.Header>game_setting_btn</Form.Header>
              <Form.Item name={['ui', 'game_setting_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>game_help_btn</Form.Header>
              <Form.Item name={['ui', 'game_help_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>game_settle_close_btn</Form.Header>
              <Form.Item name={['ui', 'game_settle_close_btn', 'custom']} initialValue={false} label='custom'>
                <Switch/>
              </Form.Item>
              <Form.Item name={['ui', 'game_settle_close_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>game_settle_again_btn</Form.Header>
              <Form.Item name={['ui', 'game_settle_again_btn', 'custom']} initialValue={false} label='custom'>
                <Switch/>
              </Form.Item>
              <Form.Item name={['ui', 'game_settle_again_btn', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>game_bg</Form.Header>
              <Form.Item name={['ui', 'game_bg', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>block_change_seat</Form.Header>
              <Form.Item name={['ui', 'block_change_seat', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>game_setting_select_pnl</Form.Header>
              <Form.Item name={['ui', 'game_setting_select_pnl', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>game_managed_image</Form.Header>
              <Form.Item name={['ui', 'game_managed_image', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>game_table_image</Form.Header>
              <Form.Item name={['ui', 'game_table_image', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>game_countdown_time</Form.Header>
              <Form.Item name={['ui', 'game_countdown_time', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>game_selected_tips</Form.Header>
              <Form.Item name={['ui', 'game_selected_tips', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>nft_avatar</Form.Header>
              <Form.Item name={['ui', 'nft_avatar', 'hide']} initialValue={true} label='hide'>
                <Switch defaultChecked/>
              </Form.Item>

              <Form.Header>game_opening</Form.Header>
              <Form.Item name={['ui', 'game_opening', 'hide']} initialValue={true} label='hide'>
                <Switch defaultChecked/>
              </Form.Item>

              <Form.Header>game_mvp</Form.Header>
              <Form.Item name={['ui', 'game_mvp', 'hide']} initialValue={true} label='hide'>
                <Switch defaultChecked/>
              </Form.Item>

              <Form.Header>umo_icon</Form.Header>
              <Form.Item name={['ui', 'umo_icon', 'hide']} initialValue={false} label='hide'>
                <Switch/>
              </Form.Item>

              <Form.Header>logo</Form.Header>
              <Form.Item name={['ui', 'logo', 'hide']} initialValue={false} label='hide'>
                <Switch />
              </Form.Item>
          </Form>
          <div className={cx('footer')}>
            <Button block type='submit'
            onClick={() => {
              props.onFinish(form.getFieldsValue())
            }} color='primary' size='large'>
              确认
            </Button>
          </div>
        </div>
     </Popup>
  )
}
export default GameSetting
