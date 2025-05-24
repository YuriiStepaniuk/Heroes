import Superhero from './components/superhero/Superhero';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/UI/Layout';
import SuperheroDetails from './components/superhero/SuperheroDetails';
import { AppRoutes } from './routes/AppRoutes';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path={AppRoutes.Root}
            element={<Navigate to={AppRoutes.Superheros} replace />}
          />
          <Route path={AppRoutes.Superheros} element={<Superhero />} />
          <Route
            path={AppRoutes.SuperheroDetails}
            element={<SuperheroDetails />}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
