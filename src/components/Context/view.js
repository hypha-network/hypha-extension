import React, { createContext, useState } from 'react'

import { VIEWS } from '../../common/enums'

export const ViewContext = createContext({
  view: VIEWS.WELCOME,
  setView: view => {},
})

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState(VIEWS.WELCOME)

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  )
}
