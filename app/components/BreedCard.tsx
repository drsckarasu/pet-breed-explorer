
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Breed {
    key: string | number;
    name: string;
    id: string | number;
    referenceUrl: string;
};

export default function BreedCard({ breed: {name, id , referenceUrl} }: any = {}) {
    const router = useRouter();
    const handleCick = () => {
        router.push(`/breeds/${id}`);
    }
    return (
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <Image
                src={referenceUrl}
                alt={name}
                width={300}
                height={300}
                onClick={handleCick}
                className="h-80 w-72 object-fill rounded-t-xl"
                />
            <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">Breed</span>
                <p className="text-lg font-bold text-black block capitalize">{name}</p>
            </div>
        </div>
       
    )
  }