import { getUsers, User } from '../utils/api'
import { GetServerSidePropsContext } from 'next'
import { Profile } from '../components/profile'
import styled from 'styled-components'
import { useAuth } from '../context/auth'
import { Conversations } from '../components/conversations'

interface HomeProps {
  users: User[]
}

export default function Home({ users }: HomeProps) {
  const [user, setUser] = useAuth()

  if (!user)
    return (
      <LoginModal>
        <h3>Who would you like to login as?</h3>
        <Box>
          {users.map((user) => (
            <Profile key={user.id} {...user} onClick={(u) => setUser(u)} />
          ))}
        </Box>
      </LoginModal>
    )

  return (
    <Wrapper>
      <div>
        <Conversations />
        <Box>
          {users.map((user) => (
            <Profile
              key={user.id}
              {...user}
              onClick={(id) => console.log(id)}
            />
          ))}
        </Box>
      </div>
      <div>Messages</div>
    </Wrapper>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: usersData } = await getUsers()

  const users = usersData.data.sort((a, b) => a.id - b.id)

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
  width: 100%;
  max-width: 1200px;
`

const LoginModal = styled.div`
  margin: 2rem auto;
  max-width: 450px;
`

const Box = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.bg};
`
