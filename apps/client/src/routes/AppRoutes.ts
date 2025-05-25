export const AppRoutes = {
  Root: '/',
  Superheros: '/superheros',
  SuperheroDetails: '/superheros/:id',
  NotFound: '*',

  getSuperheroImages: (heroId: number | string) =>
    `/superheros/${heroId}/images`,
  getSuperheroDetails: (id: number | string) => `/superheros/${id}`,
};
