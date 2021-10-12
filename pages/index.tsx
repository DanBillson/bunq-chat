import { GetServerSidePropsContext } from 'next'
import styled from 'styled-components'
import { Login } from '../components/login'
import { getUsers, User } from '../utils/api'

interface HomeProps {
  users: User[]
}

export default function Home({ users }: HomeProps) {
  return (
    <>
      <Welcome>
        <h1>Welcome to Bunq Chat</h1>
      </Welcome>
      <Login users={users} />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data: usersData } = await getUsers()

  const users = usersData.data.sort((a, b) => a.id - b.id)

  return {
    props: { users },
  }
}

const Welcome = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
`
