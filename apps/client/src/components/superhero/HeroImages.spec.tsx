import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('../../utils/getImagePath', () => ({
  __esModule: true,
  getImageUrl: jest.fn((path: string) => {
    console.log('Mocked getImageUrl called with:', path);
    return `http://test.com${path}`;
  }),
}));

import HeroImages from './HeroImages';

describe('HeroImages', () => {
  const images = [
    { id: 1, path: '/img1.jpg' },
    { id: 2, path: '/img2.jpg' },
  ];
  const altText = 'Superhero image';
  const onDeleteImage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onDeleteImage with the correct id when delete button is clicked', () => {
    render(
      <HeroImages
        images={images}
        altText={altText}
        onDeleteImage={onDeleteImage}
      />
    );

    const deleteButtons = screen.getAllByRole('button', {
      name: /delete image/i,
    });
    expect(deleteButtons.length).toBe(images.length);

    fireEvent.click(deleteButtons[0]);
    expect(onDeleteImage).toHaveBeenCalledWith(images[0].id);

    fireEvent.click(deleteButtons[1]);
    expect(onDeleteImage).toHaveBeenCalledWith(images[1].id);
  });

  it('renders nothing if images array is empty', () => {
    const { container } = render(
      <HeroImages images={[]} altText={altText} onDeleteImage={onDeleteImage} />
    );
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
