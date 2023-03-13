import type { NextApiRequest, NextApiResponse } from 'next';
import { SpotService } from '@/services/spot/service';
import { NewSpot } from '@/services/spot/types';

const spotService = new SpotService();

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

  const spot = await spotService.addSpot(newSpot);

  res.status(200).json(spot);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      await createSpotHandler(req, res);
    }
  } catch (e) {
    console.error(e);
    res.status(500).end()
  }
};

export default handler;
