import type { GetServerSidePropsContext } from 'next';

import { useState, useEffect } from 'react';
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
import { TYPES } from '../services/spot/constants';
import axios from 'axios';
import { NewSpot, SpotType } from '../services/spot/types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const LOCALITY_TYPE = 'locality';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // TODO: should move this to middleware
  if (!session || session.user.email !== 'nquibin.dev@gmail.com') {
    return {
      redirect: {
        destination: encodeURI(`/login?deep-link=${ctx.req.url}`),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function AddPlace() {
  const [place, setPlace] = useState<
    { [key: string]: string | undefined } | undefined
  >(undefined);
  const [type, setType] = useState<SpotType | undefined>();
  const [visited, setVisited] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const typeOptions = Object.values(TYPES).map(type => {
    return {
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
    };
  });

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    // find locality to get the area
    const locality = place.address_components?.find(ac =>
      ac.types.includes(LOCALITY_TYPE)
    );
    const area = locality ? locality.long_name : undefined;

    setPlace({
      placeId: place.place_id,
      name: place.name,
      address: place.formatted_address,
      mapsLink: place.url,
      website: place.website,
      area,
    });
  };

  const handleAddSpot = async () => {
    if (place) {
      const data = {
        name: place.name,
        area: place.area,
        address: place.address,
        website: place.website,
        googlePlaceId: place.placeId,
        googleMapsLink: place.mapsLink,
        type,
        visited,
        favourite,
      } satisfies Partial<NewSpot>;

      await axios.post('/api/spots', data);
    }

    // TODO: add exception handling
  };

  useEffect(() => {
    setIsFormValid(!!type);
  }, [type]);

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
                    onChange={e => setType(e.target.value as SpotType)}
                  >
                    {typeOptions.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="mt-2">
                  <CheckboxGroup colorScheme="blue">
                    <div className="flex flex-wrap gap-x-4">
                      <Checkbox
                        isChecked={visited}
                        value="visited"
                        onChange={e => setVisited(e.target.checked)}
                      >
                        Visited
                      </Checkbox>
                      <Checkbox
                        isChecked={favourite}
                        value="favourite"
                        onChange={e => setFavourite(e.target.checked)}
                      >
                        Favourite
                      </Checkbox>
                    </div>
                  </CheckboxGroup>
                </FormControl>
              </div>
              <Button
                isDisabled={!isFormValid}
                colorScheme="blue"
                className="mt-4"
                onClick={handleAddSpot}
              >
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
