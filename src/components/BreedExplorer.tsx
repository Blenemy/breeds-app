"use client";

import { useState } from "react";
import BreedCard from "@/components/BreedCard";
import BreedSearch from "@/components/BreedSearch";
import { CatImage, DogImage } from "@/types/breed";

type PetImage = (CatImage | DogImage) & { animalType: "Cat" | "Dog" };

interface BreedExplorerProps {
  initialData: PetImage[];
}

const BreedExplorer: React.FC<BreedExplorerProps> = ({ initialData }) => {
  const [filteredBreeds, setFilteredBreeds] = useState<PetImage[]>(initialData);

  const handleSearch = (filteredBreeds: string[]) => {
    const filtered = initialData.filter((breed) =>
      filteredBreeds.includes(breed.breeds[0].name)
    );
    setFilteredBreeds(filtered);
  };

  const breedNames = initialData.map((breed) => breed.breeds[0].name);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold mb-4">Pet Breed Explorer</h1>
      <BreedSearch breeds={breedNames} onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBreeds.map((pet) => (
          <BreedCard
            breed={pet}
            key={pet.id}
            type={pet.animalType}
            isDetailed={false}
          />
        ))}
      </div>
    </main>
  );
};

export default BreedExplorer;
