import type { InputRef } from 'antd';

import { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';

interface AutocompleteProps {
  onPlaceSelect(place: google.maps.places.PlaceResult): void;
}

export default function Autocomplete({ onPlaceSelect }: AutocompleteProps) {
  const [searchValue, setSearchValue] = useState('');
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<InputRef>(null);
  const options = {
    componentRestrictions: { country: 'ca' },
    fields: [
      'place_id',
      'name',
      'formatted_address',
      'website',
      'url',
      'address_components',
      'adr_address',
    ],
    types: ['establishment'],
  };

  const handlePlaceSelect = async () => {
    if (autoCompleteRef.current) {
      const place = await autoCompleteRef.current.getPlace();
      onPlaceSelect(place);

      if (place.place_id) {
        setSearchValue(`${place.name}, ${place.formatted_address}`);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchValue(value);

    // clear autocomplete when value is cleared
    if (!value && autoCompleteRef.current && inputRef.current?.input) {
      autoCompleteRef.current.set('place', {});

      // to remove prediction dropdown
      inputRef.current.input.value = '';
      inputRef.current.input.blur();
      inputRef.current.input.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current?.input) {
      autoCompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current.input,
        options
      );
    }

    if (autoCompleteRef.current) {
      autoCompleteRef.current.addListener('place_changed', handlePlaceSelect);
    }
  }, []);

  return (
    <div className="w-full">
      <Input
        allowClear
        placeholder="Search for a place"
        ref={inputRef}
        value={searchValue}
        onChange={handleOnChange}
      />
    </div>
  );
}
