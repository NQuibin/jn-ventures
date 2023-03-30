import { SpotType } from '@/services/spot/types';

import { useState } from 'react';
import { Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { TYPES } from '@/services/spot/constants';

interface SpotFiltersProps {
  areas: string[];
  onHandleFilter(filters: Partial<{ [key: string]: string | boolean }>): void;
}

interface Option<T> {
  label: string;
  value: T;
}

export default function SpotFilters({
  areas,
  onHandleFilter,
}: SpotFiltersProps) {
  const [filters, setFilters] = useState<{
    [key: string]: string | boolean | undefined;
  }>({
    type: undefined,
    area: undefined,
  });

  function buildTypeOptions(): Option<SpotType>[] {
    return Object.values(TYPES).map(t => ({
      label: _.capitalize(t),
      value: t,
    }));
  }

  function buildAreaOptions(): Option<string>[] {
    return areas.map(area => ({
      label: area,
      value: area,
    }));
  }

  function handleFilterSelect(filterKey: string, filterValue: string) {
    const updatedFilters = { ...filters, [filterKey]: filterValue };
    setFilters(updatedFilters);
  }

  function handleSearch() {
    onHandleFilter(filters);
  }

  return (
    <div className="bg-neutral-200 p-4 mb-4 rounded">
      <div className="flex mb-2">
        <Select
          allowClear
          placeholder="Filter by type"
          options={buildTypeOptions()}
          className="mr-4 w-full"
          onChange={value => handleFilterSelect('type', value)}
        />
        <Select
          allowClear
          placeholder="Filter by area"
          options={buildAreaOptions()}
          className="w-full"
          onChange={value => handleFilterSelect('area', value)}
        />
      </div>
      <div className="w-full text-right">
        <Button icon={<SearchOutlined />} onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}
