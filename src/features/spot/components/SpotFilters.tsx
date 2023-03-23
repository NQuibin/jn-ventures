import type { SpotType } from '@/services/spot/types';

import { Checkbox, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { TYPES } from '@/services/spot/constants';

interface SpotFiltersProps {
  onHandleFilter(filterKey: string, filterValue: string | boolean): void;
}

export default function SpotFilters({ onHandleFilter }: SpotFiltersProps) {
  const [type, setType] = useState<SpotType | undefined>();
  const typeOptions = Object.values(TYPES).map(type => {
    return {
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
    };
  });

  const handleFilter = async (
    filterKey: string,
    filterValue: string | boolean
  ) => {
    onHandleFilter(filterKey, filterValue);
  };

  return (
    <div className="mx-2 mt-4 mb-10 p-4 bg-white rounded-md shadow">
      <div className="flex flex-wrap sm:flex-nowrap">
        <Select
          placeholder="Select a type"
          onChange={e => handleFilter('type', e.target.value)}
        >
          {typeOptions.map(type => (
            <option key={type.value} color="" value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
        <div className="flex ml-auto pt-2 sm:pt-0">
          <Checkbox className="pr-4 sm:px-4">Visited</Checkbox>
          <Checkbox>Favourite</Checkbox>
        </div>
      </div>
    </div>
  );
}
