import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Conversations } from '../components/conversations'
import { Messages } from '../components/messages'
import { Users } from '../components/users'
import { useAuth } from '../context/auth'
import { ChatProvider } from '../context/chat'
import { getUsers, User } from '../utils/api'

interface HomeProps {
  users: User[]
}

export default function Home({ users }: HomeProps) {
  const [, setUser] = useAuth()
  const router = useRouter()

  return (
    <>
      <Header>
        <Logo>Bunq Chat</Logo>
        <Logout
          onClick={() => {
            setUser(null)
            router.push('/')
          }}
        >
          Logout
        </Logout>
      </Header>
      <ChatProvider>
        <Wrapper>
          <Sidebar>
            <div>
              <Label>Conversations</Label>
              <Conversations />
            </div>
            <div>
              <Label>Users</Label>
              <Users users={users} />
            </div>
          </Sidebar>
          <Messages users={users} />
        </Wrapper>
      </ChatProvider>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userId = context.req.cookies['bunq-chat-user']

  if (!userId) {
    return {
      redirect: '/',
      permanent: false,
    }
  }

  const { data: usersData } = await getUsers()

  const users = usersData.data
    .filter(({ id }) => String(id) !== userId)
    .sort((a, b) => a.id - b.id)

  return {
    props: { users },
  }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-gap: 2rem;
  margin: 2rem auto;
  padding: 0 2rem;
  height: calc(100vh - 50px - 4rem);
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
`

const Sidebar = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 2rem;
  height: 100%;
  overflow-y: auto;
`

const Label = styled.p`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75rem;
  font-weight: 700;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 1rem;
  max-width: 1200px;
`

const Logo = styled.span`
  font-weight: 700;
`

const Logout = styled.span`
  transition: 0.23s ease-in-out color;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`
