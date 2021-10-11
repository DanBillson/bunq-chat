import { createContext, useContext } from 'react'
import { useSessionStorage } from 'react-use'

const AuthContext = createContext<any>(null)

export const AuthProvider = (props: any) => {
  return (
    <AuthContext.Provider
      {...props}
      value={useSessionStorage('bunq-chat-user')}
    />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used with the AuthProvider')
  }

  return context
}
