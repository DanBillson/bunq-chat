import { FormEvent, useState } from 'react'
import { IoArrowForward, IoClose } from 'react-icons/io5'
import styled from 'styled-components'
import { useChat } from '../context/chat'
import { User } from '../utils/api'
import { useConversations } from '../utils/hooks'
import { Modal } from './modal'
import { Profile } from './profile'

interface InfoBarProps {
  chatName: string | null
  users: User[]
}

export const InfoBar = ({ chatName, users }: InfoBarProps) => {
  const [showModal, setShowModal] = useState(false)
  const [userList, setUserList] = useState<User[]>([])
  const [groupName, setGroupName] = useState('')
  const [error, setError] = useState('')
  const { createConversation, setChat } = useChat()
  const { data: conversations } = useConversations()

  const userIds = userList.map(({ id }) => id)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (userIds.length === 0) return

    if (userIds.length === 1) {
      const [userId] = userIds
      const currentConversation = conversations?.data.find(
        ({ members }) =>
          members.length === 2 && members.some(({ id }) => userId === id)
      )
      if (!currentConversation) {
        createConversation({ invitees: [userId] })
        setShowModal(false)
        return
      }

      setChat(currentConversation)
      setShowModal(false)
      return
    }

    if (!groupName) {
      setError('Remember to give your group a name')
      return
    }

    createConversation({ invitees: userIds, groupName })
    setShowModal(false)
  }

  return (
    <>
      <Wrapper>
        <p>
          {chatName
            ? `You are chatting with ${chatName}`
            : 'Create a new conversation'}
        </p>
        <IconButton onClick={() => setShowModal(true)}>+</IconButton>
      </Wrapper>
      <Modal isOpen={showModal} onDismiss={() => setShowModal(false)}>
        <CreateChatModal>
          <ModalMeta>
            <h4>Create new conversation</h4>
            {userList.length >= 2 ? (
              <Form onSubmit={handleSubmit}>
                <label htmlFor="groupName">
                  What do you want to call this group?
                </label>
                <InputWrapper>
                  <Input
                    type="text"
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                  <IconButton>
                    <IoArrowForward />
                  </IconButton>
                </InputWrapper>
                {error ? <Error>{error}</Error> : null}
              </Form>
            ) : null}
            {userList.length === 0 ? (
              <p>Click on a user to add them to the group</p>
            ) : (
              <UserList>
                {userList.map((user) => (
                  <UserButton
                    key={user.id}
                    onClick={() =>
                      setUserList((l) => l.filter(({ id }) => id !== user.id))
                    }
                  >
                    {user.name} <IoClose />
                  </UserButton>
                ))}
              </UserList>
            )}
          </ModalMeta>
          <UserSelect>
            {users
              .filter(({ id }) => !userIds.includes(id))
              .map((user) => (
                <Profile
                  key={user.id}
                  {...user}
                  onClick={() => setUserList((l) => [...l, user])}
                />
              ))}
          </UserSelect>
        </CreateChatModal>
      </Modal>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CreateChatModal = styled.div`
  width: 600px;
`

const ModalMeta = styled.div`
  margin: 0 1rem;
`

const UserSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const UserList = styled.div`
  display: flex;
  margin-bottom: 2rem;
`

const UserButton = styled.span`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.4rem 0.25rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.bg};
    margin-left: 0.25rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`

const IconButton = styled.button`
  display: grid;
  place-items: center;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.bg};
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  border: none;
`

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  grid-gap: 1rem;

  ${IconButton} {
    height: 3rem;
    width: 3rem;
  }
`

const Input = styled.input`
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.neutral};
  height: 3rem;
  box-sizing: border-box;
`

const Error = styled.span`
  padding: 0.25rem 0.5rem;
  margin: 0.25rem 0;
  width: fit-content;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.bg};
  background-color: ${({ theme }) => theme.colors.tertiary};
  cursor: pointer;
`
