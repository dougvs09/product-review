import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Card, CardFooter, CardImage, ReviewName } from './styles';

type ReviewCardTypes = {
  data: {
    id: string;
    name: string;
    author: {
      name: string;
    };
    createdAt: string;
    pictureUrl: string;
  };
};

export const ReviewCard: React.FC<ReviewCardTypes> = ({
  data,
}: ReviewCardTypes) => {
  const [showTitle, setShowTitle] = useState(false);
  const [dateDiff, setDateDiff] = useState<number | string>('');

  useEffect(() => {
    const createdAt = new Date(data.createdAt).getTime();
    const now = new Date().getTime();
    const dayInMilleseconds = 1000 * 60 * 60 * 24;

    const diff = Math.round((now - createdAt) / dayInMilleseconds);

    if (diff < 1) setDateDiff('algumas horas');

    if (diff > 6) setDateDiff('1 semana');

    if (diff > 29) setDateDiff('1 mês');

    if (diff > 364) setDateDiff('1 ano');

    setDateDiff(`${diff} dias`);
  }, []);

  return (
    <Card>
      <Link href={`/review/${data.id}`} passHref>
        <CardImage
          onMouseOver={() => setShowTitle(true)}
          onMouseLeave={() => setShowTitle(false)}
        >
          <Image
            src={data.pictureUrl}
            layout="fill"
            alt="review picture"
            priority
          />
          <ReviewName showTitle={showTitle}>
            <h1>{data.name}</h1>
          </ReviewName>
        </CardImage>
      </Link>
      <CardFooter>
        <span>{data.author.name}</span>
        <span>Há {dateDiff}</span>
      </CardFooter>
    </Card>
  );
};
