import type { VercelRequest, VercelResponse } from '@vercel/node';

import { findPhotoById } from './client';
import { ApiResponse } from './types';

export default async (request: VercelRequest, response: VercelResponse) => {
    if (request.query && !request.query.photoId) {
        const res: ApiResponse = {
            success: false,
            errorMessage: 'you must provide photoId query parameter',
        };
        response.status(400).send(res);
    }

    const photoId = Number(request.query.photoId);

    try {
        const photo = await findPhotoById(photoId);
        const res: ApiResponse = {
            success: true,
            data: {
                ...photo
            },
        };
        response.status(200).send(res);
    } catch (err) {
        const error: Error = err;
        const res: ApiResponse = {
            success: false,
            errorMessage: error.message,
        };
        response.status(500).send(res);
    }
};
