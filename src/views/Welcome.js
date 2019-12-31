import { useEffect, useContext, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import store from 'store'
import DotLoader from 'react-spinners/DotLoader'

import { client as apolloClient } from '../common/apollo'
import { toDataURL } from '../common/utils'
import { IpfsContext, ViewContext } from '../components'
import { VIEWS, STORE_KEYS } from '../common/enums'

const ME_PROFILE = gql`
  query MeProfile {
    viewer {
      userName
      displayName
      avatar
    }
  }
`

export const Welcome = () => {
  const [loadingText, setLoadingText] = useState(
    'Synchronizing with mattters.news'
  )

  const { loading, error, data } = useQuery(ME_PROFILE)
  const { orbitDB, ipfs } = useContext(IpfsContext)
  const { setView } = useContext(ViewContext)

  useEffect(() => {
    if (!store.get(STORE_KEYS.PEER_ID) && data && orbitDB) {
      const {
        viewer: { avatar, displayName, userName }
      } = data

      setLoadingText(`Setting up profile for ${userName}`)

      toDataURL(avatar).then(async avatarDataUrl => {
        // save peer id locally
        const peerID = ipfs.libp2p.peerInfo.id.toJSON()
        store.set(STORE_KEYS.PEER_ID, peerID)

        // save user profile locally
        const db = await orbitDB.keyvalue('me', {
          // Give write access to ourselves
          accessController: {
            write: [orbitDB.identity.id]
          }
        })

        await db.put('displayName', displayName, { pin: true })
        await db.put('userName', userName, { pin: true })
        await db.put('avatar', avatarDataUrl, { pin: true })
        await db.put('id', peerID.id, { pin: true })
        store.set(STORE_KEYS.ME, db.address.toString())
      })
    }

    setView(VIEWS.MESSAGES)
  })

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50,
        height: 100,
        justifyContent: 'space-between'
      }}
    >
      <span style={{ color: 'grey' }}>{loadingText}</span>
      <DotLoader size={40} />
    </section>
  )
}
