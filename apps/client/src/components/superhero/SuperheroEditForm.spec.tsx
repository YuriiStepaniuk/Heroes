import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SuperheroEditForm from './SuperheroEditForm';

const hero = {
  id: 1,
  nickname: 'Hero1',
  realName: 'Real Name',
  originDescription: 'Origin story',
  superpowers: ['flight', 'strength'],
  catchPhrase: 'Catchphrase!',
  images: [],
};

test('renders form with default values', () => {
  render(
    <SuperheroEditForm hero={hero} onClose={jest.fn()} onSave={jest.fn()} />
  );

  expect(screen.getByPlaceholderText(/nickname/i)).toHaveValue(hero.nickname);
  expect(screen.getByPlaceholderText(/real name/i)).toHaveValue(hero.realName);
  expect(screen.getByPlaceholderText(/origin description/i)).toHaveValue(
    hero.originDescription
  );
  expect(screen.getByPlaceholderText(/superpowers/i)).toHaveValue(
    hero.superpowers.join(', ')
  );
  expect(screen.getByPlaceholderText(/catchphrase/i)).toHaveValue(
    hero.catchPhrase
  );
});

test('calls onSave with updated data on submit', async () => {
  const onSave = jest.fn();
  render(<SuperheroEditForm hero={hero} onClose={jest.fn()} onSave={onSave} />);

  fireEvent.change(screen.getByPlaceholderText(/nickname/i), {
    target: { value: 'New Nick' },
  });
  fireEvent.change(screen.getByPlaceholderText(/superpowers/i), {
    target: { value: 'speed, invisibility' },
  });

  fireEvent.click(screen.getByRole('button', { name: /edit/i }));

  await waitFor(() => {
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        nickname: 'New Nick',
        superpowers: ['speed', 'invisibility'],
      })
    );
  });
});

test('calls onClose when cancel button clicked', () => {
  const onClose = jest.fn();
  render(
    <SuperheroEditForm hero={hero} onClose={onClose} onSave={jest.fn()} />
  );

  fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

  expect(onClose).toHaveBeenCalled();
});
