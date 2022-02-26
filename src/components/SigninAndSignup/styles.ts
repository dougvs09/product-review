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

  h1: {
    padding: '25px 0 10px 0',

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

export const ProviderButton = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const Form = styled('form', {
  position: 'relative',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
});

export const Input = styled('input', {
  width: '100%',
  padding: '10px 8px',
  border: '0',
  outline: 'none',
  borderRadius: '8px',

  fontFamily: '$sansSerif',
  fontSize: '$2',
  fontWeight: 'semiBold',
});

export const ViewPassword = styled('button', {
  position: 'absolute',
  background: 'transparent',
  outline: 'none',
  border: '0',
  top: '59px',
  right: '15px',

  '& svg': {
    height: '20px',
    width: '20px',
  },
});
