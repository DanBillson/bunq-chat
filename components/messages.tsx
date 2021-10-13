import { compareAsc } from 'date-fns'
import { useForm } from 'react-hook-form'
import { GrSend } from 'react-icons/gr'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useIsomorphicLayoutEffect } from 'react-use'
import styled from 'styled-components'
import { useAuth } from '../context/auth'
import { useChat } from '../context/chat'
import { bunq, Message as MessageType, User } from '../utils/api'
import { useConversations } from '../utils/hooks'
import { Box } from './box'
import { InfoBar } from './infoBar'
import { Message } from './message'

interface MessagesProps {
  users: User[]
}

export const Messages = ({ users }: MessagesProps) => {
  const queryClient = useQueryClient()
  const [user] = useAuth()
  const { register, handleSubmit, reset } = useForm()
  const { data: conversations } = useConversations()
  const { chat, setChat } = useChat()

  const { id: chatId, chatName } = chat || {}

  useIsomorphicLayoutEffect(() => {
    if (!chatName && conversations && conversations.data.length >= 1) {
      const [conversation] = conversations.data
      setChat(conversation)
    }
  }, [])

  const messagesQueryKey = `/user/${user}/conversation/${chatId}/message`

  const { data: messages } = useQuery<{ data: MessageType[] }>(
    messagesQueryKey,
    { enabled: Boolean(user) && Boolean(chatId) }
  )

  const { mutate: sendMessage } = useMutation(
    (text) => bunq.post(messagesQueryKey, { text }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(messagesQueryKey)
      },
    }
  )

  if (!chatName)
    return (
      <Wrapper>
        <InfoBar chatName={null} users={users} />
      </Wrapper>
    )

  const onSubmit = ({ text }: any) => {
    if (!text.trim()) return
    sendMessage(text)
    reset()
  }

  return (
    <Wrapper>
      <InfoBar chatName={chatName} users={users} />
      <Box>
        <Container>
          <MessageList>
            {!messages ? null : messages.data.length === 0 ? (
              <NoMessages>
                No messages have been sent to {chatName}, why not say <b>Hi</b>?
              </NoMessages>
            ) : (
              messages.data
                .sort((a, b) =>
                  compareAsc(new Date(a.sent_at), new Date(b.sent_at))
                )
                .map((message) => (
                  <Message key={message.id} message={message} />
                ))
            )}
          </MessageList>
          <MessageBar onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" {...register('text')} />
            <Button type="submit">
              <Icon />
            </Button>
          </MessageBar>
        </Container>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${Box} {
    height: 100%;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  height: 100%;
  box-sizing: border-box;
`

const NoMessages = styled.p`
  margin-left: 0.5rem;
`

const MessageList = styled.div`
  padding: 1rem 0;
  overflow-y: auto;
`

const MessageBar = styled.form`
  display: grid;
  grid-template-columns: 1fr 3rem;
  grid-gap: 1rem;
`

const Input = styled.input`
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.neutral};
  height: 3rem;
  box-sizing: border-box;
`

const Button = styled.button`
  display: grid;
  place-items: center;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.bg};
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  border: none;
`

const Icon = styled(GrSend)`
  path {
    stroke: ${({ theme }) => theme.colors.bg};
  }
`
