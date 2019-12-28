import { useContext, useState } from 'react'
import store from 'store'

import { STORE_KEYS } from '../../common/enums'
import { IpfsContext } from '../Context'
import { Spinner } from '../Loader'

export const Header = () => {
  const { orbitDB } = useContext(IpfsContext)
  const [avatar, setAvatar] = useState(null)

  orbitDB.open(store.get(STORE_KEYS.ME)).then(db => {
    setAvatar(db.get('avatar'))
    console.log({ avatar })
  })

  return (
    <header
      style={{ width: '100%', height: 40, borderBottom: '1px solid LightGray' }}
    >
      <nav
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '100%',
          paddingRight: 10,
          paddingLeft: 10
        }}
      >
        <button style={{ border: 'none' }}>add</button>

        <button style={{ border: 'none' }}>
          {avatar ? <img src={avatar} /> : <Spinner />}
        </button>
      </nav>
    </header>
  )
}
