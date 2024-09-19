import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SolidButton from "../buttons/SolidButton";

function AccountReplenishmentModal({ isOpen, onClose }) {
  const { t } = useTranslation();

  const [amount, setAmount] = useState("");
  const [inputUsername, setInputUsername] = useState(""); 
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Input Username:", inputUsername);
    console.log("Amount:", amount);

    if (!amount || amount <= 0) {
      setError("Сумма должна быть больше нуля");
      return;
    }

    try {
      const response = await fetch(
        `https://8ybg5l.realhost-free.net/Payment/AddMoney?userName=${inputUsername}&count=${amount}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        console.log("Success:", data);
      } else {
        console.log("Success: No response body");
      }

      onClose();
    } catch (error) {
      console.error("Error:", error);
      setError("Что-то пошло не так или имя не правильное");
    }
  };

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
              <span className="text-xl xxl:text-3xl leading-6 ">
                {t("accountReplenishment")}
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
          <div className="px-48 py-6 flex flex-col items-center text-chiper-chartreuse font-semibold space-y-4">
            <label htmlFor="usernameInput">{t("username")}</label>
            <input
              id="usernameInput"
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="border-chiper-chartreuse b-2h-12 w-full pl-2 rounded-md text-xl border-b-4
               bg-transparent outline-none ring-0 text-chiper-chartreuse mb-4 
               placeholder:text-chiper-chartreuse focus:placeholder:text-chiper-chartreuse/60"
            />
            <label htmlFor="amountInput">{t("amount")}</label>
            <input
              id="amountInput"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-chiper-chartreuse b-2h-12 w-full pl-2 rounded-md text-xl border-b-4
               bg-transparent outline-none ring-0 text-chiper-chartreuse mb-4 
               placeholder:text-chiper-chartreuse focus:placeholder:text-chiper-chartreuse/60"
            />
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="bg-analytics-azule px-4 py-3 sm:px-6 space-y-2">
            <SolidButton type="submit" onClick={handleSubmit}>
              {t("replenish")}
            </SolidButton>
            <SolidButton type="button" onClick={onClose}>
              {t("close")}
            </SolidButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountReplenishmentModal;
