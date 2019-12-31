import { useContext } from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import { client as ApolloClient } from './common/apollo'
import { VIEWS } from './common/enums'
import { ChatRoom, IpfsProvider, ViewProvider, ViewContext } from './components'
import { Layout } from './views'
import './popup.css'

const Popup = () => (
  <IpfsProvider>
    <ApolloProvider client={ApolloClient}>
      <ViewProvider>
        <Layout />
      </ViewProvider>
    </ApolloProvider>
  </IpfsProvider>
)

render(<Popup />, document.querySelector('#root'))
