import { render, screen } from '@testing-library/react';
import HeroInfo from './HeroInfo';
import { SuperheroResponse } from '../../types/Superhero';

describe('HeroInfo component', () => {
  const mockHero: SuperheroResponse = {
    id: 1,
    nickname: 'Iron Man',
    realName: 'Tony Stark',
    originDescription: 'Genius billionaire who built a suit of armor',
    superpowers: ['Genius intellect', 'Powered armor suit', 'Flight'],
    catchPhrase: 'I am Iron Man',
    images: [],
  };

  it('renders the hero nickname as a heading', () => {
    render(<HeroInfo hero={mockHero} />);
    expect(
      screen.getByRole('heading', { name: /iron man/i })
    ).toBeInTheDocument();
  });

  it('displays real name', () => {
    render(<HeroInfo hero={mockHero} />);
    expect(screen.getByText(/real name:/i)).toBeInTheDocument();
    expect(screen.getByText(/tony stark/i)).toBeInTheDocument();
  });

  it('displays origin description', () => {
    render(<HeroInfo hero={mockHero} />);
    expect(
      screen.getByText(/genius billionaire who built a suit of armor/i)
    ).toBeInTheDocument();
  });

  it('lists superpowers', () => {
    render(<HeroInfo hero={mockHero} />);
    expect(
      screen.getByText(/genius intellect, powered armor suit, flight/i)
    ).toBeInTheDocument();
  });

  it('displays catchphrase', () => {
    render(<HeroInfo hero={mockHero} />);
    expect(screen.getByText(/i am iron man/i)).toBeInTheDocument();
  });
});
