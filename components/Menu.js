import {
    UserGroupIcon,
    UserIcon,
    BellIcon,
    HeartIcon,
    CalendarIcon
} from "@heroicons/react/outline";
import {
    HomeIcon
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useState} from "react";

function Menu({notifications, setNotifications}) {
    const [user] = useAuthState(auth);
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();


    return (
        <div>
            {user ? (
            <div className="bg-white my-7 border rounded-sm p-2 space-y-2">
                <a onClick={() => {
                        return router.push("/");
                    }} 
                    className="navDiv text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                    <HomeIcon className="h-4 w-4" color="purple" />
                    <p className="font-semibold">Home</p>
                </a>
                <a onClick={() => {
                        return router.push("/discover");
                    }}  className="navDiv">
                    <UserGroupIcon className="h-4 w-4" />
                    <p>Discover</p>
                </a>
                <a onClick={() => (router.push("/notifications"), notifications && (setNotifications([])))} className="navDiv">
                    <BellIcon className="h-4 w-4" />
                    <p>Notifications</p>
                    {notifications && (<div className=" text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">{notifications.length}</div>)}
                </a>
                <a onClick={() => router.push("/profile")} className="navDiv">
                    <UserIcon className="h-4 w-4" />
                    <p>Profile</p>
                </a>
                <a onClick={() => router.push("/favorites")} className="navDiv">
                    <HeartIcon className="h-4 w-4" />
                    <p>Favorites</p>
                </a>
                <a onClick={() => router.push("/events")} className="navDiv">
                    <CalendarIcon className="h-4 w-4" />
                    <p>Events</p>
                </a>
                <div className="flex justify-center">
                    <button onClick={() => setOpen(true)} className="mt-3 p-1 bg-gradient-to-l from-purple-600 to-red-600 rounded-lg text-white w-6/12 min-w-max">
                        Post
                    </button>
                </div>
            </div>
            ) : (
            <div className="bg-white my-7 border rounded-sm p-2 space-y-2">
                <a onClick={() => router.push("/")} className="navDiv text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                    <HomeIcon className="h-4 w-4" color="purple" />
                    <p>Home</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500 cursor-not-allowed">
                    <UserGroupIcon className="h-4 w-4" />
                    <p>Discover</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500 cursor-not-allowed">
                    <BellIcon className="h-4 w-4" />
                    <p>Notifications</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500 cursor-not-allowed">
                    <UserIcon className="h-4 w-4" />
                    <p>Profile</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500 cursor-not-allowed">
                    <HeartIcon className="h-4 w-4" />
                    <p>Favorites</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500 cursor-not-allowed">
                    <CalendarIcon className="h-4 w-4" />
                    <p>Events</p>
                </a>
                <div className="flex justify-center">
                    <button disabled={true} className="mt-3 p-1 bg-gray-300 rounded-lg w-6/12 min-w-max cursor-not-allowed">
                        Post
                    </button>
                </div>
            </div>
            )}
        </div>
    )
}

export default Menu
