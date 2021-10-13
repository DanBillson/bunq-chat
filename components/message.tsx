import styled from 'styled-components'
import { useAuth } from '../context/auth'
import { useChat } from '../context/chat'
import { Message as MessageType } from '../utils/api'

interface MessageProps {
  message: MessageType
}

export const Message = ({ message }: MessageProps) => {
  const [user] = useAuth()
  const { chat } = useChat()
  const { user_id, text } = message

  const isSelf = user === String(user_id)

  if (chat.members.length <= 2) return <Bubble self={isSelf}>{text}</Bubble>

  const { name } = chat.members.find(({ id }: any) => id === message.user_id)

  return (
    <div>
      {!isSelf ? <SentFrom>{name}</SentFrom> : null}
      <Bubble self={isSelf}>{text}</Bubble>
    </div>
  )
}

const SentFrom = styled.span`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.75rem;
`

const Bubble = styled.div<{ self: boolean }>`
  display: flex;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-left: ${({ self }) => (self ? 'auto' : 0)};
  margin-right: ${({ self }) => (!self ? 'auto' : 0)};
  width: fit-content;
  color: ${({ theme, self }) => (self ? theme.colors.bg : theme.colors.fg)};
  background-color: ${({ theme, self }) =>
    self ? theme.colors.secondary : theme.colors.neutral};
  border-radius: 1rem;
  border-top-left-radius: ${({ self }) => (self ? '1rem' : 0)};
  border-top-right-radius: ${({ self }) => (!self ? '1rem' : 0)};
`
