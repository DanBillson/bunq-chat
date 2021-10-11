import styled from 'styled-components'
import { useAuth } from '../context/auth'

export const Header = () => {
  const [user, setUser] = useAuth()

  if (!user)
    return (
      <Welcome>
        <h1>Welcome to Bunq Chat</h1>
      </Welcome>
    )

  return (
    <Wrapper>
      <Logo>Bunq Chat</Logo>
      <Logout onClick={() => setUser(null)}>Logout</Logout>
    </Wrapper>
  )
}

const Welcome = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
`

const Wrapper = styled.header`
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
