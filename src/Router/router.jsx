import {
  createBrowserRouter
 
} from "react-router";
import MainLayout from "../Component/MainLayout/MainLayout";
import ErrorPage from "../Component/MainLayout/Errorpage";
import Home from "../Component/Pages/Home";
import Login from "../Component/Pages/Login";
import Register from "../Component/Pages/Register";
import AvailableFoods from "../Component/Pages/AvailableFoods";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/available-foods",
        Component: AvailableFoods,
      },
    ]

  },
   {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    }

]);




