import React from "react";
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SolidButton from "../buttons/SolidButton";
import FormInput from "../inputs/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUsers } from "../../context/UserContext";

function AccountReplenishmentModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const user = useUsers();
  const username = user;

  const ReplenishmentSchema = Yup.object().shape({
    creditCard: Yup.number().required(),
    cardDate: Yup.number().required(),
    cardCVV: Yup.number().required(),
    amount: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      creditCard: "",
      cardDate: "",
      cardCVV: "",
      amount: "",
    },
    validationSchema: ReplenishmentSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `http://8ybg5l.realhost-free.net/Payment/AddMoney?userName=${username}&count=${values.amount}`,
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

        const data = await response.json();
        console.log("Success:", data);
        onClose(); // Закрытие модального окна
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed h-screen z-30 inset-0 overflow-y-auto">
      <div
        className="flex items-center justify-center min-h-screen 
        text-chiper-chartreuse font-semibold"
      >
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-analytics-azule rounded-xl overflow-hidden shadow-lg
          transform transition-all max-w-2xl w-full mx-3"
        >
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
          <div className="p-6 space-y-5 text-chiper-chartreuse font-semibold">
            <FormInput
              type="number"
              name="creditCard"
              value={formik.values.creditCard}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="creditCard"
              error={formik.touched.creditCard && formik.errors.creditCard}
              style={{ "-moz-appearance": "textfield" }}
              onWheel={(e) => e.target.blur()}
            />
            <div className="flex justify-between w-full space-x-4 ">
              <FormInput
                type="number"
                name="cardDate"
                value={formik.values.cardDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="cardDate"
                error={formik.touched.cardDate && formik.errors.cardDate}
                style={{ "-moz-appearance": "textfield" }}
                onWheel={(e) => e.target.blur()}
              />
              <FormInput
                type="number"
                name="cardCVV"
                value={formik.values.cardCVV}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="cardCVV"
                error={formik.touched.cardCVV && formik.errors.cardCVV}
                style={{ "-moz-appearance": "textfield" }}
                onWheel={(e) => e.target.blur()}
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <span>{t("replenishmentAmount")}</span>
              <div>
                <FormInput
                  type="number"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="amount"
                  error={formik.touched.amount && formik.errors.amount}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            </div>
          </div>
          <div className="bg-analytics-azule px-4 py-3 sm:px-6 sm:flex">
            <SolidButton type="submit">{t("submit")}</SolidButton>
            <SolidButton type="button" onClick={onClose}>
              {t("close")}
            </SolidButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountReplenishmentModal;
