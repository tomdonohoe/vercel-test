import { createClient, ErrorResponse, Photo} from 'pexels';

const client = createClient(process.env.PEXELS_API_KEY);

export const findPhotoById = async (photoId: number): Promise<ErrorResponse | Photo> => {
    return await client.photos.show({
        id: photoId,
    });
}
