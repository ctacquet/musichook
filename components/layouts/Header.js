import Image from "next/image";
import {
  SearchIcon,
  ArrowLeftIcon,
  MenuIcon,
  HomeIcon,
  LoginIcon,
  BellIcon,
  UserGroupIcon,
  CalendarIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";

function Header({ pageTitle }) {
  const router = useRouter();
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const fetchIcon = () => {
      switch (pageTitle) {
        case "Home": {
          setIcon(<HomeIcon className="icon" />);
          return;
        }
        case "Login": {
          setIcon(<LoginIcon className="icon" />);
          return;
        }
        case "Discover": {
          setIcon(<UserGroupIcon className="icon" />);
          return;
        }
        case "Notifications": {
          setIcon(<BellIcon className="icon" />);
          return;
        }
        case "Profile": {
          setIcon(<UserIcon className="icon" />);
          return;
        }
        case "Favorites": {
          setIcon(<HeartIcon className="icon" />);
          return;
        }
        case "Events": {
          setIcon(<CalendarIcon className="icon" />);
          return;
        }
        case "Menu": {
          setIcon(<MenuIcon className="icon" />);
          return;
        }
        case "Return": {
          setIcon(<ArrowLeftIcon className="icon" />);
          return;
        }
        default: {
          setIcon(<QuestionMarkCircleIcon className="icon" />);
          return;
        }
      }
    };

    fetchIcon();
  }, [pageTitle]);

  return (
    <>
      <Head>
        <title>MusicHook</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musichook.vercel.app/" />
        <meta property="og:title" property="og:title" content="MusicHook" />
        <meta
          property="og:description"
          property="og:description"
          content="Share and discover songs !"
        />
        <meta property="og:image" content="/preview.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="MusicHook" />
        <meta name="twitter:description" content="Share and discover songs !" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>

      <div className="sticky top-0 z-10">
        <header class="grid grid-cols-4 gap-4 justify-between items-center bg-white p-4 shadow-sm border">
          {/* Left - Logo */}
          <div class="col-span-1 text-center">
            {/* Logo and text for large device */}
            <div
              onClick={() => router.push("/")}
              className="hidden lg:inline-block"
            >
              <div onClick={() => router.push("/")} className="cursor-pointer flex">
                <div>
                  <Image
                    src="/icon.png"
                    width="40"
                    height="40"
                    objectFit="contain"
                  />
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600 font-bold text-2xl">MusicHook</p>
              </div>
            </div>
            {/* Only logo for small device */}
            <div className="flex lg:hidden">
              {" "}
              <Image
                src="/icon.png"
                width="40"
                height="40"
                objectFit="contain"
              />
            </div>
          </div>
          {/* Middle - Title page */}
          <div class="col-span-2">
            <div className="flex flex-wrap items-center justify-center space-x-2">
              {icon}
              <p>{pageTitle}</p>
            </div>
          </div>
          <div class="col-span-1">
            {/* Right - Search bar */}
            <div className="hidden lg:block relative p-3 rounded-md">
              <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                className="bg-white block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
