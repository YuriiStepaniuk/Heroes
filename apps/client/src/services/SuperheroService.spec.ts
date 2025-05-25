import { superHeroService } from './SuperheroService';
import ApiService from './ApiService';

jest.mock('./ApiService');

describe('SuperheroService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchSuperheroes calls ApiService.get with correct URL and params', async () => {
    (ApiService.get as jest.Mock).mockResolvedValue({ data: 'mocked' });
    const page = 2,
      limit = 10;

    await superHeroService.fetchSuperheroes(page, limit);

    expect(ApiService.get).toHaveBeenCalledWith(
      expect.stringContaining(`page=${page}&limit=${limit}`)
    );
  });

  it('createSuperhero calls ApiService.post with correct URL and data', async () => {
    (ApiService.post as jest.Mock).mockResolvedValue(undefined);
    const data = {
      nickname: 'Hero',
      realName: 'John',
      originDescription: '',
      superpowers: ['flight'],
      catchPhrase: 'Fly!',
    };

    await superHeroService.createSuperhero(data);

    expect(ApiService.post).toHaveBeenCalledWith(
      superHeroService['baseUrl'],
      data
    );
  });

  it('createSuperhero calls ApiService.post with correct URL and data', async () => {
    (ApiService.post as jest.Mock).mockResolvedValue(undefined);
    const data = {
      nickname: 'Hero',
      realName: 'John',
      originDescription: 'Born somewhere',
      superpowers: ['flight'],
      catchPhrase: 'Fly high!',
    };

    await superHeroService.createSuperhero(data);

    expect(ApiService.post).toHaveBeenCalledWith(
      superHeroService['baseUrl'],
      data
    );
  });

  it('updateSuperhero calls ApiService.patch with correct URL and data', async () => {
    (ApiService.patch as jest.Mock).mockResolvedValue(undefined);
    const id = '1';
    const data = { nickname: 'Updated Hero' };

    await superHeroService.updateSuperhero(id, data);

    expect(ApiService.patch).toHaveBeenCalledWith(
      `${superHeroService['baseUrl']}/${id}`,
      data
    );
  });

  it('uploadImage calls ApiService.uploadImage with correct URL and formData', async () => {
    (ApiService.uploadImage as jest.Mock).mockResolvedValue({
      image: { id: 1, path: '/img.png' },
    });
    const heroId = '1';
    const formData = new FormData();

    await superHeroService.uploadImage(heroId, formData);

    expect(ApiService.uploadImage).toHaveBeenCalledWith(
      `${superHeroService['baseUrl']}/${heroId}/images`,
      formData
    );
  });

  it('deleteSuperhero calls ApiService.delete with correct URL', async () => {
    (ApiService.delete as jest.Mock).mockResolvedValue(undefined);
    const id = '1';

    await superHeroService.deleteSuperhero(id);

    expect(ApiService.delete).toHaveBeenCalledWith(
      `${superHeroService['baseUrl']}/${id}`
    );
  });

  it('deleteHeroImage calls ApiService.delete with correct URL', async () => {
    (ApiService.delete as jest.Mock).mockResolvedValue(undefined);
    const heroId = '1';
    const imageId = '5';

    await superHeroService.deleteHeroImage(heroId, imageId);

    expect(ApiService.delete).toHaveBeenCalledWith(
      `${superHeroService['baseUrl']}/${heroId}/images/${imageId}`
    );
  });
});
