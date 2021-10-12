import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useAuth } from '../context/auth'
import { User } from '../utils/api'
import { Box } from './box'
import { Profile } from './profile'

interface LoginProps {
  users: User[]
}

export const Login = ({ users }: LoginProps) => {
  const [, setUser] = useAuth()
  const router = useRouter()

  return (
    <LoginModal>
      <h3>Who would you like to login as?</h3>
      <Box>
        {users.map((user) => (
          <Profile
            key={user.id}
            {...user}
            onClick={(id) => {
              setUser(id)
              router.push('/chat')
            }}
          />
        ))}
      </Box>
    </LoginModal>
  )
}

const LoginModal = styled.div`
  margin: 2rem auto;
  max-width: 450px;
`
