import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import { client } from './common/apollo'
import { ChatRoom, IpfsProvider } from './components'
import './popup.css'

const Popup = () => (
  <IpfsProvider>
    <ApolloProvider client={client}>
      <ChatRoom />
    </ApolloProvider>
  </IpfsProvider>
)

render(<Popup />, document.querySelector('#root'))
