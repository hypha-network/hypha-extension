import IPFS from 'ipfs'
import PeerID from 'peer-id'
import OrbitDB from 'orbit-db'
import { createContext, useState, useEffect } from 'react'
import store from 'store'

import { STORE_KEYS } from '../../common/enums'
import { createIpfsNode } from '../../common/utils'

const protocalName = '/chat/1.0.0'

export const IpfsContext = createContext({
  ipfs: null,
  orbitDB: null
})

export const IpfsProvider = ({ children }) => {
  const [ipfs, setIpfs] = useState(null)
  const [orbitDB, setOrbitDB] = useState(null)

  useEffect(() => {
    createIpfsNode().then(async ipfsNode => {
      setIpfs(ipfsNode)

      try {
        const orbitdbNode = await OrbitDB.createInstance(ipfsNode)
        setOrbitDB(orbitdbNode)
      } catch (error) {
        throw error
      }
    })
  }, [])

  return (
    <IpfsContext.Provider value={{ ipfs, orbitDB }}>
      {children}
    </IpfsContext.Provider>
  )
}
