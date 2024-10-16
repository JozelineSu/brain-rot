import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Discover from './pages/Discover.jsx';
import Profile from './pages/Profile.jsx';
import Rankings from './pages/Rankings.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/discover',
        element: <Discover />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/rankings',
        element: <Rankings />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);