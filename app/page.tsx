'use server'
import { getCatDogBreedsLimit } from "./actions/getCatDogBreeds";
import BreedList from './components/BreedList'

const INITIAL_NUMBER_OF_EACH_BREED = 10;

export default async function Home() {
  const initialBreeds = await getCatDogBreedsLimit(0, INITIAL_NUMBER_OF_EACH_BREED);

  return (
    <BreedList initialBreeds={initialBreeds}/>
  );
}
