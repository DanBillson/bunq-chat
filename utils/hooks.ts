import { useMutation, useQuery } from 'react-query'
import { useAuth } from '../context/auth'
import { Conversation, createConversation, Res } from './api'

export const useConversations = () => {
  const [user] = useAuth()
  return useQuery<Res<Conversation[]>>(`/user/${user}/conversation`)
}

export type NewConversationArgs = {
  invitees: number[]
  groupName?: string
}

export const useCreateConversation = () => {
  const [user] = useAuth()

  const mutation = useMutation(({ invitees, groupName }: NewConversationArgs) =>
    createConversation(user, invitees, groupName)
  )

  return mutation
}
