import type { AppProps } from 'next/app';

import { AuthContextProvider } from '@contexts/AuthContext';
import { globalStyles } from '@styles/GlobalStyles';

const MyApp = ({ Component, pageProps }: AppProps) => {
  globalStyles();
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
};

export default MyApp;
