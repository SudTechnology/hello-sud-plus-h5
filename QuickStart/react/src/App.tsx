import React from 'react'
import router from './routers'
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
