import store from 'store'
import { useContext, useState, useEffect } from 'react'

import { STORE_KEYS, VIEWS } from '../common/enums'
import { Header, IpfsContext } from '../components'

const styles = {
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10
  }
}

export const Me = () => {
  const { orbitDB, ipfs } = useContext(IpfsContext)
  const [peerCount, setPeerCount] = useState()

  // poll peer number
  useEffect(() => {
    const pollId = setInterval(
      () => ipfs.swarm.peers().then(peers => setPeerCount(peers.length)),
      3 * 1000
    )

    // cleanup
    return () => clearInterval(pollId)
  }, [])

  return (
    <>
      <section style={styles.section}>
        <span>connected peers</span>
        <pre>{peerCount}</pre>
      </section>
      <section style={styles.section}>
        <span>profile</span>
        <pre style={{ overflow: 'scroll', width: 220 }}>
          {store.get(STORE_KEYS.ME)}
        </pre>
      </section>
    </>
  )
}
