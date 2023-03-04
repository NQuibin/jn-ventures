import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ReactNode } from 'react';
import type { Spot } from '@/services/spot/types';

import { SpotService } from '@/services/spot/service';
import PageLayout from '../features/common/components/PageLayout';
import PageHeader from '../features/common/components/PageHeader';
import SpotCard from '../features/spot/components/SpotCard';

interface HomeProps {
  imagedSpots: Spot[];
  unimagedSpots: Spot[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const spots = await new SpotService().listSpots();

  // partition array of spots by their image value
  const [imagedSpots, unimagedSpots] = spots.reduce(
    ([is, uis]: [Spot[], Spot[]], spot) =>
      !!spot.image ? [[...is, spot], uis] : [is, [...uis, spot]],
    [[], []]
  );

  return {
    props: { imagedSpots, unimagedSpots },
  };
};

export default function Home({
  imagedSpots,
  unimagedSpots,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const buildImagedSpotCards = (): ReactNode[] => {
    return imagedSpots.map(spot => (
      <div key={spot.key} className="w-full p-2 sm:w-1/2 md:w-1/3">
        <SpotCard spot={spot} />
      </div>
    ));
  };

  const buildUnimagedSpotCards = (): ReactNode[] => {
    return unimagedSpots.map(spot => (
      <div key={spot.key} className="w-1/2 p-2 sm:w-1/3">
        <SpotCard spot={spot} />
      </div>
    ));
  };

  return (
    <PageLayout headTitle="Food spots">
      <PageHeader />
      <div className="max-w-2xl mx-auto px-2 py-4">
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
          {buildImagedSpotCards()}
        </div>
        <div className="flex flex-wrap">
          {buildUnimagedSpotCards()}
        </div>
      </div>
    </PageLayout>
  );
}
