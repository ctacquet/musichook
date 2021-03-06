import {
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeIconFilled,
  UserGroupIcon as UserGroupIconFilled,
  UserIcon as UserIconFilled,
  BellIcon as BellIconFilled,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/solid";
import { onSnapshot, query, collection, where } from "@firebase/firestore";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { auth, db } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { useState, useEffect } from "react";

function Menu() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useRecoilState(modalState);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (user) {
      onSnapshot(
        query(
          collection(db, "users", user.uid, "notifications"),
          where("seen", "==", false)
        ),
        (snapshot) => {
          setLength(snapshot.size);
        }
      ),
        [db, user];
    }
  });

  return (
    <div>

      {user ? (
        <div className="bg-white bg-opacity-100 dark:bg-black dark:bg-opacity-25 my-7 border dark:border-gray-500 dark:border-opacity-50 rounded-sm p-2 space-y-2">

          <Link href="/">
            <a
              className={
                "navDiv " +
                (window.location.pathname == "/" &&
                  "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600 ")
              }
            >
              {window.location.pathname == "/" ? (
                <HomeIconFilled className="icon text-red-500" />
              ) : (
                <HomeIcon className="icon" />
              )}

              <p
                className={
                  " " +
                  (window.location.pathname == "/" && "font-semibold")
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
                (window.location.pathname == "/discover" &&
                  "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
              }
            >
              {window.location.pathname == "/discover" ? (
                <UserGroupIconFilled className="icon text-red-500" />
              ) : (
                <UserGroupIcon className="icon" />
              )}
              <p
                className={
                  "menuText " +
                  (window.location.pathname == "/discover" && "font-semibold")
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
                (window.location.pathname == "/notifications" &&
                  "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
              }
            >
              {window.location.pathname == "/notifications" ? (
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
                  (window.location.pathname == "/notifications" &&
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
                (window.location.pathname == "/profile" &&
                  "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
              }
            >
              {window.location.pathname == "/profile" ? (
                <UserIconFilled className="icon text-red-500" />
              ) : (
                <UserIcon className="icon" />
              )}
              <p
                className={
                  "menuText " +
                  (window.location.pathname == "/profile" && "font-semibold")
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
                (window.location.pathname == "/favorites" &&
                  "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
              }
            >
              {window.location.pathname == "/favorites" ? (
                <HeartIconFilled className="icon text-red-500" />
              ) : (
                <HeartIcon className="icon" />
              )}
              <p
                className={
                  "menuText " +
                  (window.location.pathname == "/favorites" && "font-semibold")
                }
              >
                Favorites
              </p>
            </a>
          </Link>
          <div className="flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="mt-3 p-1 bg-gradient-to-l from-purple-500 to-red-500 rounded-lg shadow-xl hover:to-purple-700 text-white w-6/12 min-w-max"
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-black dark:bg-opacity-25 my-7 border dark:border-gray-500 dark:border-opacity-50 rounded-sm p-2 space-y-2">
          
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
              className="mt-3 p-1 bg-gray-300 dark:bg-black dark:bg-opacity-30 rounded-lg w-6/12 min-w-max cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
