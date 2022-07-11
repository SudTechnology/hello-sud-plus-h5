import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import './styles/reset.css'
import './styles/antd-mobile.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import VConsole from 'vconsole'

// eslint-disable-next-line no-unused-vars
const vConsole = new VConsole()

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
