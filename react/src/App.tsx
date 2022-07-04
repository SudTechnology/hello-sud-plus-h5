import React from 'react'
import router from './routers'
import './react-i18next/i18n'

const { mockXHR } = require('./mock')
mockXHR()

const App = () => {
  return (
    <div className={'app'} id="app">
      {router}
    </div>
  )
}

export default App
