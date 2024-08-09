import BreedCard from "@/components/BreedCard";
import { catService } from "../../data-access/fetchBreeds";
import { CatImage } from "@/types/breed";
import Image from "next/image";

export default async function CatsPage({
  params,
}: {
  params: {
    catsId: string;
  };
}) {
  const cat = await catService.fetchCatById(params.catsId);
  if (!cat) {
    return <p>Cat not found.</p>;
  }

  const breedId = cat.breeds?.[0]?.id;
  const additionalImages = breedId
    ? await catService.fetchCatBreedByType(breedId)
    : [];

  return (
    <main className="flex flex-col items-center p-24">
      <div className="mb-2">
        <BreedCard isDetailed breed={cat} type="Cat" />
      </div>

      {additionalImages.length > 0 && (
        <div className="flex gap-2">
          {additionalImages.map((breed: CatImage) => (
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
