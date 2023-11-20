import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Valilehdet from './components/Valilehdet';
import Kysely from './components/Kysely';
import Raportti from './components/Raportti';
import CssBaseline from '@mui/material/CssBaseline';

const router = createBrowserRouter([
  {
    element: <Valilehdet />,
    children: [
      {
        path: '/',
        element: null
      },
      {
        path: '/kysely',
        element: <Kysely />
      },
      {
        path: '/vastausraportti',
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

export default App
