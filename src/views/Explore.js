import { useContext, useState, useEffect } from 'react'
import DotLoader from 'react-spinners/DotLoader'
import store from 'store'

import { Header, ViewContext, IpfsContext, Avatar } from '../components'

import PlusIcon from '../static/plus.svg'
import { STORE_KEYS } from '../common/enums'

export const Explore = () => {
  const { address } = useContext(ViewContext)
  const { orbitDB } = useContext(IpfsContext)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (address && orbitDB) {
      orbitDB.open(address).then(async db => {
        await db.load()

        setProfile({
          avatar: db.get('avatar'),
          userName: db.get('userName'),
          displayName: db.get('displayName')
        })
      })
    }
  }, [address])

  console.log({ address, profile })
  return address ? (
    profile ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Avatar src={profile.avatar} size={30} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}
          >
            <span>{profile.displayName}</span>
            <span>{`@${profile.userName}`}</span>
          </div>
        </div>
        <button
          onClick={async () => {
            try {
              const db = await orbitDB.open(address, { sync: true })

              const preContacts = store.get(STORE_KEYS.CONTACTS) || []

              const contacts = preContacts.includes(address)
                ? preContacts
                : [address].concat(preContacts)
              store.set(contacts)
            } catch (err) {
              console.error(err)
            }
          }}
          style={{
            width: 30,
            marginRight: 10,
            height: 30,
            border: 'none',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <PlusIcon />
        </button>
      </div>
    ) : (
      <DotLoader />
    )
  ) : null
}
