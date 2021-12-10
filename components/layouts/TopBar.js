import {
  HomeIcon,
  UserIcon,
  UserGroupIcon,
  BellIcon,
  LoginIcon,
  SearchIcon,
  HeartIcon,
  ArrowLeftIcon,
  CalendarIcon,
  MenuAlt3Icon,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeIconFilled,
  UserGroupIcon as UserGroupIconFilled,
  UserIcon as UserIconFilled,
  BellIcon as BellIconFilled,
  HeartIcon as HeartIconFilled,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import { auth, db } from "../../lib/firebase";
import { onSnapshot, query, collection, where } from "@firebase/firestore";
import { useState, useEffect, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";
import MiniProfile from "../MiniProfile";
import AlgoliaSearch from "../AlgoliaSearch";

function TopBar({ pageTitle }) {
  const [user] = useAuthState(auth);
  const [icon, setIcon] = useState("");
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (user) {
      onSnapshot(
        query(collection(db, "users", user.uid, "notifications"),
        where("seen", "==", false)),
        (snapshot) => {
          setLength(snapshot.size);
        }
      ),
        [db];
    }
  });

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
    <div className="grid grid-cols-4 gap-4 justify-between items-center bg-white p-4 shadow-sm border">
      {/* Left - Logo */}
      <div className="col-span-1 text-center">
        {/* Logo and text for large device */}
        <Link href="/">
          <div className="hidden lg:inline-block cursor-pointer">
            <div className="flex">
              <div>
                <Image
                  src="/icon.png"
                  width="40"
                  height="40"
                  objectFit="contain"
                />
              </div>
              <p className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600 font-bold text-2xl">
                MusicHook
              </p>
            </div>
          </div>
        </Link>
        {/* Only logo for small device */}
        <Link href="/">
          <div className="flex lg:hidden cursor-pointer">
            {" "}
            <Image src="/icon.png" width="40" height="40" objectFit="contain" />
          </div>
        </Link>
      </div>
      {/* Middle - Title page */}
      <div className="col-span-2">
        <div className="flex flex-wrap items-center justify-center space-x-2">
          {icon}
          <p>{pageTitle}</p>
        </div>
      </div>
      <div className="col-span-1 flex space-x-4">
        {/* Right - Search bar */}
        <AlgoliaSearch/>
        {/* Right - Mobile menu */}
        <div className="flex flex-none lg:hidden rounded-md">
          <Popover className="relative w-max ml-auto">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                ${open ? "text-gray-300" : ""}
                text-black hover:text-gray-700 group py-2 rounded-md inline-flex items-end text-base font-medium`}
                >
                  <MenuAlt3Icon className="w-8 h-8" />
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
                  <Popover.Panel className="absolute z-10 w-screen max-w-sm mt-3 transform ml-3 -translate-x-full left-full sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-10">
                      <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                        {user ? (
                          <>
                            <Link href="/">
                              <a
                                className={
                                  "navDiv " +
                                  (pageTitle == "Home" &&
                                    "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
                                }
                              >
                                {pageTitle == "Home" ? (
                                  <HomeIconFilled className="icon text-red-500" />
                                ) : (
                                  <HomeIcon className="icon" />
                                )}

                                <p
                                  className={
                                    "menuText " +
                                    (pageTitle == "Home" && "font-semibold")
                                  }
                                >
                                  Home
                                </p>
                              </a>
                            </Link>
                            <Link href="/discover">
                              <a
                                className={
                                  "navDiv " +
                                  (pageTitle == "Discover" &&
                                    "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
                                }
                              >
                                {pageTitle == "Discover" ? (
                                  <UserGroupIconFilled className="icon text-red-500" />
                                ) : (
                                  <UserGroupIcon className="icon" />
                                )}
                                <p
                                  className={
                                    "menuText " +
                                    (pageTitle == "Discover" && "font-semibold")
                                  }
                                >
                                  Discover
                                </p>
                              </a>
                            </Link>
                            <Link href="/notifications">
                              <a
                                className={
                                  "navDiv w-full " +
                                  (pageTitle == "Notifications" &&
                                    "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
                                }
                              >
                                {pageTitle == "Notifications" ? (
                                  <div className="static">
                                    {user && length > 0 && (
                                      <span className="absolute pl-4 h-3 w-3">
                                        <span className="animate-ping-slow absolute inline-flex h-3 w-3 rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="absolute inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                      </span>
                                    )}
                                    <BellIconFilled className="icon text-red-500" />
                                  </div>
                                ) : (
                                  <div className="static">
                                    {user && length > 0 && (
                                      <span className="absolute pl-4 h-3 w-3">
                                        <span className="animate-ping-slow absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                                        <span className="absolute inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                      </span>
                                    )}
                                    <BellIcon className="icon" />
                                  </div>
                                )}
                                <p
                                  className={
                                    "menuText " +
                                    (pageTitle == "Notifications" &&
                                      "font-semibold")
                                  }
                                >
                                  Notifications
                                </p>
                              </a>
                            </Link>
                            <Link href="/profile">
                              <a
                                className={
                                  "navDiv " +
                                  (pageTitle == "Profile" &&
                                    "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
                                }
                              >
                                {pageTitle == "Profile" ? (
                                  <UserIconFilled className="icon text-red-500" />
                                ) : (
                                  <UserIcon className="icon" />
                                )}
                                <p
                                  className={
                                    "menuText " +
                                    (pageTitle == "Profile" && "font-semibold")
                                  }
                                >
                                  Profile
                                </p>
                              </a>
                            </Link>
                            <Link href="/favorites">
                              <a
                                className={
                                  "navDiv " +
                                  (pageTitle == "Favorites" &&
                                    "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
                                }
                              >
                                {pageTitle == "Favorites" ? (
                                  <HeartIconFilled className="icon text-red-500" />
                                ) : (
                                  <HeartIcon className="icon" />
                                )}
                                <p
                                  className={
                                    "menuText " +
                                    (pageTitle == "Favorites" &&
                                      "font-semibold")
                                  }
                                >
                                  Favorites
                                </p>
                              </a>
                            </Link>
                            <div className="flex justify-center">
                              <button
                                onClick={() => setOpen(true)}
                                className="mt-3 p-1 bg-gradient-to-l from-purple-500 to-red-500 rounded-lg shadow-xl text-white w-6/12 min-w-max"
                              >
                                Post
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <Link href="/">
                              <a className="navDiv text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                                <HomeIconFilled className="icon" color="red" />
                                <p>Home</p>
                              </a>
                            </Link>
                            <a
                              disabled={true}
                              className="navDiv text-gray-500 cursor-not-allowed"
                            >
                              <UserGroupIcon className="icon" />
                              <p>Discover</p>
                            </a>
                            <a
                              disabled={true}
                              className="navDiv text-gray-500 cursor-not-allowed"
                            >
                              <BellIcon className="icon" />
                              <p>Notifications</p>
                            </a>
                            <a
                              disabled={true}
                              className="navDiv text-gray-500 cursor-not-allowed"
                            >
                              <UserIcon className="icon" />
                              <p>Profile</p>
                            </a>
                            <a
                              disabled={true}
                              className="navDiv text-gray-500 cursor-not-allowed"
                            >
                              <HeartIcon className="icon" />
                              <p>Favorites</p>
                            </a>
                            <div className="flex justify-center">
                              <button
                                disabled={true}
                                className="mt-3 p-1 bg-gray-300 rounded-lg w-6/12 min-w-max cursor-not-allowed"
                              >
                                Post
                              </button>
                            </div>
                          </>
                        )}
                        <div className="p-4 bg-gray-50">
                          <MiniProfile />
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
