import React, { ReactNode } from 'react';
import { MdClear } from 'react-icons/md';

import { CloseButton, Container, ModalContainer } from './styles';

type ModalTypes = {
  onClick: () => void;
  children: ReactNode;
};

export const Modal: React.FC<ModalTypes> = ({
  onClick,
  children,
}: ModalTypes) => (
  <Container>
    <ModalContainer>
      <CloseButton type="button" onClick={onClick}>
        <MdClear />
      </CloseButton>
      {children}
    </ModalContainer>
  </Container>
);
