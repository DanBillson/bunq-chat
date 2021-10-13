import styled from 'styled-components'

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  children: JSX.Element[] | JSX.Element | string
}

export const Modal = ({ isOpen, onDismiss, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <Container onClick={() => onDismiss()}>
      <Dialog onClick={(e) => e.stopPropagation()}>{children}</Dialog>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000020;
  z-index: 100;
`

const Dialog = styled.div`
  position: relative;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.bg};
`
