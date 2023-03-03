import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { Spot } from '@/services/spot/types';

import { SpotService } from '@/services/spot/service';
import PageLayout from '../features/common/components/PageLayout';
import PageHeader from '../features/common/components/PageHeader';
import SpotCard from '../features/spot/components/SpotCard';

export const getServerSideProps: GetServerSideProps<{
  spots: Spot[];
}> = async () => {
  const spots = await new SpotService().listSpots();

  return {
    props: { spots },
  };
};

export default function Home({
  spots,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const buildSpotCards = () => {
    return spots.map(spot => {
      return (
        <div key={spot.key} className="w-full py-2 sm:px-2 sm:w-1/2 md:w-1/3">
          <SpotCard spot={spot} />
        </div>
      );
    });
  };

  return (
    <PageLayout headTitle="Food spots">
      <PageHeader />
      <div className="max-w-2xl mx-auto p-4 flex flex-col sm:flex-row sm:flex-wrap">
        {buildSpotCards()}
      </div>
    </PageLayout>
  );
}
