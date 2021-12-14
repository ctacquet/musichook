import { useTheme } from 'next-themes';
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

function DarkModeSwitch() {
    const [enabled, setEnabled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(null);

    useEffect(() => {
        setIsMounted(true);
        setCurrentTheme(theme);
    }, [theme]);

    const switchTheme = () => {
        if (isMounted) {
            setTheme(theme === "light" ? "dark" : "light");
        }
    };

    return (
        <div className="dark:bg-opacity-25 rounded-sm space-y-2 text-center">
          <div className="py-4">
              <Switch
                checked={enabled}
                onChange={() => {
                  if(currentTheme === 'light') {
                    setCurrentTheme('dark');
                    setEnabled(true);
                  } else {
                    setCurrentTheme('light');
                    setEnabled(false);
                  }
                  switchTheme();
                }}
                className={`${currentTheme === "dark" ? "bg-indigo-500" : "bg-gray-400"} relative inline-flex flex-shrink-0 h-[28px] w-[64px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span
                  aria-hidden="true"
                  className={`${currentTheme === "dark" ? "translate-x-9" : "translate-x-0"} pointer-events-none inline-block h-[24px] w-[24px] rounded-full text-black bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                >
                  {currentTheme === "light" ? (<SunIcon className="h-6 w-6 inline" />) : (<MoonIcon className="h-6 w-6 inline" />)}
                </span>
              </Switch>
          </div>
        </div>
    )
}

export default DarkModeSwitch
