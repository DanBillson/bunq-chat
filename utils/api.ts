import axios from 'axios'

export const bunq = axios.create({ baseURL: 'https://assignment.bunq.com/api' })

bunq.defaults.headers = {
  AUTHORIZATION: `Bearer ${process.env.NEXT_PUBLIC_BUNQ_API_TOKEN}`,
}
