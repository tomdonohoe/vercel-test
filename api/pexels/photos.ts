import { createClient } from 'pexels';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const client = createClient(process.env.PEXELS_API_KEY);

export default async (request: VercelRequest, response: VercelResponse) => {
    if (request.query && !request.query.photoId) {
        response.status(400).send({
            success: false,
            errorMessage: 'you must provide photoId query parameter',
        });
    }

    try {
        const photo = await client.photos.show({ id: request.query.photoId as string });
        response.status(200).send({
            success: true,
            data: {
                ...photo
            },
        });
    } catch (err) {
        response.status(500).send({
            success: false,
            errorMessage: err,
        });
    }
};