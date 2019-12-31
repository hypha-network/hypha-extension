import { useContext, useState } from 'react'
import store from 'store'
import BounceLoader from 'react-spinners/BounceLoader'

import { STORE_KEYS, VIEWS } from '../../common/enums'
import PlusIcon from '../../static/plus.svg'
import CrossIcon from '../../static/cross.svg'

import { IpfsContext, ViewContext } from '../Context'
import { Avatar } from '../Avatar'

// shared styles
const styles = {
  header: { width: '100%', height: 40, borderBottom: '1px solid LightGray' },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingRight: 5,
    paddingLeft: 5
  },
  button: {
    height: 40,
    width: 40,
    border: 'none',
    outline: 'none',
    cursor: 'pointer'
  }
}

export const Header = () => {
  const { orbitDB } = useContext(IpfsContext)
  const { setView, setAddress, address, view } = useContext(ViewContext)

  // special case for explore
  const isExplore = view === VIEWS.EXPLORE
  const Icon = isExplore ? CrossIcon : PlusIcon

  // render avatar
  const [avatar, setAvatar] = useState(null)
  if (!avatar) {
    orbitDB.open(store.get(STORE_KEYS.ME)).then(async db => {
      await db.load()
      setAvatar(db.get('avatar'))
    })
  }

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <button
          style={styles.button}
          onClick={() => {
            setView(isExplore ? VIEWS.MESSAGES : VIEWS.EXPLORE)
          }}
        >
          <Icon style={{ height: 25, width: 25, paddingTop: 5 }} />
        </button>
        {isExplore ? <input /> : null}
        <button style={styles.button} onClick={() => setView(VIEWS.ME)}>
          {avatar ? (
            <Avatar src={avatar} size={30} />
          ) : (
            <BounceLoader size={30} />
          )}
        </button>
      </nav>
    </header>
  )
}
