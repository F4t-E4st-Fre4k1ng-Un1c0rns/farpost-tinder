import { createContext } from 'react'

interface LoginState {
  loggedIn: boolean
  user: User | undefined
  authToken: string | undefined
  refreshToken: string | undefined
}

export const loginContext = createContext<LoginState>({ 
  loggedIn: false,
  user: undefined,
  authToken: undefined,
  refreshToken: undefined
})
