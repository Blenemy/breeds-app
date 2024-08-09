import BreedCard from "@/components/BreedCard";
import { dogService } from "../../data-access/fetchBreeds";
import Image from "next/image";
import { DogImage } from "@/types/breed";

export default async function DogsPage({
  params,
}: {
  params: {
    dogsId: string;
  };
}) {
  const dog = await dogService.fetchDogById(params.dogsId);
  if (!dog) {
    return <p>Dog not found.</p>;
  }

  const breedId = dog.breeds?.[0]?.id;
  const additionalImages = breedId
    ? await dogService.fetchDogBreedByType(breedId)
    : [];

  return (
    <main className="flex flex-col items-center p-24">
      <div className="mb-2">
        <BreedCard isDetailed breed={dog} type="Dog" />
      </div>

      {additionalImages.length > 0 && (
        <div className="flex gap-2">
          {additionalImages.map((breed: DogImage) => (
            <Image
              key={breed.id}
              src={breed.url}
              width={150}
              height={150}
              className="rounded object-cover w-[150px] h-[150px]"
              alt={`Image of ${breed.breeds?.[0]?.name || "Unknown Breed"}`}
            />
          ))}
        </div>
      )}
    </main>
  );
}
