import axios from "axios";
import { CatImage, DogImage } from "@/types/breed";

class ApiService {
  private readonly apiUrl: string;
  private readonly headers: Record<string, string>;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
  }

  protected async fetch<T>(endpoint: string): Promise<T> {
    const request = await axios.get(`${this.apiUrl}${endpoint}`, {
      headers: this.headers,
    });
    return request.data;
  }
}

class DogService extends ApiService {
  constructor() {
    super(
      "https://api.thedogapi.com/v1",
      "live_tcGmQxkIRv6CVz1XidjL7gisx34g34ki3pC4mqiCIiAZPHMxABPYFR3pj61GmzW3"
    );
  }

  async fetchDogs(): Promise<DogImage[]> {
    return this.fetch<DogImage[]>("/images/search?limit=10&has_breeds=1");
  }

  async fetchDogById(dogId: string): Promise<DogImage> {
    return this.fetch<DogImage>(`/images/${dogId}`);
  }

  async fetchDogBreedByType(breedType: number): Promise<DogImage[]> {
    return this.fetch<DogImage[]>(
      `/images/search?breed_ids=${breedType}&limit=3`
    );
  }
}

class CatService extends ApiService {
  constructor() {
    super(
      "https://api.thecatapi.com/v1",
      "live_qTdlKd197TgkTdl60IoT9TfNU6SRl2QayCgGYEh7yUfN3UAeagEx83epV4bK2mWC"
    );
  }

  async fetchCats(): Promise<CatImage[]> {
    return this.fetch<CatImage[]>("/images/search?limit=10&has_breeds=1");
  }

  async fetchCatById(catId: string): Promise<CatImage> {
    return this.fetch<CatImage>(`/images/${catId}`);
  }

  async fetchCatBreedByType(breedType: string): Promise<CatImage[]> {
    return this.fetch<CatImage[]>(
      `/images/search?breed_ids=${breedType}&limit=3`
    );
  }
}

export const dogService = new DogService();
export const catService = new CatService();
