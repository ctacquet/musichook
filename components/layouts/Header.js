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
import {
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from 'next/head';

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
        <meta property="og:description" property="og:description" content="Share and discover songs !" />
        <meta property="og:image" content="/preview.jpg" />
        <meta name="twitter:card" content="summary" /> 
        <meta name="twitter:title" content="MusicHook" />
        <meta name="twitter:description" content="Share and discover songs !" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>

      <div className="sticky top-0 z-10">
        <main className="grid grid-cols-1 md:grid-cols-4 md:max-w-4xl xl:grid-cols-4 xl:max-w-8xl min-w-full px-8 bg-white shadow-sm border">
          {/* Left - Logo */}
          <div className="col-span-1 flex">
            <div
              onClick={() => router.push("/")}
              className="hidden lg:inline-grid w-8 cursor-pointer"
            >
              <div className="relative h-8 inline-block">
                <Image src="/icon.png" layout="fill" objectFit="contain" />
              </div>
              <div className="text-transparent pl-10 bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                <p className="font-bold text-2xl">MusicHook</p>
              </div>
            </div>
            <div
              onClick={() => router.push("/")}
              className="relative w-8 h-8 lg:hidden flex-shrink-0 cursor-pointer"
            >
              <Image src="/icon.png" layout="fill" objectFit="contain" />
            </div>
          </div>

          {/* Middle - Page title */}
          <div className="flex flex-wrap items-center justify-center space-x-2 col-span-2">
            {icon}
            <p>{pageTitle}</p>
          </div>

          {/* Right - Search bar */}
          <div className="col-span-1 min-w-max">
            <div className="relative mt-1 p-3 rounded-md">
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
        </main>
      </div>
    </>
  );
}

export default Header;
