import { CatImage, DogImage } from "@/types/breed";
import Image from "next/image";
import Link from "next/link";

type Breed = "Cat" | "Dog";

interface BreedCardProps {
  breed: DogImage | CatImage;
  type: Breed;
  isDetailed: boolean;
}

const getStartingUrl = (type: Breed): string => {
  return type === "Cat" ? "/cats/" : "/dogs/";
};

const getBreedSpecificDetails = (breed: DogImage | CatImage, type: Breed) => {
  const { life_span, temperament, weight, origin } = breed.breeds[0];
  return (
    <>
      <p className="text-gray-700 dark:text-gray-400">
        <strong>Life Span:</strong> {life_span}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <strong>Temperament:</strong> {temperament}
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <strong>Weight:</strong> {weight.imperial} lbs
      </p>
      <p className="text-gray-700 dark:text-gray-400">
        <strong>Origin:</strong> {origin || "N/A"}
      </p>
      {type === "Dog" && (
        <p className="text-gray-700 dark:text-gray-400">
          <strong>Height:</strong>{" "}
          {(breed as DogImage).breeds[0].height.imperial} inches
        </p>
      )}
    </>
  );
};

const BreedCard: React.FC<BreedCardProps> = ({ breed, type, isDetailed }) => {
  const startingUrl = getStartingUrl(type);
  const breedName = breed.breeds[0]?.name || "Unknown Breed";

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`${startingUrl}${breed.id}`}>
        <Image
          className="rounded-t-lg h-[250px] object-cover"
          src={breed.url}
          width={breed.width}
          height={250}
          alt={`Picture of ${breedName}`}
          priority
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {breedName}
        </h5>

        {isDetailed ? (
          <div className="mb-3">{getBreedSpecificDetails(breed, type)}</div>
        ) : (
          <Link
            href={`${startingUrl}${breed.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BreedCard;
