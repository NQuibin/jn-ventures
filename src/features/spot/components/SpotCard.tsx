import type { Spot } from '@/services/spot/types';

import Image from 'next/image';
import _ from 'lodash';
import { Tag } from 'antd';
import {
  EnvironmentFilled,
  HeartTwoTone,
  LinkOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { buildImageUrl } from '@/utils/buildImageUrl';
import { BUCKET_SPOTS } from '@/core/supabase/constants';
import { TYPE_COLOR_TAG } from '../constants';
import classNames from 'classnames';

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  const typeTagColor = TYPE_COLOR_TAG[spot.type];
  const hasImage = !!spot.image;
  const imageUrl = !!spot.image ? buildImageUrl(spot.image, BUCKET_SPOTS) : '';

  function extractUrlHost(url: string): string {
    return new URL(url).host;
  }

  async function handleShare(): Promise<void> {
    const shareData = {
      title: spot.name,
      url: spot.googleMapsLink,
    };

    try {
      await navigator.share(shareData);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex justify-between p-3 h-full bg-white rounded border-2 border-solid border-neutral-200">
      <div
        className={classNames({
          'w-full': !hasImage,
          'w-2/3 pr-4': hasImage,
        })}
      >
        <div className="flex items-center mb-4">
          <Tag color={typeTagColor} className="text-[10px]">
            {spot.type.toUpperCase()}
          </Tag>
          <div className="flex items-center w-full">
            <ShareAltOutlined
              className="mr-1 cursor-pointer"
              onClick={handleShare}
            />
            {!hasImage && spot.favourite && (
              <HeartTwoTone twoToneColor="#eb2f96" className="ml-auto" />
            )}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-base mb-2">{spot.name}</h2>
          <div className="w-full inline-flex overflow-hidden sm:mb-1">
            <a
              rel="noreferrer"
              href={spot.googleMapsLink}
              target="_blank"
              className="inline-flex items-center mr-4"
            >
              <EnvironmentFilled
                style={{ color: typeTagColor }}
                className="mb-0.5 mr-1"
              />
              <span className="text-sm text-black">
                {_.capitalize(spot.area)}
              </span>
            </a>
            {spot.website && (
              <a
                rel="noreferrer"
                href={spot.website}
                target="_blank"
                className="inline-flex items-center truncate"
              >
                <LinkOutlined
                  style={{ color: typeTagColor }}
                  className="mr-1"
                />
                <span className="text-sm truncate text-black">
                  {extractUrlHost(spot.website)}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
      {hasImage && (
        <div className="relative shrink-0 w-1/3 h-full">
          {spot.favourite && (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              className="absolute z-10 top-1 right-1"
            />
          )}
          <Image
            fill
            src={imageUrl}
            alt={`${spot.name} card image`}
            className="object-cover rounded"
          />
        </div>
      )}
    </div>
  );
}
