import { useContext, useState, useEffect } from 'react'
import store from 'store'
import Loader from 'react-spinners/PropagateLoader'

import { STORE_KEYS } from '../../common/enums'
import PlusIcon from '../../static/plus.svg'
import CrossIcon from '../../static/cross.svg'
import CheckIcon from '../../static/check.svg'

import { Avatar } from '../Avatar'
import { IpfsContext } from '../Context'

const RemoveButton = ({ style, onClick }) => {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={style}
    >
      {hover ? <CrossIcon /> : <CheckIcon />}
    </button>
  )
}

const AddButton = ({ style, onClick }) => {
  return (
    <button onClick={onClick} style={style}>
      <PlusIcon />
    </button>
  )
}

const buttonStyle = {
  width: 30,
  marginRight: 10,
  height: 30,
  border: 'none',
  outline: 'none',
  cursor: 'pointer'
}

export const Profile = ({ address }) => {
  const { orbitDB } = useContext(IpfsContext)
  const [profile, setProfile] = useState(null)
  const [contacts, setContacts] = useState([])

  // get contact list
  useEffect(() => setContacts(store.get(STORE_KEYS.CONTACTS) || []), [])

  // get profile data
  useEffect(() => {
    if (address && orbitDB) {
      orbitDB.open(address).then(async db => {
        await db.load()

        const avatar = db.get('avatar')
        const userName = db.get('userName')
        const displayName = db.get('displayName')

        db.events.on('replicated', address => {
          console.log({ replicated: address })
        })

        db.events.on('peer', peer => {
          console.log({ peer })

          console.log(db.get('userName'))
        })

        if (avatar || userName || displayName) {
          setProfile({
            avatar: db.get('avatar'),
            userName: db.get('userName'),
            displayName: db.get('displayName')
          })
        }
      })
    }
  }, [address])

  return profile ? (
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

      {contacts.includes(address) ? (
        <RemoveButton style={buttonStyle} onClick={() => {}} />
      ) : (
        <AddButton
          style={buttonStyle}
          onClick={() => {
            setContacts([address].concat(contacts))
            store.set(STORE_KEYS.CONTACTS, contacts)
          }}
        />
      )}
    </div>
  ) : (
    <Loader />
  )
}