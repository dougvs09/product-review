import { globalCss } from '../../stitches.config';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  'body, html, #__next': {
    height: '100%',
    width: '100%',
    fontFamily: '$sansSerif',
  },

  'ul, ol, li': {
    listStyle: 'none',
  },

  a: {
    textDecoration: 'none',
  },

  button: {
    margin: 0,
    outline: 'none',
    cursor: 'pointer',
  },

  img: {
    objectFit: 'cover',
  },
});
