import React from "react";
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SolidButton from "../buttons/SolidButton";

function ErrorModal({ isOpen, onClose, children }) {
  const { t } = useTranslation();

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
        <div
          className="bg-analytics-azule rounded-xl overflow-hidden shadow-lg
          transform transition-all max-w-2xl w-full mx-3"
        >
          <div className="bg-analytics-azule px-4 py-5 -b-2 sm:px-6 sm:py-4">
            <div className="flex justify-between items-center">
              <span className="text-xl xxl:text-3xl leading-6 ">
                {t("somethingWentWrong")}
              </span>
              <button
                type="button"
                className=" 
                focus:outline-none focus:ring-0 focus:ring-offset-0"
                onClick={onClose}
              >
                <XMarkIcon className="h-8 xxl:h-12" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-5 text-chiper-chartreuse font-semibold">
            {children}
          </div>
          <div className="bg-analytics-azule px-4 py-3 sm:px-6 sm:flex">
            <SolidButton type="button" onClick={onClose}>
              {t("close")}
            </SolidButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
