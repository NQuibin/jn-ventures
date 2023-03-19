import { useEffect, useRef } from 'react';
import { Icon, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { RiCloseCircleLine } from 'react-icons/ri';

interface AutocompleteProps {
  onPlaceSelect(place: google.maps.places.PlaceResult): void;
}

export default function Autocomplete({ onPlaceSelect }: AutocompleteProps) {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const options = {
    componentRestrictions: { country: 'ca' },
    fields: [
      'place_id',
      'name',
      'formatted_address',
      'website',
      'url',
      'address_components',
    ],
    types: ['establishment'],
  };

  const handlePlaceSelect = async () => {
    if (autoCompleteRef.current) {
      const place = await autoCompleteRef.current.getPlace();
      onPlaceSelect(place);
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current?.focus();
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      autoCompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
    }

    if (autoCompleteRef.current) {
      autoCompleteRef.current.addListener('place_changed', handlePlaceSelect);
    }
  }, []);

  return (
    <div className="w-full">
      <InputGroup>
        <Input
          ref={inputRef}
          placeholder="Search for a place"
          bgColor="white"
        />
        <InputRightElement>
          <Icon
            as={RiCloseCircleLine}
            className="cursor-pointer"
            onClick={handleClear}
          />
        </InputRightElement>
      </InputGroup>
    </div>
  );
}
