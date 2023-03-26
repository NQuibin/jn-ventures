import type { GetServerSidePropsContext } from 'next';
import type { ArgsProps } from 'antd/es/notification/interface';
import type { AxiosError } from 'axios';
import type { HttpErrorResponseData } from '../utils/apiErrors';
import type { NewSpot, SpotType } from '../services/spot/types';

import React, { useState } from 'react';
import PageHeader from '../features/common/components/PageHeader';
import PageLayout from '../features/common/components/PageLayout';
import PageFooter from '../features/common/components/PageFooter';
import Autocomplete from '../features/autocomplete/components/Autocomplete';
import { Divider, Form, Button, Select, Checkbox, notification } from 'antd';
import { TYPES } from '../services/spot/constants';
import axios from 'axios';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { ERROR_CODES } from '../services/spot/errors';

const LOCALITY_TYPE = 'locality';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // TODO: should move this to middleware
  if (
    !session ||
    !['nquibin.dev@gmail.com', 'jeanelle.dimayuga@gmail.com'].includes(
      session.user.email || ''
    )
  ) {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [place, setPlace] = useState<
    { [key: string]: string | undefined } | undefined
  >(undefined);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const typeOptions = Object.values(TYPES).map(type => {
    return {
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
    };
  });

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    // no place id means that the input has been cleared
    if (!place.place_id) {
      setPlace(undefined);
      form.resetFields();
      return;
    }

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

  const handleAddSpot = async (values: {
    type: SpotType;
    visited: boolean;
    favourite: boolean;
  }) => {
    setIsSubmitting(true);

    const toastOptions: Partial<ArgsProps> = {
      duration: 2,
      placement: 'bottom',
    };

    if (place) {
      const data = {
        name: place.name,
        area: place.area,
        address: place.address,
        website: place.website,
        googlePlaceId: place.placeId,
        googleMapsLink: place.mapsLink,
        type: values.type,
        visited: values.visited,
        favourite: values.favourite,
      } satisfies Partial<NewSpot>;

      try {
        await axios.post('/api/spots', data);

        api.success({
          message: 'Place added',
          description: `${place.name} has been added!`,
          ...toastOptions,
        });
      } catch (e) {
        let errorMessage =
          'Cannot add place at this time, please try again later';

        if (axios.isAxiosError(e)) {
          const err = e as AxiosError;
          const data = err.response?.data as HttpErrorResponseData;

          if (data?.errorCode === ERROR_CODES.duplicateGooglePlaceId) {
            errorMessage = 'This place has already been added';
          }
        }

        api.error({
          message: 'Place cannot be added',
          description: errorMessage,
          ...toastOptions,
        });
      }
    } else {
      api.error({
        message: 'Place cannot be added',
        description: 'No place to add',
        ...toastOptions,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {contextHolder}
      <PageLayout headTitle="Add a place">
        <PageHeader />
        <div className="flex flex-wrap justify-center max-w-xl w-full mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">
            Look for a new place to add
          </h1>
          <Autocomplete onPlaceSelect={handlePlaceSelect} />
          {place && (
            <div className="w-full mt-4 p-4 bg-white rounded border-2 border-solid border-neutral-200">
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
              <Form
                layout="vertical"
                form={form}
                disabled={isSubmitting}
                onFinish={handleAddSpot}
              >
                <Form.Item
                  label="Type"
                  name="type"
                  className="mb-0"
                  rules={[
                    { required: true, message: 'The place type is required' },
                  ]}
                >
                  <Select placeholder="Select a type">
                    {typeOptions.map(type => (
                      <Select.Option
                        key={type.value}
                        color=""
                        value={type.value}
                      >
                        {type.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <div className="flex">
                  <Form.Item name="visited" valuePropName="checked">
                    <Checkbox>Visited</Checkbox>
                  </Form.Item>
                  <Form.Item name="favourite" valuePropName="checked">
                    <Checkbox>Favourite</Checkbox>
                  </Form.Item>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    Add spot
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>
        <PageFooter />
      </PageLayout>
    </>
  );
}
