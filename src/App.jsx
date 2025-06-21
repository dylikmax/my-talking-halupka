import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import RootPage from "./routes/root/RootPage";
import GamePage from "./routes/games/GamePage";
import ShopPage from "./routes/shop/ShopPage";
import "./App.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Outlet/></>,
    children: [
      {
        path: "/",
        element: <RootPage/>,
      },
      {
        path: "/games",
        element: <GamePage/>,
      },
      {
        path: "/shop",
        element: <ShopPage/>,
      },
    ]
  },
]);

function App() {
  return <div className="app-layout"><RouterProvider router={router} /></div>;
}


export default App
