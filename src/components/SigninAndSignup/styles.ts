import { Button } from '@components/Button';

import { styled } from '../../../stitches.config';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const ModalContainer = styled('div', {
  maxWidth: '300px',
  margin: '0 auto',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  padding: '20px 0',

  h1: {
    paddingBottom: '10px',

    fontSize: '$3',
    fontWeight: 'semiBold',
    color: '$white100',
  },

  span: {
    fontSize: '$1',
    fontWeight: 'semiBold',
    color: '$white100',
  },
});

export const Form = styled('form', {
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
});

export const InputGroup = styled('div', {
  width: '300px',

  display: 'flex',
  flexDirection: 'column',
  gap: '5px',

  position: 'relative',

  input: {
    maxWidth: '300px',
    padding: '10px 7px',
    borderRadius: '8px',
    border: '2px solid $purple100',
    outline: 'none',

    transition: '0.2s',

    fontFamily: '$sansSerif',
    fontWeight: '$medium',
    fontSize: '$2',

    '&:focus': {
      borderColor: '$purple200',
    },

    '&::placeholder': {
      color: '$gray100',
      fontSize: '$2',
      fontWeight: '$medium',
    },
  },
});

export const Errors = styled('span', {
  fontWeight: '$semiBold',
  fontSize: '$1',
  color: '$red100',
});

export const ButtonSignAndSignup = styled(Button, {
  fontFamily: '$sansSerif',
  fontWeight: '$semiBold',
  fontSize: '$1',
});

export const EnterButton = styled(Button, {
  fontFamily: '$sansSerif',
  fontWeight: '$medium',
  fontSize: '$2',
});

export const ProviderButton = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',

  fontFamily: '$sansSerif',
  fontWeight: '$medium',
  fontSize: '$2',
});
