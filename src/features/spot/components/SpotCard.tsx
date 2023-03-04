import type { Spot, SpotType } from '@/services/spot/types';

import Image from 'next/image';
import _ from 'lodash';
import { Card, CardBody, Link, Tag, Icon } from '@chakra-ui/react';
import { FaLink, FaMapMarkerAlt } from 'react-icons/fa';
import { AiTwotoneHeart } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { buildImageUrl } from '@/utils/buildImageUrl';
import { BUCKET_SPOTS } from '@/core/supabase/constants';
import { TYPE_COLOR_TAG } from './constants';

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  const extractUrlHost = (url: string): string => {
    return new URL(url).host;
  };

  const getTypeTagColor = (type: SpotType): string => {
    return TYPE_COLOR_TAG[type];
  };

  return (
    <Card
      direction={{ base: 'row', sm: 'column' }}
      height={{ base: '10rem', sm: '100%' }}
    >
      {spot.image && (
        <div className="relative w-full shrink-0 basis-2/5 sm:basis-48 sm:h-48">
          <Image
            fill
            src={buildImageUrl(spot.image, BUCKET_SPOTS)}
            alt={`${spot.name} card image`}
            className="object-cover rounded-l-md sm:rounded-bl-none sm:rounded-t-md"
          />
        </div>
      )}
      <CardBody p="0.75rem">
        <div className="flex items-center justify-between mb-4">
          <Tag colorScheme={getTypeTagColor(spot.type)} fontSize="xs">
            {spot.type.toUpperCase()}
          </Tag>
          <div>
            {spot.favourite && (
              <Icon as={AiTwotoneHeart} color="#eb2f96" className="mr-0.5" />
            )}
            {spot.visited && <Icon as={BsCheck2Circle} color="green" />}
          </div>
        </div>
        <h2 className="font-semibold text-lg mb-2">{spot.name}</h2>
        <Link
          rel="noreferrer"
          href={spot.googleMapsLink}
          target="_blank"
          className="inline-flex items-center"
        >
          <Icon as={FaMapMarkerAlt} className="mr-1.5 mb-1" />
          {_.capitalize(spot.area)}
        </Link>
        <div className="hidden sm:block">
          <Link
            rel="noreferrer"
            href={spot.website}
            target="_blank"
            className="inline-flex items-center"
          >
            <Icon as={FaLink} className="mr-1.5" />
            {spot.website && extractUrlHost(spot.website)}
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
