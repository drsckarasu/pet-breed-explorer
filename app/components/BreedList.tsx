'use client'
import BreedCard from './BreedCard';
import { useEffect, useState } from 'react';
import { getCatDogBreedsLimit } from "../actions/getCatDogBreeds";
import { useInView } from 'react-intersection-observer';
import Search from './Search';

const NUMBER_OF_BREEDS_TO_FETCH = 10;

export default function BreedList({ initialBreeds }: any) {
    const [breeds, setBreeds] = useState(initialBreeds);
    const [page, setPage] = useState(1);
    const [searchStatus, setSearchStatus] = useState('');
    const { ref, inView } = useInView();

    const loadMoreBreeds = async () => {
        const apiBreeds = await getCatDogBreedsLimit(page, NUMBER_OF_BREEDS_TO_FETCH);
        setBreeds([...breeds, ...apiBreeds]);
        setPage(page + 1);
      };

    useEffect(() => {
        if (inView || searchStatus.length > 0) {
          loadMoreBreeds();
        }
    }, [inView, searchStatus]);
    return (
      <div className='flex flex-col gap-3'>
        <Search searchStatus={searchStatus} setSearchStatus={setSearchStatus}></Search>
        <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            {breeds.filter((breed: { name: string }) => breed.name.toLowerCase().includes(searchStatus.toLowerCase())).map((breed: { id: string | number }) => (
            <BreedCard key={breed.id} breed={breed} />
            ))}
        </div>
        <div className='flex space-x-2 justify-center items-center bg-white mt-5 dark:invert' ref={ref}>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
        </div>
      </div>
    )
  }