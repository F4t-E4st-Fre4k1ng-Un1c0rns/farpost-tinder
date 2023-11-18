import { createContext } from 'react'

interface LoginState {
  loggedIn: boolean
  userId: number
}

export const loginContext = createContext<LoginState>({ 
  loggedIn: false,
  userId: 0
})
