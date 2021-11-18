import {
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  BellIcon,
  HeartIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeIconFilled,
  UserGroupIcon as UserGroupIconFilled,
  UserIcon as UserIconFilled,
  BellIcon as BellIconFilled,
  HeartIcon as HeartIconFilled,
  CalendarIcon as CalendarIconFilled,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Menu() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div>
      {user ? (
        <div className="bg-white my-7 border rounded-sm p-2 space-y-2">
          <a
            onClick={() => {
              return router.push("/");
            }}
            className={
              "navDiv " +
              (window.location.pathname == "/" &&
                "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
            }
          >
            {window.location.pathname == "/" ? (
              <HomeIconFilled className="icon text-red-500" />
            ) : (
              <HomeIcon className="icon" />
            )}

            <p
              className={
                "menuText " + (window.location.pathname == "/" && "font-semibold")
              }
            >
              Home
            </p>
          </a>
          <a
            onClick={() => {
              return router.push("/discover");
            }}
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
                "menuText " + (window.location.pathname == "/discover" && "font-semibold")
              }
            >
              Discover
            </p>
          </a>
          <a
            onClick={() => router.push("/notifications")}
            className={
              "navDiv " +
              (window.location.pathname == "/notifications" &&
                "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
            }
          >
            {window.location.pathname == "/notifications" ? (
              <BellIconFilled className="icon text-red-500" />
            ) : (
              <BellIcon className="icon" />
            )}
            <p
              className={
                "menuText " + (window.location.pathname == "/notifications" && "font-semibold")
              }
            >
              Notifications
            </p>
          </a>
          <a
            onClick={() => router.push("/profile")}
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
                "menuText " + (window.location.pathname == "/profile" && "font-semibold")
              }
            >
              Profile
            </p>
          </a>
          <a
            onClick={() => router.push("/favorites")}
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
                "menuText " + (window.location.pathname == "/favorites" && "font-semibold")
              }
            >
              Favorites
            </p>
          </a>
          <a
            onClick={() => router.push("/events")}
            className={
              "navDiv " +
              (window.location.pathname == "/events" &&
                "text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600")
            }
          >
            {window.location.pathname == "/events" ? (
              <CalendarIconFilled className="icon text-red-500" />
            ) : (
              <CalendarIcon className="icon" />
            )}
            <p
              className={
                "menuText " + (window.location.pathname == "/events" && "font-semibold")
              }
            >
              Events
            </p>
          </a>
          <div className="flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="mt-3 p-1 bg-gradient-to-l from-purple-500 to-red-500 rounded-lg shadow-xl text-white w-6/12 min-w-max"
            >
              Post
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white my-7 border rounded-sm p-2 space-y-2">
          <a
            onClick={() => router.push("/")}
            className="navDiv text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600"
          >
            <HomeIconFilled className="icon" color="red" />
            <p>Home</p>
          </a>
          <a
            disabled={true}
            className="navDiv text-gray-500 cursor-not-allowed"
          >
            <UserGroupIcon className="h-4 w-4" />
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
          <a
            disabled={true}
            className="navDiv text-gray-500 cursor-not-allowed"
          >
            <CalendarIcon className="icon" />
            <p>Events</p>
          </a>
          <div className="flex justify-center">
            <button
              disabled={true}
              className="mt-3 p-1 bg-gray-300 rounded-lg w-6/12 min-w-max cursor-not-allowed"
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
