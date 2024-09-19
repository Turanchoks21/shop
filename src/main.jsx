import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./i18n";
import { UsersProvider } from "./context/UserContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import App from "./App.jsx";
import HomeView from "./views/HomeView.jsx";
import LoginView from "./views/LoginView.jsx";
import RegisterView from "./views/RegisterView.jsx";
import OrderPaymentView from "./views/OrderPaymentView.jsx";
import FavoriteView from "./views/FavoriteView.jsx";
import HistoryView from "./views/HistoryView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "login",
        element: <LoginView />,
      },
      {
        path: "register",
        element: <RegisterView />,
      },
      {
        path: "order",
        element: <OrderPaymentView />,
      },
      {
        path: "favorite",
        element: <FavoriteView />,
      },
      {
        path: "history",
        element: <HistoryView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </CartProvider>
  </React.StrictMode>
);
