import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SuperheroCreateForm, { CreateSuperheroDto } from './SuperheroCreateForm';

describe('SuperheroCreateForm', () => {
  const onClose = jest.fn();
  const onCreate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all fields and buttons', () => {
    render(<SuperheroCreateForm onClose={onClose} onCreate={onCreate} />);

    expect(screen.getByPlaceholderText(/nickname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/real name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/origin description/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/superpowers/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/catchphrase/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('calls onClose when cancel button clicked', () => {
    render(<SuperheroCreateForm onClose={onClose} onCreate={onCreate} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows validation errors if required fields are empty on submit', async () => {
    render(<SuperheroCreateForm onClose={onClose} onCreate={onCreate} />);

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });

    expect(onCreate).not.toHaveBeenCalled();
  });

  it('submits correct data with superpowers split into array', async () => {
    render(<SuperheroCreateForm onClose={onClose} onCreate={onCreate} />);

    fireEvent.change(screen.getByPlaceholderText(/nickname/i), {
      target: { value: 'HeroX' },
    });
    fireEvent.change(screen.getByPlaceholderText(/real name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/origin description/i), {
      target: { value: 'From Mars' },
    });
    fireEvent.change(screen.getByPlaceholderText(/superpowers/i), {
      target: { value: 'fly, invisibility, strength' },
    });
    fireEvent.change(screen.getByPlaceholderText(/catchphrase/i), {
      target: { value: 'To the skies!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(onCreate).toHaveBeenCalledWith({
        nickname: 'HeroX',
        realName: 'John Doe',
        originDescription: 'From Mars',
        superpowers: ['fly', 'invisibility', 'strength'],
        catchPhrase: 'To the skies!',
      });
    });
  });
});
