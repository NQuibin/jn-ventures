import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ReactNode } from 'react';
import type { Spot } from '@/services/spot/types';

import { SpotService } from '@/services/spot/service';
import PageLayout from '../features/common/components/PageLayout';
import PageHeader from '../features/common/components/PageHeader';
import SpotCard from '../features/spot/components/SpotCard';
import PageFooter from '../features/common/components/PageFooter';
import SpotLegend from '../features/spot/components/SpotLegend';
import { Icon } from '@chakra-ui/react';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import React from 'react';
import { useRouter } from 'next/router';

interface HomeProps {
  imagedSpots: Spot[];
  unimagedSpots: Spot[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const spots = await new SpotService().listSpots();

  const [imagedSpots, unimagedSpots] = spots.reduce(
    ([imagedSpots, unimagedSpots], currentSpot) =>
      currentSpot.image
        ? [[...imagedSpots, currentSpot], unimagedSpots]
        : [imagedSpots, [...unimagedSpots, currentSpot]],
    [[] as Spot[], [] as Spot[]]
  );

  return {
    props: { imagedSpots, unimagedSpots },
  };
};

export default function Home({
  imagedSpots,
  unimagedSpots,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleAddPlaceClick = () => {
    router.push('/add-place');
  };

  const buildImagedSpotCards = (): ReactNode[] => {
    return imagedSpots.map(spot => (
      <div
        key={spot.key}
        className="w-full p-2 sm:w-1/2"
      >
        <SpotCard spot={spot} />
      </div>
    ));
  };

  const buildUnimagedSpotCards = (): ReactNode[] => {
    return unimagedSpots.map(spot => (
      <div key={spot.key} className="w-full p-2 sm:w-1/2">
        <SpotCard spot={spot} />
      </div>
    ));
  };

  return (
    <PageLayout headTitle="Food spots">
      <PageHeader
        rightSideContent={
          <Icon
            as={MdOutlineAddLocationAlt}
            color="white"
            w={6}
            h={6}
            className="cursor-pointer"
            onClick={handleAddPlaceClick}
          />
        }
      />
      <div className="max-w-5xl w-full mx-auto p-4">
        <SpotLegend className="p-2 justify-end" />
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
          {buildImagedSpotCards()}
        </div>
        <div className="pt-8">
          <h2 className="px-2 text-3xl font-bold">OTHER SPOTS</h2>
          <hr className="h-0.5 mb-2 w-full bg-neutral-300" />
          <div className="flex flex-col sm:flex-row sm:flex-wrap">
            {buildUnimagedSpotCards()}
          </div>
        </div>
      </div>
      <PageFooter />
    </PageLayout>
  );
}
