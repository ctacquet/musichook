import MiniFavorites from "../MiniFavorites";
import { Switch } from "@headlessui/react";
import useDarkMode from "../useDarkMode";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

export default function RightNavbar() {

  const [enabled, setEnabled] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <section className="col-span-1 pr-4">
      <div className="sticky top-20 hidden lg:flex lg:flex-col">
        <div className="bg-white dark:bg-black dark:bg-opacity-25 mt-7 mb-4 border dark:border-gray-500 dark:border-opacity-50 rounded-sm p-2 space-y-2 text-center">
          <div className="py-4">
            {colorTheme && (
              <Switch
                checked={enabled}
                onChange={() => {
                  colorTheme === "light" ? (
                    setEnabled(false),
                    setTheme("light"),
                  ) : (
                    setEnabled(true),
                    setTheme("dark"),
                  )
                }}
                className={`${colorTheme === "light" ? (enabled ? "bg-indigo-500" : "bg-indigo-400") : (enabled ? "bg-gray-500" : "bg-gray-400")} relative inline-flex flex-shrink-0 h-[28px] w-[64px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span
                  aria-hidden="true"
                  className={`${enabled ? "translate-x-9" : "translate-x-0"} pointer-events-none inline-block h-[24px] w-[24px] rounded-full text-black bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                >
                  {colorTheme === "light" ? (<SunIcon className="h-6 w-6 inline" />) : (<MoonIcon className="h-6 w-6 inline" />)}
                </span>
              </Switch>
            )}
          </div>
        </div>
        <MiniFavorites />
      </div>
    </section>
  );
}
