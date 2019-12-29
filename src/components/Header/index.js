import { useContext, useState } from 'react'
import store from 'store'
import BounceLoader from 'react-spinners/BounceLoader'

import { STORE_KEYS, VIEWS } from '../../common/enums'
import { IpfsContext, ViewContext } from '../Context'
import { Avatar } from '../Avatar'

export const Header = () => {
  const [height, buttonWidth] = [40, 40]

  const { orbitDB } = useContext(IpfsContext)
  const { setView } = useContext(ViewContext)

  const [avatar, setAvatar] = useState(null)
  orbitDB.open(store.get(STORE_KEYS.ME)).then(async db => {
    await db.load()
    setAvatar(db.get('avatar'))
  })

  return (
    <header
      style={{ width: '100%', height, borderBottom: '1px solid LightGray' }}
    >
      <nav
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height,
          paddingRight: 10,
          paddingLeft: 10
        }}
      >
        <button style={{ border: 'none' }}>add</button>

        <button
          style={{
            height,
            width: buttonWidth,
            border: 'none',
            outline: 'none',
            cursor: 'pointer'
          }}
          onClick={() => setView(VIEWS.ME)}
        >
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
