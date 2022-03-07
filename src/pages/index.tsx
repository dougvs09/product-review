import { useQuery } from 'react-query';

import type { NextPage } from 'next';

import { Header } from '@components/Header';
import { ReviewCard } from '@components/ReviewCard';
import { api } from 'utils/api';

import { styled } from '../../stitches.config';

type ReviewTypes = {
  id: string;
  name: string;
  author: {
    name: string;
  };
  createdAt: string;
  pictureUrl: string;
};

const Container = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100vh',
});

const ReviewsContainer = styled('section', {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '50px auto 0 auto',
  padding: '0 20px',
});

const Home: NextPage = () => {
  const { data: review } = useQuery<ReviewTypes[], Error>(
    'reviews',
    async () => {
      const response = await api.get('/review');
      return response.data;
    }
  );

  return (
    <Container>
      <Header />
      <ReviewsContainer>
        {review?.map((data) => (
          <ReviewCard key={data.id} data={data} />
        ))}
      </ReviewsContainer>
    </Container>
  );
};

export default Home;
