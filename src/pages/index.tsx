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
import SpotFilters from '../features/spot/components/SpotFilters';
import axios from 'axios';
import { Divider } from 'antd';

interface HomeProps {
  alphabetizedSpots: { [key: string]: Spot[] };
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const spots = await new SpotService().listSpots();

  const alphabetizedSpots: { [key: string]: Spot[] } = {};
  spots.forEach(spot => {
    const letter = spot.name.charAt(0).toUpperCase();

    if (alphabetizedSpots[letter]) {
      alphabetizedSpots[letter].push(spot);
    } else {
      alphabetizedSpots[letter] = [spot];
    }
  });

  return {
    props: { alphabetizedSpots },
  };
};

export default function Home({
  alphabetizedSpots,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleAddPlaceClick = () => {
    router.push('/add-place');
  };

  const buildSpotCards = (spots: Spot[]): ReactNode[] => {
    return spots.map(spot => (
      <div key={spot.key} className="w-full p-2 sm:w-1/2">
        <SpotCard spot={spot} />
      </div>
    ));
  };

  const buildSections = (): ReactNode[] => {
    const keys = Object.keys(alphabetizedSpots).sort();
    const sections: ReactNode[] = [];

    keys.forEach(key => {
      sections.push(
        <div key={key} className="flex flex-wrap">
          <Divider orientation="left">
            <h2 className="text-3xl font-bold">{key}</h2>
          </Divider>
          {buildSpotCards(alphabetizedSpots[key])}
        </div>
      );
    });

    return sections;
  };

  const handleFilter = async (
    filterKey: string,
    filterValue: string | boolean
  ) => {
    const res = await axios.get('/api/spots', {
      params: { [filterKey]: filterValue },
    });
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
        <SpotLegend />
        {buildSections()}
      </div>
      <PageFooter />
    </PageLayout>
  );
}
