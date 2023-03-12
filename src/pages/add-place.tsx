import { useState } from 'react';
import Script from 'next/script';
import PageHeader from '../features/common/components/PageHeader';
import PageLayout from '../features/common/components/PageLayout';
import PageFooter from '../features/common/components/PageFooter';
import Autocomplete from '../features/autocomplete/components/Autocomplete';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
const LOCALITY_TYPE = 'locality';

export default function AddPlace() {
  const [place, setPlace] = useState<{ [key: string]: string | undefined }>({});

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
      <Script src={GOOGLE_MAPS_URL} strategy="beforeInteractive" />
      <PageLayout headTitle="Add a place">
        <PageHeader />
        <div className="flex flex-wrap justify-center max-w-xl w-full mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">
            Look for a new place to add
          </h1>
          <Autocomplete onPlaceSelect={handlePlaceSelect} />
          <div className="w-full mt-4 bg-white">
            <p>{place.name}</p>
            <p>{place.area}</p>
            <p>{place.address}</p>
            <p>{place.mapsLink}</p>
            <p>{place.website}</p>
          </div>
        </div>
        <PageFooter />
      </PageLayout>
    </>
  );
}
