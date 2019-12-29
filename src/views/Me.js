import store from 'store'
import DotLoader from 'react-spinners/DotLoader'

import { STORE_KEYS, VIEWS } from '../common/enums'
import { Header } from '../components'

export const Me = () => (
  <article>
    <Header />
    <section
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
      }}
    >
      <span>profile</span>
      <pre style={{ overflow: 'scroll', width: 220 }}>
        {store.get(STORE_KEYS.ME)}
      </pre>
    </section>
  </article>
)
