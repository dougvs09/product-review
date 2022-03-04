import type { NextPage } from 'next';

import { Header } from '@components/Header';

import { styled } from '../../stitches.config';

const Container = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100vh',
});

const Home: NextPage = () => (
  <Container>
    <Header />
  </Container>
);

export default Home;
