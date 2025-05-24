import { apiConfig } from '../config/configuration';

export const getImageUrl = (path?: string): string => {
  if (!path) return '/default.jpg';
  return `${apiConfig.BASE_URL}${path}`;
};
