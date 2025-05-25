import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useSuperheroDetails from '../hooks/useSuperheroDetails';
import { superHeroService } from '../services/SuperheroService';

jest.mock('../services/SuperheroService');

describe('useSuperheroDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches superhero data and updates state', async () => {
    const mockHero = {
      id: 1,
      nickname: 'HeroX',
      realName: 'John Doe',
      originDescription: 'Origin story',
      superpowers: ['flight'],
      catchPhrase: 'Up, up and away!',
    };

    (superHeroService.fetchSuperheroById as jest.Mock).mockResolvedValue(
      mockHero
    );

    const { result } = renderHook(() => useSuperheroDetails('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.hero).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.hero).toEqual(mockHero);
  });

  it('does not fetch when id is undefined', () => {
    const { result } = renderHook(() => useSuperheroDetails(undefined));

    expect(result.current.loading).toBe(false);
    expect(result.current.hero).toBeNull();

    expect(superHeroService.fetchSuperheroById).not.toHaveBeenCalled();
  });

  it('handles fetch error gracefully', async () => {
    (superHeroService.fetchSuperheroById as jest.Mock).mockRejectedValue(
      new Error('API error')
    );

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useSuperheroDetails('1'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.hero).toBeNull();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to fetch superhero details:',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
