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
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Menu() {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();

    return (
        <div>
            {session ? (
            <div className="bg-white my-7 border rounded-sm">
                <a onClick={() => {
                        return router.push("/");
                    }} 
                    className="navDiv text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                    <HomeIcon className="h-4 w-4" color="purple" />
                    <p>Home</p>
                </a>
                <a onClick={() => {
                        return router.push("/discover");
                    }}  className="navDiv">
                    <UserGroupIcon className="h-4 w-4" />
                    <p>Discover</p>
                </a>
                <a onClick={() => router.push("/notifications")} className="navDiv">
                    <BellIcon className="h-4 w-4" />
                    <p>Notifications</p>
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
                <button onClick={() => setOpen(true)} className="mt-3 p-1 bg-gradient-to-l from-purple-600 to-red-600 rounded-lg text-white w-full">
                    Post
                </button>
            </div>
            ) : (
            <div className="bg-white my-7 border rounded-sm">
                <a onClick={() => router.push("/")} className="navDiv text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                    <HomeIcon className="h-4 w-4" color="purple" />
                    <p>Home</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500">
                    <UserGroupIcon className="h-4 w-4" />
                    <p>Discover</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500">
                    <BellIcon className="h-4 w-4" />
                    <p>Notifications</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500">
                    <UserIcon className="h-4 w-4" />
                    <p>Profile</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500">
                    <HeartIcon className="h-4 w-4" />
                    <p>Favorites</p>
                </a>
                <a disabled={true} className="navDiv text-gray-500">
                    <CalendarIcon className="h-4 w-4" />
                    <p>Events</p>
                </a>
                <button disabled={true} className="mt-3 p-1 bg-gray-300 rounded-lg w-full">
                    Post
                </button>
            </div>
            )}
        </div>
    )
}

export default Menu
