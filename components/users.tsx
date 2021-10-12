import { User } from '../utils/api'
import { Box } from './box'
import { Profile } from './profile'

interface UsersProps {
  users: User[]
}

export const Users = ({ users }: UsersProps) => {
  return (
    <Box>
      {users.map((user) => (
        <Profile key={user.id} {...user} onClick={(id) => console.log(id)} />
      ))}
    </Box>
  )
}
