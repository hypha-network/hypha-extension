import IPFS from 'ipfs'
import PeerID from 'peer-id'
import store from 'store'

import { STORE_KEYS } from './enums'

export const createIpfsNode = async () => {
  try {
    const protocalName = '/chat/1.0.0'

    const peerId = store.get(STORE_KEYS.PEER_ID)

    // let peerID
    // if (peerIdJSON) {
    //   peerID = await PeerID.createFromJSON(peerIdJSON)
    //   console.log({ peerID })
    // }

    const ipfs = await IPFS.create({
      libp2p: {
        config: {
          dht: {
            enabled: true
          }
        }
      },
      init: peerId
        ? {
            privateKey: peerId.privKey
          }
        : true
    })

    // message protocol
    ipfs.libp2p.handle(protocalName, (protocol, connection) => {
      pull(
        connection,
        pull.collect((err, data) => {
          if (err) {
            throw err
          }

          const message = JSON.parse(data.toString())
          setDialog(dialog => dialog.concat([message]))

          // temperally set repose target for now
          // setRemotePeerId(message.from)
        })
      )
    })
    // const orbitDB = await OrbitDB.createInstance(ipfsNode)
    return ipfs
  } catch (error) {
    throw error
  }
}
