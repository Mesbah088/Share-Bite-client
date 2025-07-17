import {
  createBrowserRouter
 
} from "react-router";
import MainLayout from "../Component/MainLayout/MainLayout";
import ErrorPage from "../Component/MainLayout/Errorpage";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage/>
  },

]);




