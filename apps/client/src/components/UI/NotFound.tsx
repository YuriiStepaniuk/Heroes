import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 className="text-6xl font-bold mb-4">404</h1>
    <p className="text-xl mb-6">
      Oops! The page you’re looking for does not exist.
    </p>
    <Link to="/" className="text-blue-600 hover:underline">
      Go back home
    </Link>
  </div>
);

export default NotFound;
