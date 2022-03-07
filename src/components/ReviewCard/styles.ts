import { keyframes, styled } from '../../../stitches.config';

const showName = keyframes({
  '0%': {
    opacity: '0',
    transform: 'translate3d(0, 10px, 0)',
  },
  '100%': {
    opacity: '1',
    transform: 'translate3d(0, 0, 0)',
  },
});

export const Card = styled('article', {
  maxWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
});

export const CardImage = styled('a', {
  position: 'relative',
  width: '100%',
  height: '250px',

  cursor: 'pointer',

  img: {
    borderRadius: '8px',
  },
});

export const ReviewName = styled('div', {
  position: 'absolute',
  bottom: '0px',
  zIndex: '1000',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100px',

  background: 'rgba(0,0,0,0.6)',
  borderRadius: '8px',

  animation: `${showName} 0.3s ease-in`,

  variants: {
    showTitle: {
      true: {
        display: 'flex',
      },
    },
  },

  h1: {
    color: '$white100',
    fontSize: '$2',
    fontWeight: '$semiBold',
  },
});

export const CardFooter = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',
  padding: '0 10px',

  h1: {
    fontSize: '$2',
    fontWeight: '$semiBold',
    color: '$purple200',
  },

  span: {
    fontSize: '$1',
    fontWeight: '$medium',
    color: '$black300',

    '&:nth-child(2)': {
      justifySelf: 'end',
      gridRow: '1',
      gridColumn: '2',
    },

    '&:nth-child(3)': {
      justifySelf: 'end',
      gridRow: '2',
      gridColumn: '2',
    },
  },
});
