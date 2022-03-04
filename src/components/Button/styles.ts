import { shade } from 'polished';

import { styled } from '../../../stitches.config';

export const ButtonComponent = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  border: 'none',
  outline: 'none',
  borderRadius: '8px',
  padding: '10px',

  variants: {
    color: {
      purple: {
        background: '$purple100',
        color: '$black300',

        transition: '0.3s',

        '&:hover': {
          background: shade(0.1, '#9D4EDD'),
        },
      },
      red: {
        background: '$red100',
        color: '$white100',

        transition: '0.3s',

        '&:hover': {
          background: shade(0.1, '#ff0000'),
        },
      },
      green: {
        background: '$green100',
        color: '$white100',

        transition: '0.3s',

        '&:hover': {
          background: shade(0.1, '#00a400'),
        },
      },
      white: {
        background: '$white100',
        color: '$black100',

        transition: '0.3s',

        '&:hover': {
          color: shade(0.1, '#9D4EDD'),
        },
      },
      salmon: {
        background: '#EA4335',
        color: '$white100',

        transition: '0.3s',

        '&:hover': {
          background: shade(0.1, '#EA4335'),
        },
      },
      black: {
        background: '$black100',
        color: '$white100',

        transition: '0.3s',

        '&:hover': {
          background: shade(0.1, '#000'),
        },
      },
    },
    size: {
      xsm: {
        width: '80px',
      },
      sm: {
        width: '100px',
      },
      md: {
        width: '200px',
      },
      lg: {
        width: '300px',
      },
      all: {
        width: '100%',
      },
    },
    loading: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});
