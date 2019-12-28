import React, { useEffect, useState, useContext } from 'react'
import PeerId from 'peer-id'
import pull from 'pull-stream'

import { IpfsContext } from '../Context'

export const ChatRoom = () => {
  const { ipfs } = useContext(IpfsContext)

  const [viewerId, setViewerId] = useState('')
  const [remotePeerId, setRemotePeerId] = useState('')
  const [remotePeerInfo, setRemotePeerInfo] = useState('')

  const [messageDraft, setMessageDraft] = useState('')
  const [dialog, setDialog] = useState([])

  // get viewer id, assign protocal
  useEffect(() => {
    if (ipfs) {
      ipfs.id().then(({ id }, err) => {
        if (err) {
          throw err
        }
        setViewerId(id)
      })
    }
  })

  // get address from id
  useEffect(() => {
    if (ipfs && remotePeerId) {
      const peerId = PeerId.createFromB58String(remotePeerId)
      ipfs.libp2p.peerRouting.findPeer(peerId).then((peerInfo, err) => {
        if (err) {
          throw err
        }
        setRemotePeerInfo(peerInfo)
      })
    }
  }, [remotePeerId])

  const handleSubmit = event => {
    if (ipfs && remotePeerInfo) {
      const message = { content: messageDraft, from: viewerId }
      ipfs.libp2p.dialProtocol(
        remotePeerInfo,
        protocalName,
        (err, connection) => {
          pull(pull.values([JSON.stringify(message)]), connection)
        }
      )
      setDialog(dialog => dialog.concat([message]))
    } else {
      console.error('connection not established', messageDraft)
    }
    event.preventDefault()
  }

  return (
    <section style={{ margin: 25 }}>
      <span style={{ margin: 10, fontSize: 12 }}>My id: {viewerId}</span>
      <form
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'baseline'
        }}
      >
        <input
          placeholder="peer id"
          value={remotePeerId}
          onChange={e => {
            setRemotePeerId(e.target.value)
          }}
          style={{ margin: 10 }}
        />
        <div
          style={{
            backgroundColor: remotePeerId
              ? remotePeerInfo
                ? 'green'
                : 'gray'
              : 'white',
            height: 10,
            width: 10,
            borderRadius: 10,
            margin: 5
          }}
        />
      </form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          margin: 10
        }}
      >
        {dialog.map(({ content, from }, index) => (
          <span
            key={index}
            style={{ textAlign: from === viewerId ? 'left' : 'right' }}
          >
            {content}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="message"
          value={messageDraft}
          onChange={e => {
            setMessageDraft(e.target.value)
          }}
          style={{ margin: 10, width: '60%' }}
        />
      </form>
    </section>
  )
}
