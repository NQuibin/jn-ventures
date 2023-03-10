import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ReactNode } from 'react';
import type { Spot } from '@/services/spot/types';

import { SpotService } from '@/services/spot/service';
import PageLayout from '../features/common/components/PageLayout';
import PageHeader from '../features/common/components/PageHeader';
import SpotCard from '../features/spot/components/SpotCard';
import PageFooter from '../features/common/components/PageFooter';
import SpotLegend from '../features/spot/components/SpotLegend';

interface HomeProps {
  spots: Spot[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const spots = await new SpotService().listSpots();
  return {
    props: { spots },
  };
};

export default function Home({
  spots,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const buildImagedSpotCards = (): ReactNode[] => {
    return spots.map(spot => (
      <div
        key={spot.key}
        className="w-full py-2 sm:px-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
      >
        <SpotCard spot={spot} />
      </div>
    ));
  };

  return (
    <PageLayout headTitle="Food spots">
      <PageHeader />
      <div className="max-w-6xl w-full mx-auto p-4">
        <SpotLegend className="p-2 justify-end" />
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
          {buildImagedSpotCards()}
        </div>
      </div>
      <PageFooter />
    </PageLayout>
  );
}
