export type PaginatedSuperhero = {
  data: SuperheroCardResponse[];
  total: number;
  totalPages: number;
  limit: number;
  page: number;
};

export type SuperheroResponse = {
  id: number;
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string[];
  catchPhrase: string;
  images: SuperheroImage[];
};

type SuperheroImage = {
  id: number;
  path: string;
};

export type SuperheroCardResponse = {
  id: number;
  nickname: string;
  imagePath: string;
};

export interface CreateSuperheroDto {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string[];
  catchPhrase: string;
}
