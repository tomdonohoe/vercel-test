import { createClient, ErrorResponse } from 'pexels';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const client = createClient(process.env.PEXELS_API_KEY);

export default async (request: VercelRequest, response: VercelResponse) => {
    if (request.query && !request.query.photoId) {
        response.status(400).send({
            success: false,
            errorMessage: 'you must provide photoId query parameter',
        });
    }

    const photoId = Number(request.query.photoId);

    try {
        const photo = await client.photos.show({ id: photoId });
        response.status(200).send({
            success: true,
            data: {
                ...photo
            },
        });
    } catch (err) {
        const e = await err.json();
        response.status(500).send({
            success: false,
            errorMessage: e,
        });
    }
};