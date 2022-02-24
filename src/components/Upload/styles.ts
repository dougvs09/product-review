import { styled } from '../../../stitches.config';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '20px',
  padding: '0 20px',

  '> span': {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',

    fontFamily: '$sansSerif',
    fontWeight: '$semiBold',
    fontSize: '$2',
    color: '$purple200',
  },
});

export const Drop = styled('div', {
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',

  width: '400px',
  height: '100px',

  border: '2px $purple200 dashed',
  borderRadius: '10px',

  variants: {
    isDragReject: {
      true: {
        borderColor: '$red100',
        cursor: 'not-allowed',
      },
    },
    isDragAccept: {
      true: {
        borderColor: '$green100',
      },
    },
  },
});

export const DropMessage = styled('span', {
  fontSize: '$2',
  fontWeight: '$medium',
  color: '$purple200',

  variants: {
    isDragReject: {
      true: {
        color: '$red100',
      },
    },
    isDragAccept: {
      true: {
        color: '$green100',
      },
    },
  },
});

export const PicturePreview = styled('div', {
  maxWidth: '400px',
  height: '400px',

  span: {
    borderRadius: '8px',
  },
});
