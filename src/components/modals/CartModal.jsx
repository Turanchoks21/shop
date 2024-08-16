import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SolidButton from "../buttons/SolidButton";
import ProductInCart from "../wrapers/products/ProductInCart";
import { t } from "i18next";

function CartModal({ isOpen, onClose }) {
  const { cart } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <div className="fixed h-screen z-30 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen text-chiper-chartreuse font-semibold">
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>
        <div className="bg-analytics-azule rounded-xl overflow-hidden shadow-lg transform transition-all max-w-2xl w-full mx-3">
          <div className="bg-analytics-azule px-4 py-5 -b-2 sm:px-6 sm:py-4">
            <div className="flex justify-between items-center">
              <span className="text-xl xxl:text-3xl leading-6">
                Ваша корзина
              </span>
              <button
                type="button"
                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                onClick={onClose}
              >
                <XMarkIcon className="h-8 xxl:h-12" />
              </button>
            </div>
          </div>
          <div className="mx-4 lg:mx-6 text-black font-semibold max-h-96 rounded-lg overflow-y-auto scrollbar-hide">
            {cart.length > 0 ? (
              <ul className="space-y-2">
                {cart.map((item, index) => (
                  <li key={index}>
                    <ProductInCart
                      name={item.name}
                      price={item.price}
                      id={item.id}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-5 text-center text-white font-semibold text-xl">
                {t("yourCartIsEmpty")}
              </p>
            )}
          </div>
          <div className="bg-analytics-azule px-4 py-3 sm:px-6 sm:flex">
            {cart.length > 0 ? (
              <SolidButton type="button" onClick={onClose} to="order">
                Прейти к оплате
              </SolidButton>
            ) : (
              <SolidButton type="button" onClick={onClose}>
                {t("close")}
              </SolidButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
