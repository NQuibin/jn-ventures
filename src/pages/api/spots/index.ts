import type { NextApiRequest, NextApiResponse } from 'next';
import type { NewSpot, SpotType } from '@/services/spot/types';

import { SpotService } from '@/services/spot/service';
import { SpotServiceError } from '@/services/spot/errors';
import { BadRequestError, HttpError } from '@/utils/apiErrors';

const spotService = new SpotService();

interface ListSpotsQueryString {
  type?: string;
  visited?: string;
  favourite?: string;
  area?: string;
}

const listSpotsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const queryParams = req.query as ListSpotsQueryString;
  const filters = {
    type: queryParams.type as SpotType,
    visited:
      queryParams.visited === undefined
        ? undefined
        : queryParams.visited === 'true',
    favourite:
      queryParams.favourite === undefined
        ? undefined
        : queryParams.favourite === 'true',
    area: queryParams.area as string,
  };

  const spot = await spotService.listSpots(filters);
  res.status(200).json(spot);
};

const createSpotHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  const newSpot = {
    name: body.name,
    type: body.type,
    area: body.area,
    address: body.address,
    website: body.website || undefined,
    googlePlaceId: body.googlePlaceId,
    googleMapsLink: body.googleMapsLink,
    visited: body.visited || false,
    favourite: body.favourite || false,
  } satisfies NewSpot;

  try {
    const spot = await spotService.addSpot(newSpot);
    res.status(200).json(spot);
  } catch (e) {
    if (e instanceof SpotServiceError) {
      throw new BadRequestError(e.message, e.errorCode);
    }

    throw e;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      await listSpotsHandler(req, res);
    } else if (req.method === 'POST') {
      await createSpotHandler(req, res);
    }
  } catch (e) {
    console.error(e);

    if (e instanceof HttpError) {
      res.status(e.statusCode).json({
        message: e.message,
        statusCode: e.statusCode,
        errorCode: e.errorCode,
      });
    } else {
      res.status(500).end();
    }
  }
};

export default handler;
