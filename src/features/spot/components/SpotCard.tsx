import type { Spot } from '@/services/spot/types';

import Image from 'next/image';
import _ from 'lodash';
import classNames from 'classnames';
import { Card, CardBody, Link, Tag, Icon } from '@chakra-ui/react';
import { FaLink, FaMapMarkerAlt } from 'react-icons/fa';
import { AiTwotoneHeart } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { buildImageUrl } from '@/utils/buildImageUrl';
import { BUCKET_SPOTS } from '@/core/supabase/constants';
import { TYPE_COLOR_TAG } from '../constants';

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  const typeTagColor = TYPE_COLOR_TAG[spot.type];
  const hasImage = !!spot.image;
  const imageUrl = !!spot.image ? buildImageUrl(spot.image, BUCKET_SPOTS) : '';

  const extractUrlHost = (url: string): string => {
    return new URL(url).host;
  };

  return (
    <Card direction={{ base: 'row', sm: 'column' }} height={{ base: '100%' }}>
      <CardBody p="0">
        <div className="flex">
          <div className={classNames('p-3', 'basis-full', { 'basis-3/5': hasImage })}>
            <div className="flex items-center justify-between mb-4">
              <Tag colorScheme={typeTagColor} fontSize="xs">
                {spot.type.toUpperCase()}
              </Tag>
              <div>
                {spot.favourite && (
                  <Icon
                    as={AiTwotoneHeart}
                    color="#eb2f96"
                    className="mr-0.5"
                  />
                )}
                {spot.visited && <Icon as={BsCheck2Circle} color="green" />}
              </div>
            </div>
            <h2 className="font-semibold text-lg mb-2">{spot.name}</h2>
            <div
              className={classNames(
                'flex',
                spot.image ? 'flex-col' : 'flex-wrap'
              )}
            >
              <Link
                rel="noreferrer"
                href={spot.googleMapsLink}
                target="_blank"
                className={classNames(
                  'inline-flex items-center',
                  !spot.image && 'mr-4'
                )}
              >
                <Icon as={FaMapMarkerAlt} className="mr-1.5" />
                {_.capitalize(spot.area)}
              </Link>
              {spot.website && (
                <div className="hidden sm:inline-flex">
                  <Link
                    rel="noreferrer"
                    href={spot.website}
                    target="_blank"
                    className="inline-flex items-center"
                  >
                    <Icon as={FaLink} className="mr-1.5" />
                    {extractUrlHost(spot.website)}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {hasImage && (
            <div className="relative shrink-0 basis-2/5">
              <Image
                fill
                src={imageUrl}
                alt={`${spot.name} card image`}
                className="object-cover rounded-r-md"
              />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
