import { useAuth } from '../context/auth'
import { useQuery } from 'react-query'
import { CreateConversationResponse } from './api'

export const useConversation = () => {
  const [user] = useAuth()
  return useQuery<CreateConversationResponse>(`/user/${user}/conversation`)
}
