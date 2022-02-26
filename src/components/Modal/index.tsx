import React, { ReactNode } from 'react';
import { MdClear } from 'react-icons/md';

import { VariantProps } from '@stitches/react';

import { CloseButton, Container, ModalContainer } from './styles';

type ModalTypes = VariantProps<typeof ModalContainer> & {
  onClick: () => void;
  children: ReactNode;
};

export const Modal: React.FC<ModalTypes> = ({
  onClick,
  children,
  ...props
}: ModalTypes) => (
  <Container>
    <ModalContainer {...props}>
      <CloseButton type="button" onClick={onClick}>
        <MdClear />
      </CloseButton>
      {children}
    </ModalContainer>
  </Container>
);
