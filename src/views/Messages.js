import store from 'store'
import { useContext } from 'react'

import { STORE_KEYS } from '../common/enums'
import { Header, IpfsContext } from '../components'

export const Messages = () => {
  const { orbitDB } = useContext(IpfsContext)
  return <section>hi</section>
}
