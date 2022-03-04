import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { shade } from 'polished';

import { styled, keyframes } from '../../../stitches.config';

const showContent = keyframes({
  '0%': { opacity: 0, transform: 'translate3d(0px, -5px, 0)' },
  '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
});

export const Container = styled('header', {
  width: '100%',
  background: '$white100',
  borderBottom: '1px solid $white300',
});

export const HeaderWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '15px 20px',
});

export const UserWrapper = styled('nav', {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

export const Logo = styled('a', {
  display: 'flex',
  alignItems: 'flex-end',
  color: '$purple100',
  background: 'transparent',

  cursor: 'pointer',

  span: {
    '&:nth-child(1)': {
      fontWeight: 'bold',
      fontSize: '$5',
    },

    '&:nth-child(2)': {
      fontWeight: 'bold',
      fontSize: '$3',
    },
  },
});

export const DropdownMenuButton = styled('button', {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '0',
  outline: 'none',

  img: {
    borderRadius: '50%',
    objectFit: 'cover',
  },
});

export const DropdownMenuContent = styled(DropdownMenuPrimitive.Content, {
  width: '230px',
  padding: '10px 5px',
  borderRadius: '8px',
  background: '$purple100',

  animation: `${showContent} .3s forwards`,
});

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, {
  padding: '5px',

  borderRadius: '3px',
  border: '0',
  outline: 'none',

  cursor: 'pointer',

  '&:focus': {
    background: '$white100',
  },

  a: {
    fontSize: '$1',
    fontWeight: '$medium',
    color: '$black300',
  },

  button: {
    outline: 'none',
    border: '0',
    background: 'transparent',
    fontSize: '$1',
    fontWeight: '$medium',
    color: '$black300',
  },
});

export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator, {
  height: '1px',
  background: '$purple200',
  margin: '5px',
});

export const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: '$purple100',
});

export const ReviewLink = styled('a', {
  color: '$purple100',
  fontFamily: '$sansSerif',
  fontSize: '$2',
  fontWeight: '$semiBold',

  '&:hover': {
    color: shade(0.1, '#9D4EDD'),
  },
});
