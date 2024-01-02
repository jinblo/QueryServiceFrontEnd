import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Valilehdet from './components/Valilehdet';
import Kysely from './components/Kysely';
import Raportti from './components/Raportti';
import Valinta from './components/Valinta';
import CssBaseline from '@mui/material/CssBaseline';

const router = createBrowserRouter([
  {
    element: <Valilehdet />,
    children: [
      {
        path: '/',
        element: <Valinta />
      },
      {
        path: '/kysely/:id',
        element: <Kysely />
      },
      {
        path: '/vastausraportti/:id',
        element: <Raportti />
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <CssBaseline />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
