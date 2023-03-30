import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ReactNode } from 'react';
import type { Spot } from '@/services/spot/types';

import { SpotService } from '@/services/spot/service';
import PageLayout from '../features/common/components/PageLayout';
import PageHeader from '../features/common/components/PageHeader';
import SpotCard from '../features/spot/components/SpotCard';
import PageFooter from '../features/common/components/PageFooter';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Divider, Select, Spin, FloatButton } from 'antd';
import SpotFilters from '../features/spot/components/SpotFilters';
import { LoadingOutlined } from '@ant-design/icons';

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
  const [isLoading, setIsLoading] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

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
        <section
          key={key}
          ref={el => (sectionsRef.current[key] = el)}
          className="flex flex-wrap"
        >
          <Divider orientation="left">
            <h2 id={key} className="mb-0 text-3xl font-bold">
              {key}
            </h2>
          </Divider>
          {buildSpotCards(alphabetizedSpots[key])}
        </section>
      );
    });

    return sections;
  }

  function scrollToSection(sectionKey: string) {
    const el = sectionsRef.current[sectionKey];
    const dimensions = el?.getBoundingClientRect();

    if (dimensions) {
      window.scrollTo(window.scrollX, dimensions.top - 100);
    }
  }

  function buildAlphabetizedNavigation(): ReactNode {
    const navOptions = Object.keys(alphabetizedSpots)
      .sort()
      .map(key => ({ label: key, value: key }));

    return (
      <div className="text-right">
        <Select
          placeholder="Scroll to"
          className="w-28"
          bordered={false}
          options={navOptions}
          onSelect={(key: string) => scrollToSection(key)}
        />
      </div>
    );
  }

  async function handleFilter(
    filters: Partial<{ [key: string]: string | boolean }>
  ) {
    setIsLoading(true);

    try {
      const res = await axios.get('/api/spots', {
        params: filters,
      });
      buildAlphabetizedSpots(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageLayout headTitle="Food spots">
      <PageHeader showMenu />
      <Spin
        size="large"
        spinning={isLoading}
        indicator={
          <LoadingOutlined style={{ color: 'black' }} />
        }
      >
        <div className="max-w-4xl w-full mx-auto px-4 py-8">
          <SpotFilters areas={areas} onHandleFilter={handleFilter} />
          {buildAlphabetizedNavigation()}
          {buildSections()}
        </div>
        <FloatButton.BackTop />
      </Spin>
      <PageFooter />
    </PageLayout>
  );
}
