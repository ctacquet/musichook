import {
  LoginIcon,
  LogoutIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div className="bg-white my-7 border rounded-sm">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 group block cursor-pointer space-x-2">
              <div className="inline-block pl-4">
                <img
                  className="h-10 w-10 rounded-full"
                  src={session?.user?.image}
                  alt=""
                />
              </div>
              <div className="inline-block">
                <p className="text-base leading-6 font-medium text-black">
                  {session?.user?.name}
                </p>
                <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @{session?.user?.username}
                </p>
              </div>
            </div>
            <div className="inline-block">
              <a onClick={signOut} className="loginBtn space-x-2 rounded-lg">
                <LogoutIcon className="h-8 w-8 inline-block" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white my-7 border rounded-sm content-center p-2">
          <div className="flex justify-between">
            <div>
              <UserCircleIcon className="inline-block w-10" />
            </div>
            <a href="/auth/signin" className="loginBtn space-x-2 rounded-lg">
              <p className="inline-block">Sign in</p>
              <LoginIcon className="h-8 w-8 inline-block" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default MiniProfile;