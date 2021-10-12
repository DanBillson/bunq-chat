import { useConversation } from '../utils/hooks'

export const Conversations = () => {
  const { data } = useConversation()

  if (!data?.data) return null

  if (data.data.length === 0)
    return (
      <p>
        You don't have any conversations yet, click on a user to start a
        conversation
      </p>
    )

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
