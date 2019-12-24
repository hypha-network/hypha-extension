import IPFS from 'ipfs'
import React, { createContext, useState, useEffect } from 'react'

export const ipfsContext = createContext({
  ipfsNode: null,
})

export const IpfsConsumer = ipfsContext.Consumer

export const IpfsProvider = ({ children }) => {
  const [ipfsNode, setIpfsNode] = useState(null)

  useEffect(() => {
    IPFS.create({
      libp2p: {
        config: {
          dht: {
            enabled: true,
          },
        },
      },
    }).then((node, error) => {
      if (error) {
        throw error
      }
      setIpfsNode(node)
    })
  }, [])

  return (
    <ipfsContext.Provider value={{ ipfsNode }}>{children}</ipfsContext.Provider>
  )
}
