import type { VercelRequest, VercelResponse } from '@vercel/node';

import { createTokenRequest } from './client';
import { ApiResponse } from '../types';

export default async (request: VercelRequest, response: VercelResponse) => {
    const token = await createTokenRequest();

    if (!token) {
        const res: ApiResponse = {
            success: false,
        };
        response.status(500).send(res);
    }

    response.status(200).send({
        ...token
    });
};
