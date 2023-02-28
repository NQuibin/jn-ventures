import type { Spot } from '@/services/spot/types';
import { Card, CardHeader, CardBody, CardFooter, Link } from '@chakra-ui/react';

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  return (
    <Card direction={{ base: 'row', sm: 'column' }}>
      <CardBody>
        <h2 className="font-semibold">{spot.name}</h2>
        <Link rel="noreferrer" href={spot.googleMapsLink}>
          {spot.area}
        </Link>
      </CardBody>
    </Card>
  );
}
