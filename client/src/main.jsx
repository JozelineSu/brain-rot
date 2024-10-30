import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Discover from './pages/Discover.jsx';
import Profile from './pages/Profile.jsx';
import Rankings from './pages/Rankings.jsx';
import Comments from './pages/Comments.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Characters from './pages/Characters.jsx';
import Lists from './pages/Lists.jsx';
import NewCharacter from './pages/NewCharacter.jsx';
import NewList from './pages/NewList.jsx';

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
      },
      {
        path: '/comments',
        element: <Comments />
      },
      {
        path: '/createPost',
        element: <CreatePost />
      },
      {
        path: '/characters',
        element: <Characters />
      },
      {
        path: '/lists',
        element: <Lists />
      },
      {
        path: '/newCharacters',
        element: <NewCharacter />
      },
      {
        path: '/newLists',
        element: <NewList />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);