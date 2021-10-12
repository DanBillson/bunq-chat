import { useAuth } from '../context/auth'
import { useChat } from '../context/chat'
import { useConversations } from '../utils/hooks'
import { Box } from './box'
import { Profile } from './profile'

export const Conversations = () => {
  const [user] = useAuth()
  const { setChat } = useChat()
  const { data } = useConversations()

  if (!data?.data) return null

  if (data.data.length === 0)
    return (
      <p>
        You don't have any conversations yet, click on a user to start a
        conversation
      </p>
    )

  return (
    <Box>
      {data.data.map(({ id, name, members }) => {
        const chatName =
          name || members.filter(({ id }) => String(id) !== user)[0].name

        return (
          <Profile
            key={id}
            id={id}
            name={chatName}
            onClick={() => setChat({ id, name, members, messages: [] })}
          />
        )
      })}
    </Box>
  )
}
