import { useState } from 'react';
import PageHeader from '../features/common/components/PageHeader';
import PageLayout from '../features/common/components/PageLayout';
import PageFooter from '../features/common/components/PageFooter';
import Autocomplete from '../features/autocomplete/components/Autocomplete';
import {
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  CheckboxGroup,
  Divider,
  Button,
} from '@chakra-ui/react';

const LOCALITY_TYPE = 'locality';

export default function AddPlace() {
  const [place, setPlace] = useState<
    { [key: string]: string | undefined } | undefined
  >(undefined);
  const [type, setType] = useState('');
  const [visited, setVisited] = useState(false);
  const [favourite, setFavourite] = useState(false);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    // find locality to get the area
    const locality = place.address_components?.find(ac =>
      ac.types.includes(LOCALITY_TYPE)
    );
    const area = locality ? locality.long_name : undefined;

    setPlace({
      name: place.name,
      address: place.formatted_address,
      mapsLink: place.url,
      website: place.website,
      area,
    });
  };

  return (
    <>
      <PageLayout headTitle="Add a spot">
        <PageHeader />
        <div className="flex flex-wrap justify-center max-w-xl w-full mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">
            Look for a new place to add
          </h1>
          <Autocomplete onPlaceSelect={handlePlaceSelect} />
          {place && (
            <div className="w-full mt-4 p-4 bg-white rounded shadow-md">
              <div>
                <div className="mb-2">
                  <label className="font-bold">Name:</label>
                  <p>{place.name}</p>
                </div>
                <div className="mb-2">
                  <label className="font-bold">Area:</label>
                  <p>{place.area}</p>
                </div>
                <div className="mb-2">
                  <label className="font-bold">Address:</label>
                  <p>{place.address}</p>
                </div>
                <div className="mb-2">
                  <label className="font-bold">Google maps link:</label>
                  <p>{place.mapsLink}</p>
                </div>
                <div>
                  <label className="font-bold">Website:</label>
                  <p>{place.website || 'N/A'}</p>
                </div>
              </div>
              <Divider className="my-4" />
              <div>
                <FormControl isRequired>
                  <FormLabel fontWeight="bold">Type</FormLabel>
                  <Select
                    placeholder="Select spot"
                    value={type}
                    onChange={e => console.log(e.target.value)}
                  >
                    <option>Bakery</option>
                    <option>Bar</option>
                    <option>Brunch</option>
                    <option>Cafe</option>
                    <option>Dessert</option>
                    <option>Restaurant</option>
                  </Select>
                </FormControl>
                <FormControl className="mt-2">
                  <CheckboxGroup colorScheme="blue">
                    <div className="flex flex-wrap gap-x-4">
                      <Checkbox value="visited">Visited</Checkbox>
                      <Checkbox value="favourite">Favourite</Checkbox>
                    </div>
                  </CheckboxGroup>
                </FormControl>
              </div>
              <Button colorScheme="blue" className="mt-4">
                Add spot
              </Button>
            </div>
          )}
        </div>
        <PageFooter />
      </PageLayout>
    </>
  );
}
