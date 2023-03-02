import type { Spot } from '@/services/spot/types';

import Image from 'next/image';
import _ from 'lodash';
import { Tag } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Link } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaLink } from 'react-icons/fa';

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
        <Tag colorScheme="purple" fontSize="xs" className="mb-4">
          {spot.type.toUpperCase()}
        </Tag>
        <h2 className="font-semibold text-lg mb-2">{spot.name}</h2>
        <Link rel="noreferrer" href={spot.googleMapsLink} className="inline-flex items-center">
          <FaMapMarkerAlt className="mr-1.5" />
          {_.capitalize(spot.area)}
        </Link>
        <div>
          <Link rel="noreferrer" href={spot.website} className="inline-flex items-center">
            <FaLink className="mr-1.5" />
            {spot.website && extractUrlHost(spot.website)}
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
