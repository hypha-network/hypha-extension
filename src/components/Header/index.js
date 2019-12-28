import { useContext, useState } from 'react'
import store from 'store'
import BounceLoader from 'react-spinners/BounceLoader'

import { STORE_KEYS } from '../../common/enums'
import { IpfsContext } from '../Context'

export const Header = () => {
  const { orbitDB } = useContext(IpfsContext)
  const [avatar, setAvatar] = useState(null)

  orbitDB.open(store.get(STORE_KEYS.ME)).then(async db => {
    await db.load()
    const test = db.get('avatar')
    setAvatar(test)

    console.log({ test, db })
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

        <button
          style={{
            height: '100%',
            width: 40,
            border: 'none',
            borderRadius: '100%',
            overflow: 'hidden'
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              style={{ height: 'auto', width: '100%', display: 'block' }}
            />
          ) : (
            <BounceLoader size={20} />
          )}
        </button>
      </nav>
    </header>
  )
}
