import { Link } from 'react-router-dom';
import { SuperheroCardResponse } from '../../types/Superhero';
import { getImageUrl } from '../../utils/getImagePath';
import { AppRoutes } from '../../routes/AppRoutes';

interface SuperheroCardProps {
  hero: SuperheroCardResponse;
}

const SuperheroCard: React.FC<SuperheroCardProps> = ({ hero }) => {
  return (
    <Link to={AppRoutes.getSuperheroDetails(hero.id)} className="block">
      <div className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition-shadow duration-300">
        <img
          src={getImageUrl(hero?.imagePath)}
          alt={hero.nickname}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {hero.nickname}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default SuperheroCard;
