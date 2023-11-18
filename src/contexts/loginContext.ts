import { createContext } from 'react'

interface LoginState {
  loggedIn: boolean
  user: User | undefined
}

export const loginContext = createContext<LoginState>({ 
  loggedIn: false,
  user: undefined
})
