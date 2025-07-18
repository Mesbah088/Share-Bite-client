import {
  createBrowserRouter

} from "react-router";
import MainLayout from "../Component/MainLayout/MainLayout";
import ErrorPage from "../Component/MainLayout/Errorpage";
import Home from "../Component/Pages/Home";
import Login from "../Component/Pages/Login";
import Register from "../Component/Pages/Register";
import AvailableFoods from "../Component/Pages/AvailableFoods";
import AddFood from "../Component/Pages/AddFood";
import FoodRequests from "../Component/Pages/FoodRequest";
import ManageFoods from "../Component/Pages/ManageFoods";
import FoodDetails from "../Component/Pages/FoodDetails";
import MyRequests from "../Component/Pages/MyRequests";
import PrivateRoute from "./PrivateRoute";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/available-foods",
       element: <PrivateRoute> <AvailableFoods/> </PrivateRoute>
      },
      {
        path: "/add-food",
        element: <PrivateRoute> <AddFood/> </PrivateRoute>
      },
      {
        path: "/food-requests",
        Component: FoodRequests,
      },
      {
        path: "/manage-foods",
        Component: ManageFoods,
      },
      {
        path: "/food/:id",
        element: <PrivateRoute> <FoodDetails/> </PrivateRoute>
      },
      {
        path: "/my-requests",
        Component: MyRequests,
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




