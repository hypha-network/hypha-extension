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
  },
  pre: {
    overflow: 'scroll',
    width: 220
  }
}

export const Me = () => {
  const { orbitDB, ipfs } = useContext(IpfsContext)
  const [peerCount, setPeerCount] = useState()
  const [localAddrs, setLocalAddrs] = useState()

  // poll peer number
  useEffect(() => {
    const pollId = setInterval(
      () => ipfs.swarm.peers().then(peers => setPeerCount(peers.length)),
      3 * 1000
    )

    // cleanup
    return () => clearInterval(pollId)
  }, [])

  useEffect(() => {
    ipfs.swarm.localAddrs().then(addrs => {
      console.log({ addrs })
      setLocalAddrs(addrs)
    })
  }, [])

  return (
    <>
      <section style={styles.section}>
        <span>connected peers</span>
        <pre>{peerCount}</pre>
      </section>
      <section style={styles.section}>
        <span>profile</span>
        <pre style={styles.pre}>{store.get(STORE_KEYS.ME)}</pre>
      </section>
      <section style={styles.section}>
        <span>multiaddr</span>
        <pre style={styles.pre}>{localAddrs && localAddrs.toString()}</pre>
      </section>
    </>
  )
}
