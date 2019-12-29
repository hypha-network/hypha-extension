import { useContext } from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import { client as ApolloClient } from './common/apollo'
import { VIEWS } from './common/enums'
import { ChatRoom, IpfsProvider, ViewProvider, ViewContext } from './components'
import { Welcome, Messages, Me } from './views'
import './popup.css'

const Views = () => {
  const { view } = useContext(ViewContext)

  switch (view) {
    case VIEWS.WELCOME:
      return <Welcome />
    case VIEWS.MESSAGES:
      return <Messages />
    case VIEWS.ME:
      return <Me />
    default:
      return <Welcome />
  }
}

const Popup = () => (
  <IpfsProvider>
    <ApolloProvider client={ApolloClient}>
      <ViewProvider>
        <Views />
      </ViewProvider>
    </ApolloProvider>
  </IpfsProvider>
)

render(<Popup />, document.querySelector('#root'))
