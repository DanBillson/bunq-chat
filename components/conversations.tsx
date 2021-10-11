import { useConversation } from '../utils/hooks'

export const Conversations = () => {
  const { data } = useConversation()

  if (!data?.data || data.data.length === 0) return null

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
