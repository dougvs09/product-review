import { styled } from '../../../stitches.config';

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
