import React, { useState } from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import { useHome } from 'hooks/useHome'
import { Input, Form } from 'antd-mobile'
const cx = classnames.bind(styles)

const Home = () => {
  const [env, setEnv] = useState(Number(localStorage.getItem('env')) || 3)
  const [appId, setAppId] = useState(localStorage.getItem('localAppId') || '1461564080052506636')

  const { list } = useHome()
  const [form] = Form.useForm()

  const toPath = (item: any) => {
    const values = form.getFieldsValue()
    console.log('[ values ] >', values)
    let url = `/game/${item.sceneId}?orientation=${item.orientation}`
    if (values.roomId) {
      url += `&roomId=${values.roomId}`
    }
    if (values.userId) {
      url += `&userId=${values.userId}`
    }
    if (values.language) {
      url += `&language=${values.language}`
    }
    console.log(url)

    location.href = url
  }

  const changeEnv = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('[ e ] >', e.target.value)
    const value = Number(e.target.value)
    setEnv(value)
    localStorage.setItem('env', e.target.value)
  }

  const changeAPP = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('[ e ] >', e.target.value)
    const value = e.target.value
    setAppId(value)
    localStorage.setItem('localAppId', value)
  }

  return (
    <div className={cx('container')}>
      {/* <div className={cx('title')}>Sud元宇宙互动升级</div> */}
      <div>
        <Form form={form} layout='horizontal'>
          <Form.Item label='房间号ID' name='roomId'>
            <Input type="number" placeholder='请输入房间号ID' clearable />
          </Form.Item>
          <Form.Item label='语言' name='language'>
            <Input placeholder='请输入语言值value' clearable />
          </Form.Item>
          <Form.Item label='userId' name='userId'>
            <Input clearable />
          </Form.Item>
        </Form>
      </div>
      <div className={cx('form-item')}>
        <label className={cx('form-item-lable')}>环境: </label>
        <select value={env} onChange={(e) => changeEnv(e)}>
          <option value={4}>开发环境dev</option>
          <option value={3}>测试环境fat</option>
          <option value={2}>sim环境</option>
          <option value={1}>pro环境</option>
        </select>
      </div>
      <div className={cx('form-item')}>
        <label className={cx('form-item-lable')}>appId: </label>
        <select value={appId} onChange={(e) => changeAPP(e)}>
          <option value={'1461564080052506636'}>1461564080052506636</option>
          <option value={'1486637108889305089'}>1486637108889305089</option>
        </select>
      </div>
      {/* 游戏列表 */}
      <div className={cx('game-list')}>
        {
          list.map((item: any) => {
            return (
              <a onClick={() => toPath(item)} key={item.sceneId} className={cx('game-item')}>
                <img className={cx('game-logo')} src={item.scenePic} alt="" />
                <div className={cx('game-title')}>{item.sceneName}</div>
              </a>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
