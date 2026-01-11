import { createBrowserRouter, RouterProvider } from "react-router";
import Cart from "./features/cart/Cart";
import Menu from "./features/menu/Menu";
import { action, orderAction } from "./features/order/action";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import { getMenu, orderLoader } from "./services/apiRestaurant";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./ui/Home";
import Loader from "./ui/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    errorElement: <Error />,
    HydrateFallback: Loader,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu, loader: getMenu },
      { path: "cart", Component: Cart },
      { path: "/order/new", Component: CreateOrder, action: action },
      {
        path: "/order/:orderId",
        Component: Order,
        loader: orderLoader,
        action: orderAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
