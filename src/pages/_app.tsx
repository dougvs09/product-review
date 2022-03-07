import { QueryClientProvider, QueryClient } from 'react-query';

import type { AppProps } from 'next/app';

import { AuthContextProvider } from '@contexts/AuthContext';
import { globalStyles } from '@styles/GlobalStyles';

const MyApp = ({ Component, pageProps }: AppProps) => {
  globalStyles();

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
