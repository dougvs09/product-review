import { createStitches } from '@stitches/react';

export const {
  config,
  createTheme,
  css,
  keyframes,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      purple100: '#9D4EDD',
      purple200: '#5A189A',
      purple300: '#240046',

      black100: '#222',
      black200: '#111',
      black300: '#000',

      gray100: '#9B9B9B',
      gray200: '#4E4E4E',
      gray300: '#383838',

      white100: '#FFFFFF',
      white200: '#EDEDED',
      white300: '#DBDBDB',

      red100: '#FF0000',

      green100: '#00A400',
    },
    fontSizes: {
      1: '12px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '48px',
    },
    fonts: {
      sansSerif: 'Inter, -apple-system, system-ui, sans-serif',
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
  },
  utils: {
    mx: (value: number) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: number) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
});
