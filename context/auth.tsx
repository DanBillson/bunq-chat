import { createContext, useContext } from 'react'
import { useCookie } from 'react-use'

const AuthContext = createContext<any>(null)

export const AuthProvider = (props: any) => {
  const [cookieValue, setCookieValue, deleteCookie] =
    useCookie('bunq-chat-user')

  const setValue = (value: number | null) => {
    if (value === null) {
      deleteCookie()
      return
    }

    setCookieValue(String(value))
  }

  const value = [cookieValue, setValue]

  return <AuthContext.Provider {...props} value={value} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used with the AuthProvider')
  }

  return context
}
