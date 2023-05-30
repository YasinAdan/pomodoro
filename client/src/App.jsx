import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/home";

import "./App.scss";
import Signup from './pages/signup';
import Login from './pages/login';
import Zone from './pages/zone';
import Error from './pages/error';

import { setAuth, userData } from './reducers/user';
import { useSelector } from 'react-redux';
import Sessions from "./pages/sessions";
import About from "./pages/about";




// render zone page only if user is logged in

const RenderZone = () => {
  const auth = useSelector(state => state.user.auth);

  if (auth) {
    return <Zone />
  } else {
    // redirect to login page
    return (
      <div className="error-zone">
        <Error data="You are not logged in. Please log in to access this page." />
        <Link to="/login" className="rdl-link">login</Link>

      </div>
    )
  }

}


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // if user is not logged in, redirect to login page

      {
        path: "/zone",
        element: <RenderZone />,
      },
      {
        path: "/sessions",
        element: <Sessions />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/error",
        element: <Error data="hello, testing message"/>,
      },
    ]
  },
]);

function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  )
}

export default App
