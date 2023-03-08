import { InputGroup, Input, InputLeftElement, Icon, Checkbox } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

interface SpotFiltersProps {
  className?: string;
}

export default function SpotFilters({ className }: SpotFiltersProps) {
  return (
    <div className={className}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FaSearch} />}
        />
        <Input placeholder="Search for a spot" />
        <Checkbox defaultChecked>Visited</Checkbox>
        <Checkbox defaultChecked>Favourite</Checkbox>
      </InputGroup>
    </div>
  );
}
