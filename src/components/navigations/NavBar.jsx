import React, { useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import NavButton from "../buttons/NavButton";
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import clsx from "clsx";
import CartModal from "../modals/CartModal";
import { CartContext } from "../../context/CartContext";
import { useUsers } from "../../context/UserContext";

function NavBar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReplenishmentModal, setIsReplenishmentModal] = useState(false);
  const [balance, setBalance] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { cart, getTotalItemCount } = useContext(CartContext);
  const { users } = useUsers();
  const username = users.length > 0 ? users[0] : "Guest";

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function toggleCartModal() {
    setIsCartModalOpen(!isCartModalOpen);
  }

  function toggleReplenishmentModal() {
    setIsReplenishmentModal(!isReplenishmentModal);
  }

  const languages = ["ru", "en"];
  const [currentLangIndex, setCurrentLangIndex] = useState(
    languages.indexOf(i18n.language)
  );

  function changeLanguage() {
    const nextLangIndex = (currentLangIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextLangIndex]);
    setCurrentLangIndex(nextLangIndex);
  }

  return (
    <>
      <div
        className="fixed items-center top-0 left-0 z-10 w-full mx-auto px-2 xxl:py-5 md:px-6 2lg:px-56 
      bg-analytics-azule
      border-blue-purple transition-color ease-in-out duration-500
      text-white
      "
      >
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Bars3Icon
              className="h-8 text-chiper-chartreuse"
              onClick={toggleMenu}
            />
          </div>
          <div className="flex-1 flex justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/">
                <Logo />
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex space-x-3 items-center">
              <Link to="/login">
                <ArrowRightOnRectangleIcon className="h-8 text-chiper-chartreuse" />
              </Link>
              <button onClick={toggleCartModal} className="relative">
                <ShoppingCartIcon className="h-7 text-chiper-chartreuse" />
                {getTotalItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItemCount()}
                  </span>
                )}
              </button>
              <button
                className="text-xl font-semibold text-chiper-chartreuse hidden sm:block"
                onClick={changeLanguage}
              >
                {i18n.language.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mob menu */}
      <div
        className={clsx("fixed z-20 inset-0 bg-gray-800/65 ", {
          hidden: !isMenuOpen,
        })}
        onClick={toggleMenu}
      />
      <div
        className={clsx(
          "fixed inset-0 bg-analytics-azule z-30 transform transition-all duration-500",
          { "-translate-x-full": !isMenuOpen, "-translate-x-[50%]": isMenuOpen }
        )}
      >
        <div className="">
          <div className="flex justify-between w-full">
            <div className="w-full" />
            <div className="flex w-full flex-col items-center gap-y-4">
              <div className="border-b w-full p-2 text-chiper-chartreuse">
                <div className="flex justify-end ">
                  <button
                    className="text-xl font-semibold text-chiper-chartreuse"
                    onClick={changeLanguage}
                  >
                    {i18n.language.toUpperCase()}
                  </button>
                </div>
              </div>
              <NavButton to="/" onClick={toggleMenu}>
                {t("homePage")}
              </NavButton>
            </div>
          </div>
        </div>
      </div>
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
}

export default NavBar;
