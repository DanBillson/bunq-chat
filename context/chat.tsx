import { createContext, useContext, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useCreateConversation, NewConversationArgs } from '../utils/hooks'
import { useAuth } from './auth'

interface ChatState {
  id: number
  name: string | null
  members: {
    id: number
    name: string
    last_seen_at: string
  }[]
}

const ChatContext = createContext<any>(null)

export const ChatProvider = (props: any) => {
  const [user] = useAuth()
  const queryClient = useQueryClient()
  const [currentChat, setCurrentChat] = useState<ChatState | null>(null)
  const { mutate: createConversationMutate } = useCreateConversation()

  const { name, members } = currentChat || {}
  const chatName =
    name || members?.filter(({ id }: any) => String(id) !== user)[0].name || ''

  const createConversation = ({ invitees, groupName }: NewConversationArgs) => {
    createConversationMutate(
      { invitees, groupName },
      {
        onSuccess: ({ data }: any) => {
          setCurrentChat(data.data)
          queryClient.invalidateQueries(`/user/${user}/conversation`)
        },
      }
    )
  }

  const value = {
    chat: { ...currentChat, chatName },
    setChat: setCurrentChat,
    createConversation,
  }

  return <ChatContext.Provider {...props} value={value} />
}

export const useChat = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error('useChat must be used with the ChatProvider')
  }

  return context
}
