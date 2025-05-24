import { AppRoutes } from '../routes/AppRoutes';
import {
  CreateSuperheroDto,
  PaginatedSuperhero,
  SuperheroResponse,
} from '../types/Superhero';
import ApiService from './ApiService';

class SuperheroService {
  private baseUrl = AppRoutes.Superheros;

  async fetchSuperheroes(page: number, limit: number) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return ApiService.get<PaginatedSuperhero>(
      `${this.baseUrl}?${params.toString()}`
    );
  }
  async fetchSuperheroById(id: string): Promise<SuperheroResponse> {
    return ApiService.get<SuperheroResponse>(`${this.baseUrl}/${id}`);
  }

  async createSuperhero(data: CreateSuperheroDto): Promise<void> {
    await ApiService.post(this.baseUrl, data);
  }

  async updateSuperhero(
    id: number | string,
    data: Partial<CreateSuperheroDto>
  ): Promise<void> {
    await ApiService.patch(`${this.baseUrl}/${id}`, data);
  }

  async uploadImage(
    heroId: number | string,
    formData: FormData
  ): Promise<{ image: { id: number; path: string } }> {
    return ApiService.uploadImage(`${this.baseUrl}/${heroId}/images`, formData);
  }

  async deleteSuperhero(id: number | string): Promise<void> {
    await ApiService.delete(`${this.baseUrl}/${id}`);
  }

  async deleteHeroImage(
    heroId: number | string,
    imageId: number | string
  ): Promise<void> {
    await ApiService.delete(`${this.baseUrl}/${heroId}/images/${imageId}`);
  }
}

export const superHeroService = new SuperheroService();
