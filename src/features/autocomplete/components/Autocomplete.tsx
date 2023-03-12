import { useEffect, useRef } from 'react';
import { Input } from '@chakra-ui/react';

interface AutocompleteProps {
  onPlaceSelect(place: google.maps.places.PlaceResult): void;
}

export default function Autocomplete({ onPlaceSelect }: AutocompleteProps) {
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
      <Input ref={inputRef} placeholder="Search for a place" bgColor="white" />
    </div>
  );
}
