import { photos } from '../constants/photo.constants';
import {
    Categories,
    SubCategories,
    PhotoDetails
} from '../types'

export const getPhotosByCategory = (category: Categories): PhotoDetails[]  => {
    return photos[category];
}

export const getPhotosByCategoryAndSubCategory = (category: Categories, subCategory: SubCategories): PhotoDetails[]  => {
    return photos[category].filter(photo => photo.category === subCategory);
}

export const getRandomPhoto = (photos: PhotoDetails[]): PhotoDetails => {
    return photos[Math.floor(Math.random() * photos.length)];
}
