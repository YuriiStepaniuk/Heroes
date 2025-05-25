import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageUpload from './ImageUpload';
import { superHeroService } from '../services/SuperheroService';

jest.mock('../services/SuperheroService', () => ({
  superHeroService: {
    uploadImage: jest.fn(),
  },
}));

describe('ImageUpload', () => {
  const mockOnImageUploaded = jest.fn();
  const heroId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uploads file and calls onImageUploaded on success', async () => {
    const fakeImage = { id: 1, path: '/some/path.jpg' };
    (superHeroService.uploadImage as jest.Mock).mockResolvedValue({
      image: fakeImage,
    });

    render(
      <ImageUpload heroId={heroId} onImageUploaded={mockOnImageUploaded} />
    );

    const file = new File(['dummy content'], 'photo.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText(/uploading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(superHeroService.uploadImage).toHaveBeenCalledWith(
        heroId,
        expect.any(FormData)
      );

      expect(mockOnImageUploaded).toHaveBeenCalledWith(fakeImage);

      expect(screen.queryByText(/uploading.../i)).not.toBeInTheDocument();

      expect(input.value).toBe('');
    });
  });

  it('shows error message on upload failure', async () => {
    (superHeroService.uploadImage as jest.Mock).mockRejectedValue(
      new Error('Upload failed')
    );

    render(
      <ImageUpload heroId={heroId} onImageUploaded={mockOnImageUploaded} />
    );

    const file = new File(['dummy content'], 'photo.png', {
      type: 'image/png',
    });
    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText(/uploading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/failed to upload image/i)).toBeInTheDocument();
    });

    expect(mockOnImageUploaded).not.toHaveBeenCalled();

    expect(screen.queryByText(/uploading.../i)).not.toBeInTheDocument();

    expect(input.value).toBe('');
  });

  it('does nothing if no file is selected', () => {
    render(
      <ImageUpload heroId={heroId} onImageUploaded={mockOnImageUploaded} />
    );
    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement;

    fireEvent.change(input, { target: { files: [] } });

    expect(superHeroService.uploadImage).not.toHaveBeenCalled();
    expect(mockOnImageUploaded).not.toHaveBeenCalled();
  });
});
