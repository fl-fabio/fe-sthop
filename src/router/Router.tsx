import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Handler from "../pages/Handler/Handler";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        
        { path: "login", element: <Login /> },
      ],
    },
    { path: "/handler", element: <Handler /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
