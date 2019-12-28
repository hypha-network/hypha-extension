import { useEffect, useContext, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import fetch from 'unfetch'
import store from 'store'

import { client as apolloClient } from '../common/apollo'
import { Spinner, IpfsContext, ViewContext } from '../components'
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

const convertBlobToBase64 = blob =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })

export const Welcome = () => {
  const [loadingText, setLoadingText] = useState(
    'Synchronizing with mattters.news'
  )
  const { loading, error, data } = useQuery(ME_PROFILE)
  const { orbitDB, ipfs } = useContext(IpfsContext)
  const { setView } = useContext(ViewContext)

  useEffect(() => {
    if (data && orbitDB) {
      const {
        viewer: { avatar, displayName, userName }
      } = data

      setLoadingText(`Setting up profile for ${userName}`)

      fetch(avatar).then(async data => {
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
        const avatarBlob = await data.blob()
        const avatarBase64 = await convertBlobToBase64(avatarBlob)

        db.put('displayName', displayName, { pin: true })
        db.put('userName', userName, { pin: true })
        db.put('avatar', avatarBase64, { pin: true })
        db.put('id', peerID.id, { pin: true })
        store.set(STORE_KEYS.ME, db.address.toString())

        setView(VIEWS.MESSAGES)
      })
    }
  })

  return (
    <article>
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
        <Spinner />
      </section>
    </article>
  )
}
