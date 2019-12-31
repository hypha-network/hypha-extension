import React, { createContext, useState } from 'react'

import { VIEWS } from '../../common/enums'

export const ViewContext = createContext({
  view: VIEWS.WELCOME,
  address: '',
  setView: view => {},
  setAddress: address => {}
})

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState(VIEWS.WELCOME)
  const [address, setAddress] = useState('')

  return (
    <ViewContext.Provider value={{ view, setView, address, setAddress }}>
      {children}
    </ViewContext.Provider>
  )
}
