import React from 'react'
import ReactDOM from 'react-dom'

import { ChatRoom, IpfsProvider } from './components'
import './popup.css'

const Popup = () => (
  <IpfsProvider>
    <ChatRoom />
  </IpfsProvider>
)

ReactDOM.render(<Popup />, document.querySelector('#root'))
