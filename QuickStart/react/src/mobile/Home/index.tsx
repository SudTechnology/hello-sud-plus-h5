import React from 'react'
import styles from './index.module.less'
import classnames from 'classnames/bind'
import { useHome } from 'hooks/useHome'
import { Input, Form } from 'antd-mobile'
const cx = classnames.bind(styles)

const Home = () => {
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
  return (
    <div className={cx('container')}>
      {/* <div className={cx('title')}>Sud元宇宙互动升级</div> */}
      <div>
        <Form form={form} layout='horizontal'>
          <Form.Item label='房间号ID' name='roomId'>
            <Input placeholder='请输入房间号ID' clearable />
          </Form.Item>
          <Form.Item label='语言' name='language'>
            <Input placeholder='请输入语言值value' clearable />
          </Form.Item>
          <Form.Item label='userId' name='userId'>
            <Input clearable />
          </Form.Item>
        </Form>
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
