import { styled, keyframes } from '../../../stitches.config';

const showModalContainer = keyframes({
  '0%': {
    opacity: '0',
  },
  '100%': {
    opacity: '1',
  },
});

const showModal = keyframes({
  '0%': {
    opacity: '0',
    transform: 'scale(0.7)',
  },
  '100%': {
    opacity: '1',
    transform: 'scale(1)',
  },
});

export const Container = styled('div', {
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '1000',
  width: '100%',
  height: '100%',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.7)',

  animation: `${showModalContainer} 0.3s forwards`,
});

export const ModalContainer = styled('div', {
  position: 'relative',
  zIndex: '1000',
  width: '550px',
  borderRadius: '8px',

  background: '$purple100',

  animation: `${showModal} 0.5s forwards`,

  variants: {
    size: {
      sm: {
        height: '200px',
      },
      md: {
        height: '350px',
      },
      lg: {
        height: '400px',
      },
      xlg: {
        height: '500px',
      },
    },
  },
});

export const CloseButton = styled('button', {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'transparent',
  border: 'none',

  '& svg': {
    width: '15px',
    height: '15px',
  },
});
