import React, { createContext, useState } from 'react'

import { VIEWS } from '../../common/enums'

export const viewContext = createContext({
  view: VIEWS.WELCOME,
  setView: view => {},
})

export const viewConsumer = viewContext.Consumer

export const viewProvider = ({ children }) => {
  const [view, setView] = useState(VIEWS.WELCOME)

  return (
    <viewContext.Provider value={{ view, setView }}>
      {children}
    </viewContext.Provider>
  )
}
