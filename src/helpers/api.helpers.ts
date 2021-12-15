import { photosRoute } from '../constants';

interface getPhotoByIdParams {
    photoId: number;
}

export async function getPhotoById(
    params: getPhotoByIdParams
  ): Promise<Response | void> {  
    const response = await fetch(`${photosRoute}?${new URLSearchParams(params as any)}`,
      {
        method: "GET",
      }
    );
  
    if (!response.ok) {
      return Promise.reject(response);
    }
  
    return response;
}
