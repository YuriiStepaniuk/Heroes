export const AppRoutes = {
  Root: '/',
  Superheros: '/superheros',
  SuperheroDetails: '/superheros/:id',

  getSuperheroImages: (heroId: number | string) =>
    `/superheros/${heroId}/images`,
  getSuperheroDetails: (id: number | string) => `/superheros/${id}`,
};
