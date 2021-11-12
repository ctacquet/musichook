import {
    UserCircleIcon
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

function MiniProfile() {
    const {data: session} = useSession();

    return (
        <div>
            {session ? (
                <div className="bg-white my-7 border rounded-sm">
                    <a onClick={signOut} className="flex-shrink-0 group block cursor-pointer">
                    <div className="flex items-center">
                    <div>
                        <img className="inline-block h-8 w-8 rounded-full" src={session?.user?.image} alt="" />
                    </div>
                    <div className="ml-3">
                        <p className="text-base leading-6 font-medium text-black">
                        {session?.user?.name}
                        </p>
                        <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        @{session?.user?.username}
                        </p>
                    </div>
                    </div>
                </a>
                </div>
            ) : (
                <div className="bg-white my-7 border rounded-sm">
                    <div className="flex items-center">
                    <div>
                        <UserCircleIcon className="inline-block h-8 w-8" />
                    </div>
                    <div className="ml-3 space-x-4">
                        <a href="/auth/signin" className="loginBtn">Sign in</a>
                    </div>
                    </div>
                </div>
            )}
        
        </div>
    )
}

export default MiniProfile
