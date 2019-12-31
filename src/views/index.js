import { useContext } from 'react'

import { VIEWS } from '../common/enums'
import { ViewContext, Header } from '../components'

import { Explore } from './Explore'
import { Me } from './Me'
import { Messages } from './Messages'
import { Welcome } from './Welcome'

export const Layout = () => {
  const { view } = useContext(ViewContext)

  let Component = Welcome
  switch (view) {
    case VIEWS.MESSAGES:
      Component = Messages
    case VIEWS.ME:
      Component = Me
    case VIEWS.EXPLORE:
      Component = Explore
  }

  return (
    <>
      {view !== VIEWS.WELCOME && <Header />}
      <article>
        <Component />
      </article>
    </>
  )
}
