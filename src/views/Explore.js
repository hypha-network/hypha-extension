import { useContext } from 'react'

import { Profile, ViewContext } from '../components'

export const Explore = () => {
  const { address } = useContext(ViewContext)

  // console.log({ address, profile })
  return address ? <Profile address={address} /> : null
}
