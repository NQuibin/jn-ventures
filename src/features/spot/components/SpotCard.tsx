import type { Spot } from '@/services/spot/types';
import _ from 'lodash';
import { Tag } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Link } from '@chakra-ui/react';

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  const extractUrlHost = (url: string): string => {
    return new URL(url).host;
  };

  return (
    <Card direction={{ base: 'row', sm: 'column' }}>
      <CardBody>
        <Tag colorScheme="purple">{spot.type.toUpperCase()}</Tag>
        <h2 className="font-semibold text-lg">{spot.name}</h2>
        <Link rel="noreferrer" href={spot.googleMapsLink} className="block">
          {_.capitalize(spot.area)}
        </Link>
        <Link rel="noreferrer" href={spot.website} className="block">
          {spot.website && extractUrlHost(spot.website)}
        </Link>
      </CardBody>
    </Card>
  );
}
