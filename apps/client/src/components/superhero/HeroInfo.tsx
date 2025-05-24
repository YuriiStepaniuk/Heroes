import { SuperheroResponse } from '../../types/Superhero';

interface HeroInfoProps {
  hero: SuperheroResponse;
}

const HeroInfo: React.FC<HeroInfoProps> = ({ hero }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{hero.nickname}</h2>
      <p>
        <strong>Real Name:</strong> {hero.realName}
      </p>
      <p>
        <strong>Origin:</strong> {hero.originDescription}
      </p>
      <p>
        <strong>Superpowers:</strong> {hero.superpowers.join(', ')}
      </p>
      <p>
        <strong>Catchphrase:</strong> {hero.catchPhrase}
      </p>
    </div>
  );
};

export default HeroInfo;
