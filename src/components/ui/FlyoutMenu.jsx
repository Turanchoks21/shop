import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { BanknotesIcon, UserIcon } from "@heroicons/react/20/solid";
import { useUsers } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import AccountReplenishmentModal from "../modals/AccountReplenishmentModal";

export default function FlyotMenu({ balance }) {
  const { t } = useTranslation();
  const { users, clearUsers } = useUsers();
  const username = users.length > 0 ? users[0] : "Guest";
  const [isReplenishmentModal, setIsReplenishmentModal] = useState(false);
  const navigate = useNavigate(); 

  function toggleReplenishmentModal() {
    setIsReplenishmentModal(!isReplenishmentModal);
  }

  function handleLogout() {
    clearUsers(); 
    navigate("/login");
  }

  return (
    <>
      <Popover className="relative">
        <>
          <Popover.Button
            className=" text-blue-purple dark:text-pale-yellow  
            focus:outline-none focus:ring-0 focus:ring-offset-0"
          >
            <UserIcon className="h-8 text-chiper-chartreuse" />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="absolute z-10 2lg:left-1/2 transform -translate-x-1/2 mt-3 px-1
               w-52 sm:px-0"
            >
              <div className="rounded-lg shadow-md shadow-chiper-chartreuse ring-0 ring-opacity-5 overflow-hidden">
                <div className="flex text-chiper-chartreuse flex-col gap-4 bg-analytics-azule px-2 py-4 sm:p-6">
                  <div className="text-center text-xl font-semibold ">
                    <div>{username}</div>
                    <div className="text-xl flex justify-center items-center space-x-1">
                      <span>{balance}</span>
                      <BanknotesIcon className="h-6" />
                    </div>
                  </div>
                  <div className="p-4 w-full">
                    <button
                      className="bg-red-500 w-full p-2 rounded-lg font-semibold text-white hover:bg-red-500/80"
                      onClick={handleLogout}
                    >
                      {t("logout")}
                    </button>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
      <AccountReplenishmentModal
        isOpen={isReplenishmentModal}
        onClose={() => setIsReplenishmentModal(false)}
      />
    </>
  );
}
