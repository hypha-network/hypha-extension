import { useContext } from 'react'

import { VIEWS } from '../common/enums'
import { ViewContext, Header } from '../components'

import { Explore } from './Explore'
import { Me } from './Me'
import { Messages } from './Messages'
import { Welcome } from './Welcome'

export const View = () => {
  const { view } = useContext(ViewContext)

  switch (view) {
    case VIEWS.MESSAGES:
      return <Messages />
    case VIEWS.ME:
      return <Me />
    case VIEWS.EXPLORE:
      return <Explore />
    default:
      return <Welcome />
  }
}

export const Layout = () => (
  <>
    <Header />
    <article>
      <View />
    </article>
  </>
)
