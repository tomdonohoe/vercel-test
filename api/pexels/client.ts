import { createClient, ErrorResponse, Photo} from 'pexels';

if (!process.env.PEXELS_API_KEY) {
    throw new Error('you must define PEXELS_API_KEY as environment variable');
};

const client = createClient(process.env.PEXELS_API_KEY);

export const findPhotoById = async (photoId: number): Promise<ErrorResponse | Photo> => {
    return await client.photos.show({
        id: photoId,
    });
}
