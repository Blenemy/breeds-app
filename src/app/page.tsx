import BreedCard from "@/components/BreedCard";
import { catService, dogService } from "./data-access/fetchBreeds";
import { CatImage, DogImage } from "@/types/breed";
import BreedExplorer from "@/components/BreedExplorer";

type PetImage = (CatImage | DogImage) & { animalType: "Cat" | "Dog" };

export default async function Home() {
  let errorOccurred = false;
  let combinedData: PetImage[] = [];

  try {
    const [dogData, catData] = await Promise.all([
      dogService.fetchDogs(),
      catService.fetchCats(),
    ]);

    const formattedDogData: PetImage[] = dogData.map((dog) => ({
      ...dog,
      animalType: "Dog",
    }));

    const formattedCatData: PetImage[] = catData.map((cat) => ({
      ...cat,
      animalType: "Cat",
    }));

    combinedData = [...formattedDogData, ...formattedCatData].sort(
      () => Math.random() - 0.5
    );
  } catch (error) {
    errorOccurred = true;
  }

  if (errorOccurred) {
    return (
      <p className="text-red-500">
        Failed to load pet data. Please try again later.
      </p>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <BreedExplorer initialData={combinedData} />;
    </main>
  );
}
