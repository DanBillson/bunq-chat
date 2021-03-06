import styled from 'styled-components'

interface ProfileProps {
  id: number
  name: string
  onClick: (id: number) => void
}

export const Profile: React.FC<ProfileProps> = ({
  id,
  name,
  onClick,
}: ProfileProps) => {
  const initial = name.slice(0, 1)

  return (
    <Wrapper onClick={() => onClick(id)}>
      <Icon initial={initial}>{initial}</Icon>
      {name}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.bg};
  transition: 0.23s ease-in-out background-color;
  cursor: pointer;

  &:first-of-type {
    padding-top: 0.75rem;
  }

  &:last-of-type {
    padding-bottom: 0.75rem;
  }

  &:hover {
    background-color: #d9dbe3;
  }
`

const getIconColor = ({ theme, initial }: any) => {
  const { primary, secondary, tertiary } = theme.colors
  const colors = [primary, secondary, tertiary]
  return colors[initial.charCodeAt() % 3]
}

const Icon = styled.div<{ initial: string }>`
  display: grid;
  place-items: center;
  margin-right: 1rem;
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.colors.bg};
  background-color: ${getIconColor};
  border-radius: 50%;
  font-weight: 700;
`
