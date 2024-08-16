import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProductInOrder from "../components/wrapers/products/ProductInOrder";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import SolidButton from "../components/buttons/SolidButton";

function OrderPaymentView() {
  const { t } = useTranslation();
  const { cart } = useContext(CartContext);
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

  // Вычисляем общую сумму заказа
  const totalSum = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="bg-white w-full rounded-lg mt-20 p-4">
      <div className="text-2xl font-semibold text-center border-b-2 border-black pb-3">
        {t("order")}
      </div>
      <div className="flex justify-between items-center border-b-2 border-black p-4">
        <div>
          <SolidButton>{t("pay")}</SolidButton>
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
