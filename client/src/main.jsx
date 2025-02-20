import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

import Discover from './pages/Discover.jsx';
import SinglePost from './pages/SinglePost.jsx';

import Profile from './pages/Profile.jsx';
import UserProfile from './pages/UserProfile.jsx';

import EditPost from './pages/EditPost.jsx';
import EditCharacter from './pages/EditCharacter.jsx';

import Characters from './pages/Characters.jsx';
import UserCharacters from './pages/UserCharacters.jsx';

import CreatePost from './pages/CreatePost.jsx';
import CreateCharacter from './pages/CreateCharacter.jsx';

import SearchResults from './components/SearchResults/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Discover />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/me',
        element: <UserProfile />
      },
      {
        path: '/search/:tagText',
        element: <SearchResults/>
      },
      {
        path: '/profiles/:username',
        element: <Profile />
      },
      {
        path: '/myCharacters',
        element: <UserCharacters />
      },
      {
        path: '/characters/:username',
        element: <Characters />
      },
      {
        path: '/posts/:postId',
        element: <SinglePost />
      },
      {
        path: '/userpost/:postId',
        element: <EditPost />
      },
      {
        path: '/usercharacter/:characterId',
        element: <EditCharacter />
      },
      {
        path: '/createPost',
        element: <CreatePost />
      },
      {
        path: '/createCharacter',
        element: <CreateCharacter />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);