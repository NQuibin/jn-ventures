import type { Spot } from '@/services/spot/types';

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';

interface SpotCardProps {
  spot: Spot;
}

const SpotCard: React.FC<SpotCardProps> = ({ spot }) => {
  return (
    <Card direction={{ base: 'row', sm: 'column' }}>
      <CardBody>
        <h2>{spot.name}</h2>
      </CardBody>
    </Card>
  );
};

export default SpotCard;
