import React from 'react'
import {Container,ModalContent,CloseButton} from './Modal.style'
const Modal = ({closed,closeModal,modalContent}) => {
  return (
    <Container closed={closed}>
      <ModalContent >
        <CloseButton onClick={()=>closeModal()} >&times;</CloseButton>
         {modalContent}
      </ModalContent> 
    </Container>
  )
}
export default Modal
