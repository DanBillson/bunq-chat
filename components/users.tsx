import { useChat } from '../context/chat'
import { User } from '../utils/api'
import { useConversations } from '../utils/hooks'
import { Box } from './box'
import { Profile } from './profile'

interface UsersProps {
  users: User[]
}

export const Users = ({ users }: UsersProps) => {
  const { createConversation, setChat } = useChat()
  const { data: conversations } = useConversations()

  return (
    <Box>
      {users.map((user) => (
        <Profile
          key={user.id}
          {...user}
          onClick={(id) => {
            // Check if user already has an ongoing conversation
            const currentConversation = conversations?.data.find(
              ({ members }) =>
                members.length === 2 &&
                members.some(({ id: userId }) => userId === id)
            )
            if (!currentConversation) {
              createConversation({ invitees: [id] })
              return
            }

            setChat(currentConversation)
          }}
        />
      ))}
    </Box>
  )
}
