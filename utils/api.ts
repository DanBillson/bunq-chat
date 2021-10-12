import axios from 'axios'

export const bunq = axios.create({ baseURL: 'https://assignment.bunq.com/api' })

bunq.defaults.headers = {
  AUTHORIZATION: `Bearer ${process.env.NEXT_PUBLIC_BUNQ_API_TOKEN}`,
}

export type Res<T> = {
  data: T
}

export type User = {
  id: number
  name: string
  last_seen_at: string
}

export const getUsers = () => bunq.get<Res<User[]>>('/user')

export const getUser = (userId: number) =>
  bunq.get<Res<User[]>>(`/user/${userId}`)

export type Conversation = {
  id: number
  name: string | null
  members: User[]
  last_message: string | null
}

export type CreateConversationRequest = {
  user_ids: number[]
  name?: string
}

export const createConversation = (
  userId: number,
  invitees: number[],
  groupName?: string
) =>
  bunq.post<CreateConversationRequest, Res<Conversation>>(
    `/user/${userId}/conversation`,
    {
      user_ids: invitees,
      ...(groupName ? { name: groupName } : {}),
    }
  )

export const getConversations = (userId: number) =>
  bunq.get<Res<Conversation[]>>(`/user/${userId}/conversation`)

export type Message = {
  id: number
  user_id: number
  text: string
  sent_at: string
}
