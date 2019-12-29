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

export const toMimeType = extension => {
  const mapping = {
    jpe: 'image/jpeg',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp'
  }
  return mapping[extension] || 'text/plain'
}

export const toDataURL = url =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function() {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height

      canvas.getContext('2d').drawImage(this, 0, 0)

      // ... or get as Data URI
      resolve(canvas.toDataURL())
    }
    image.onerror = reject

    image.src = url
  })

// const extension = url.split('.').splice(-1)[0]
// const mimeType = toMimeType(extension)

// return new Promise((resolve, reject) => {
//   const xhr = new XMLHttpRequest()

//   xhr.onload = reject
//   xhr.onload = () => {
//     const reader = new FileReader()
//     reader.onerror = reject
//     reader.onload = () => {
//       resolve(reader.result)
//     }
//     reader.readAsDataURL(xhr.response)
//   }

//   xhr.open('GET', url)
//   xhr.responseType = 'blob'
//   xhr.overrideMimeType(`${mimeType}; charset=x-user-defined`)
//   xhr.send()
// })
