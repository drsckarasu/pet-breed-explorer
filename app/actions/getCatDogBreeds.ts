import { notFound } from 'next/navigation'

const getReferenceImgUrl = async (type: string , referenceId: string) => {
    const referenceUrlResponse = await fetch(`https://api.the${type}api.com/v1/images/${referenceId}`);
    const dataReferenceUrl = await referenceUrlResponse.json();
    return dataReferenceUrl.url;
}

export const getCatDogBreedsLimit = async (page: number, limit: number) => {
    try {
        const urlDog = `https://api.thedogapi.com/v1/breeds?page=${page}&limit=${limit}`;
        const urlCat = `https://api.thecatapi.com/v1/breeds?page=${page}&limit=${limit}`;
        const responseDog = await fetch(urlDog);
        const dataDog = await responseDog.json();
        const responseCat = await fetch(urlCat);
        const dataCat = await responseCat.json();
        const data = [...dataCat, ...dataDog];
        const dataStored = data.filter((img) => img?.reference_image_id != null).sort((a, b) => 0.5 - Math.random());
        for (let value of dataStored) {
            if (typeof value.id === 'number') {
                value.type = 'dog';
            } else {
                value.type = 'cat';
            }
            value.referenceUrl = await getReferenceImgUrl(value.type, value.reference_image_id);
        }
        return dataStored;
    } catch (error: unknown) {

        throw new Error(`An error happened: ${error}`) && notFound();
    }
};

export const getCatDogBreedImages = async (type: string, id: number | string) => {
    try {
        const API_KEY = 'live_A6UQNIp4S1Oer1v9RcOClXAuLhAfyDOpMGvk06vpOc2q5dHlu8LyTLULNUPaXgze';
        const urlCatDogBreedImages = `https://api.the${type}api.com/v1/images/search?limit=10&breed_ids=${id}&api_key=${API_KEY}`;
        const responseCatDogBreedImages = await fetch(urlCatDogBreedImages);
        const dataCatDogBreedImages = await responseCatDogBreedImages.json();
        return dataCatDogBreedImages;
    } catch (error: unknown) {
        throw new Error(`An error happened: ${error}`) && notFound();
    }
};

export const getCatDogBreed = async (type: string, id: number | string) => {
    try {
        const urlCatDogBreed = `https://api.the${type}api.com/v1/breeds/${id}`;
        const responseCatDogBreed = await fetch(urlCatDogBreed);
        const dataCatDogBreed = await responseCatDogBreed.json();
        return dataCatDogBreed;
    } catch (error: unknown) {
        throw new Error(`An error happened: ${error}`) && notFound();
    }
};