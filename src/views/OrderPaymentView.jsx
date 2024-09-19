import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProductInOrder from "../components/wrapers/products/ProductInOrder";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext"; 
import SolidButton from "../components/buttons/SolidButton";

function OrderPaymentView() {
  const { t } = useTranslation();
  const { cart } = useContext(CartContext); 
  const { users } = useUsers(); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      if (cart.length === 0) {
        navigate("/");
      }
    }
  }, [navigate]);

  const totalSum = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  const handlePayment = async () => {
    const userName = users.length > 0 ? users[0].username : "guest";
    const productParams = cart
      .map((product) => `${encodeURIComponent(product.name)}=${product.count}`)
      .join("&");

    const paymentUrl = `https://8ybg5l.realhost-free.net/Payment/Payment?userName=${encodeURIComponent(
      userName
    )}&${productParams}`;

    try {
      const response = await fetch(paymentUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Успех:", result);

      navigate("/order-confirmation");
    } catch (error) {
      console.error("Ошибка при оплате:", error);
    }
  };

  return (
    <div className="bg-white w-full rounded-lg mt-20 p-4">
      <div className="text-2xl font-semibold text-center border-b-2 border-black pb-3">
        {t("order")}
      </div>
      <div className="flex justify-between items-center border-b-2 border-black p-4">
        <div>
          <SolidButton onClick={handlePayment}>{t("pay")}</SolidButton>
        </div>
        <div className="text-xl">
          {t("total")}: {totalSum.toFixed(2)}
        </div>
      </div>
      <div className="mt-10 lg:px-20">
        <ul className="space-y-5">
          {cart.map((product) => (
            <li key={product.id}>
              <ProductInOrder
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                imageId={product.imageId}
                game={product.game}
                count={product.count}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderPaymentView;
