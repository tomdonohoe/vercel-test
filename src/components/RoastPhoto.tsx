import { FunctionComponent, useState, useEffect } from "react";

import { Categories, PhotoDetails, PhotosResponse, PexelsRes } from '../types';
import { getPhotoById } from '../helpers/api.helpers';
import { getPhotosByCategory, getRandomPhoto } from '../helpers/photos.helpers';

interface RoastPhotoProps {
    category: Categories;
    alreadyUsedIds: PhotoDetails[] | undefined;
    setAlreadyUsedIds: (usedPhoto: PhotoDetails) =>  void;
}

// Responsibility:
// takes a category from parent
// takes a list of already used photo IDs
// get's a new random photo from API based on category
// updates parent state with the new photo ID used

const RoastPhoto: FunctionComponent<RoastPhotoProps> = ({
    category,
    alreadyUsedIds,
    setAlreadyUsedIds,
}) => {
    const [photo, setPhoto] = useState<PexelsRes | undefined>(undefined);

    useEffect(() => {
        getPhoto();
    }, []);

    const getPhoto = async (): Promise<void> => {
        try {
            let photos = getPhotosByCategory(category);
            if (alreadyUsedIds) {
                photos = photos.filter(p => !alreadyUsedIds.includes(p))
                console.log(photos);
            }
            const randomPhoto = getRandomPhoto(photos);
            console.log(randomPhoto);

            setAlreadyUsedIds(randomPhoto);

            const res = await getPhotoById({ photoId: randomPhoto.id});

            if (res) {
                const data: PhotosResponse = await res.json();
                if (data.success) {
                setPhoto(data.data);
                }
            };
        } catch (err) {
            const errorResponse = err as Response;
            const error = await errorResponse.json();
            console.log(error);
        }
      }

    return (
        <div className="roast-photo">
        { photo && photo.src && (
          <img src={photo.src.landscape} alt={photo.alt} />
        )}
        <div className="roast-photo__meta">
            <span>Powered by Pexels.</span>
            <span>Photo by <a href={photo?.photographer_url}>{photo?.photographer}</a></span>
        </div>
        </div>
    )
};

export default RoastPhoto;
