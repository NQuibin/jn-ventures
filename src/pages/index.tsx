import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ReactNode } from 'react';
import type { Spot } from '@/services/spot/types';

import { SpotService } from '@/services/spot/service';
import PageLayout from '../features/common/components/PageLayout';
import PageHeader from '../features/common/components/PageHeader';
import SpotCard from '../features/spot/components/SpotCard';
import PageFooter from '../features/common/components/PageFooter';
import SpotLegend from '../features/spot/components/SpotLegend';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider } from 'antd';
import SpotFilters from '../features/spot/components/SpotFilters';

interface HomeProps {
  initialSpots: Spot[];
  areas: string[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const service = new SpotService();
  const spots = await service.listSpots();
  const areas = await service.listSpotAreas();

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
    props: { initialSpots: spots, areas },
  };
};

export default function Home({
  initialSpots,
  areas,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [alphabetizedSpots, setAlphabetizedSpots] = useState<{
    [key: string]: Spot[];
  }>({});

  useEffect(() => {
    buildAlphabetizedSpots(initialSpots);
  }, []);

  function buildAlphabetizedSpots(spots: Spot[]) {
    const aSpots: { [key: string]: Spot[] } = {};
    spots.forEach(spot => {
      const letter = spot.name.charAt(0).toUpperCase();

      if (aSpots[letter]) {
        aSpots[letter].push(spot);
      } else {
        aSpots[letter] = [spot];
      }
    });

    setAlphabetizedSpots(aSpots);
  }

  function buildSpotCards(spots: Spot[]): ReactNode[] {
    return spots.map(spot => (
      <div key={spot.key} className="w-full p-2 sm:w-1/2">
        <SpotCard spot={spot} />
      </div>
    ));
  }

  function buildSections(): ReactNode[] {
    const keys = Object.keys(alphabetizedSpots).sort();
    const sections: ReactNode[] = [];

    keys.forEach(key => {
      sections.push(
        <div key={key} className="flex flex-wrap">
          <Divider orientation="left">
            <h2 className="mb-0 text-3xl font-bold">{key}</h2>
          </Divider>
          {buildSpotCards(alphabetizedSpots[key])}
        </div>
      );
    });

    return sections;
  }

  async function handleFilter(
    filters: Partial<{ [key: string]: string | boolean }>
  ) {
    const res = await axios.get('/api/spots', {
      params: filters,
    });
    buildAlphabetizedSpots(res.data);
  }

  return (
    <PageLayout headTitle="Food spots">
      <PageHeader showAddPlaceLink />
      <div className="max-w-5xl w-full mx-auto p-4">
        <SpotFilters areas={areas} onHandleFilter={handleFilter} />
        <SpotLegend className="justify-end" />
        {buildSections()}
      </div>
      <PageFooter />
    </PageLayout>
  );
}
