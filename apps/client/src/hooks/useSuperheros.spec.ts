import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useSuperheroes from './useSuperheros';
import { superHeroService } from '../services/SuperheroService';
import { apiConfig } from '../config/configuration';

jest.mock('../services/SuperheroService');

describe('useSuperheroes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches superheroes and updates state', async () => {
    const mockData = {
      data: [
        {
          id: 1,
          nickname: 'Hero1',
          realName: 'Name1',
          originDescription: 'Origin1',
          superpowers: ['power1'],
          catchPhrase: 'Catchphrase1',
          images: [],
        },
      ],
      totalPages: 3,
      total: 10,
      page: 1,
      limit: apiConfig.PAGE_SIZE,
    };

    (superHeroService.fetchSuperheroes as jest.Mock).mockResolvedValue(
      mockData
    );

    const { result } = renderHook(() => useSuperheroes(1, false));

    expect(result.current.loading).toBe(true);
    expect(result.current.superheroes).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.superheroes).toEqual(mockData.data);
    expect(result.current.totalPages).toBe(mockData.totalPages);
  });

  it('handles fetch error and sets loading false', async () => {
    (superHeroService.fetchSuperheroes as jest.Mock).mockRejectedValue(
      new Error('API error')
    );
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useSuperheroes(1, false));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.superheroes).toBeNull();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to fetch superheroes:',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it('fetches again when page or refreshFlag changes', async () => {
    const mockDataPage1 = {
      data: [
        {
          id: 1,
          nickname: 'Hero1',
          realName: 'Name1',
          originDescription: 'Origin1',
          superpowers: ['power1'],
          catchPhrase: 'Catchphrase1',
          images: [],
        },
      ],
      totalPages: 2,
      total: 10,
      page: 1,
      limit: apiConfig.PAGE_SIZE,
    };
    const mockDataPage2 = {
      data: [
        {
          id: 2,
          nickname: 'Hero2',
          realName: 'Name2',
          originDescription: 'Origin2',
          superpowers: ['power2'],
          catchPhrase: 'Catchphrase2',
          images: [],
        },
      ],
      totalPages: 2,
      total: 10,
      page: 2,
      limit: apiConfig.PAGE_SIZE,
    };

    const fetchMock = superHeroService.fetchSuperheroes as jest.Mock;

    fetchMock
      .mockResolvedValueOnce(mockDataPage1)
      .mockResolvedValueOnce(mockDataPage2);

    const { result, rerender } = renderHook(
      ({ page, refreshFlag }) => useSuperheroes(page, refreshFlag),
      { initialProps: { page: 1, refreshFlag: false } }
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.superheroes).toEqual(mockDataPage1.data);

    rerender({ page: 2, refreshFlag: false });
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.superheroes).toEqual(mockDataPage2.data);

    fetchMock.mockResolvedValueOnce(mockDataPage1);

    rerender({ page: 2, refreshFlag: true });
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.superheroes).toEqual(mockDataPage1.data);
  });
});
