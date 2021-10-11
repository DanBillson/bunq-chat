import { useQuery } from 'react-query'

export default function Home() {
  const { data } = useQuery<string>('/ping')

  return <div>{data}</div>
}
