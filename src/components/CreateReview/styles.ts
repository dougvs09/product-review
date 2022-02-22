import { shade } from 'polished';

import { keyframes, styled } from '../../../stitches.config';

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  maxWidth: '1000px',
  padding: '0 20px',
});

export const InputGroup = styled('div', {
  width: '400px',

  display: 'flex',
  flexDirection: 'column',
  gap: '5px',

  position: 'relative',

  input: {
    maxWidth: '400px',
    padding: '10px 5px',
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
    },
  },
});

export const SelectGroup = styled('div', {
  width: '400px',

  display: 'flex',
  flexDirection: 'column',
  gap: '5px',

  select: {
    maxWidth: '400px',
    padding: '10px 5px',
    borderRadius: '8px',
    border: '2px solid $purple100',
    outline: 'none',

    fontFamily: '$sansSerif',
    fontWeight: '$medium',
    fontSize: '$2',
  },

  option: {
    maxWidth: '400px',
    padding: '10px 5px',
    borderRadius: '8px',
    border: '2px solid $purple100',
    outline: 'none',

    fontFamily: '$sansSerif',
    fontWeight: '$medium',
    fontSize: '$2',
  },
});

export const TextareaGroup = styled('div', {
  width: '400px',

  display: 'flex',
  flexDirection: 'column',
  gap: '5px',

  position: 'relative',

  textarea: {
    maxWidth: '400px',
    height: '200px',
    resize: 'none',
    padding: '10px 23px 10px 5px',
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
    },
  },
});

export const Label = styled('label', {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',

  fontFamily: '$sansSerif',
  fontWeight: '$semiBold',
  fontSize: '$2',

  variants: {
    required: {
      true: {
        '&::after': {
          content: '*',
          color: '$red100',
        },
      },
    },
  },
});

export const Errors = styled('span', {
  fontWeight: '$semiBold',
  fontSize: '$1',
  color: '$red100',
});

export const Clear = styled('button', {
  display: 'flex',
  alignItems: 'center',

  width: '19px',
  height: '19px',
  paddingLeft: '3px',

  borderRadius: '50%',
  border: 'none',

  background: '$purple200',

  position: 'absolute',
  top: '36px',
  left: '366px',

  transition: '0.3s ease-in-out',

  '&:hover': {
    background: shade(0.2, '#5A189A'),
  },
});

export const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  border: 'none',
  outline: 'none',
  borderRadius: '8px',
  padding: '10px',

  fontFamily: '$sansSerif',
  fontWeight: '$medium',
  fontSize: '$2',

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
    },
    size: {
      100: {
        maxWidth: '100px',
      },
      200: {
        maxWidth: '200px',
      },
      300: {
        maxWidth: '300px',
      },
      all: {
        width: '100%',
      },
    },
  },
});

const spinn = keyframes({
  '0%': { transform: 'rotate(360deg)' },
});

export const Spinner = styled('div', {
  borderRadius: '50%',
  border: '3px solid rgba(0,0,0,0.1)',
  borderLeftColor: '$white100',
  width: '25px',
  height: '25px',
  animation: `${spinn} 0.5s linear infinite`,
});
