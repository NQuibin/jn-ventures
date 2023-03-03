import type { Spot } from '@/services/spot/types';

import Image from 'next/image';
import _ from 'lodash';
import { Card, CardBody, Link, Tag } from '@chakra-ui/react';
import { FaLink, FaMapMarkerAlt } from 'react-icons/fa';
import { buildImageUrl } from '@/utils/buildImageUrl';
import { BUCKET_SPOTS } from '@/core/supabase/constants';

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  const extractUrlHost = (url: string): string => {
    return new URL(url).host;
  };

  return (
    <Card direction={{ base: 'row', sm: 'column' }} height="100%">
      <div className="relative w-full basis-2/5 sm:basis-48 sm:h-48">
        {spot.image && (
          <Image
            fill
            src={buildImageUrl(spot.image, BUCKET_SPOTS)}
            alt={`${spot.name} card image`}
            className="object-cover rounded-l-md sm:rounded-bl-none sm:rounded-t-md"
          />
        )}
      </div>
      <CardBody p="0.75rem">
        <Tag colorScheme="purple" fontSize="xs" className="mb-4">
          {spot.type.toUpperCase()}
        </Tag>
        <h2 className="font-semibold text-lg mb-2">{spot.name}</h2>
        <Link
          rel="noreferrer"
          href={spot.googleMapsLink}
          target="_blank"
          className="inline-flex items-center"
        >
          <FaMapMarkerAlt className="mr-1.5" />
          {_.capitalize(spot.area)}
        </Link>
        <div>
          <Link
            rel="noreferrer"
            href={spot.website}
            target="_blank"
            className="inline-flex items-center"
          >
            <FaLink className="mr-1.5" />
            {spot.website && extractUrlHost(spot.website)}
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
