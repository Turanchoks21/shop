import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function Example() {
  const { t } = useTranslation();

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
              <div className="rounded-lg shadow-lg ring-1 ring-opacity-5 overflow-hidden">
                <div className="grid grid-cols-2 gap-6 bg-white px-2 py-4 sm:p-6">
                  <div>
                    <Link to="/profile">
                      <Cog6ToothIcon className="h-8 text-black" />
                    </Link>
                  </div>
                  <div>
                    <Cog6ToothIcon className="h-8 text-black" />
                  </div>
                  <div>
                    <Cog6ToothIcon className="h-8 text-black" />
                  </div>
                  <div>
                    <Cog6ToothIcon className="h-8 text-black" />
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </>
  );
}
