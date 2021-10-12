import styled from 'styled-components'
import { useAuth } from '../context/auth'
import { Message as MessageType } from '../utils/api'

interface MessageProps {
  message: MessageType
}

export const Message = ({ message }: MessageProps) => {
  const [user] = useAuth()
  const { user_id, text } = message

  const isSelf = user === String(user_id)

  return <Bubble self={isSelf}>{text}</Bubble>
}

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
