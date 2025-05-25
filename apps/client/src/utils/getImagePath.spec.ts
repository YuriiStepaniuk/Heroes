import { getImageUrl } from './getImagePath';
import { apiConfig } from '../config/configuration';

describe('getImageUrl', () => {
  it('returns default image path if no path is provided', () => {
    expect(getImageUrl()).toBe('/default.jpg');
    expect(getImageUrl(undefined)).toBe('/default.jpg');
  });

  it('returns full URL combining BASE_URL and path', () => {
    const path = '/images/hero.png';
    const expected = `${apiConfig.BASE_URL}${path}`;
    expect(getImageUrl(path)).toBe(expected);
  });
});
