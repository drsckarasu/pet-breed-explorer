import { getCatDogBreed, getCatDogBreedImages } from "../../actions/getCatDogBreeds";
import Image from "next/image";
import { notFound } from 'next/navigation';

export default async function Breed ({params}: {params: {name: string} }) {
    const id = params.name.split('%2B')[1];
    const breedId = !Number.isNaN(Number(id)) ? +id : id;
    const breed = await getCatDogBreed(breedId);
    const breedImages = await getCatDogBreedImages(breedId);
    const titleImg = breedImages.shift();

    if (!breed  || !breedImages) {
        notFound();
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8 mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                        <Image 
                            src={titleImg.url}
                            alt={breed.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{breed.name}</h2>
                        {breed.alt_names && <div className="mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">Alias:</span>
                            <span className="text-gray-600 dark:text-gray-300">{breed.alt_names}</span>
                        </div>}
                        {breed.bred_for && <div className="mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">Bred For:</span>
                            <span className="text-gray-600 dark:text-gray-300">{breed.bred_for}</span>
                        </div>}
                        {breed.breed_group && <div className="mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">Breed Group:</span>
                            <span className="text-gray-600 dark:text-gray-300">{breed.breed_group}</span>
                        </div>}
                        {breed.temperament && <div className="mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">Temperament:</span>
                            <span className="text-gray-600 dark:text-gray-300">{breed.temperament}</span>
                        </div>}
                        {breed.origin && <div className="mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">Origin:</span>
                            <span className="text-gray-600 dark:text-gray-300">{breed.origin}</span>
                        </div>}
                        {breed.life_span && <div className="mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">Life Span:</span>
                            <span className="text-gray-600 dark:text-gray-300">{breed.life_span}</span>
                        </div>}
                        {breed.wikipedia_url && <div className="mb-2">
                            <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">Wikipedia link:</span>
                            <span className="text-gray-600 dark:text-gray-300 text-sm"><a href={breed.wikipedia_url} className="truncate ..." target="_blank">{breed.wikipedia_url}</a></span>
                        </div>}
                        {breed.description && <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{breed.description}</p>
                        </div>}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2 pb-2">
                    {breedImages.map((img: { id: string, url: string }) => (
                        <div className="group cursor-pointer relative" key={img.id+img.id}>
                            <Image
                                key={img.id}
                                src={img.url}
                                alt={img.url}
                                width={400}
                                height={400}
                                className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-110"
                                />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}