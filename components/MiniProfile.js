import {
  LoginIcon,
  LogoutIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { auth, db } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import {
    onSnapshot,
    doc,
} from "@firebase/firestore";
import Image from "next/image";
import Link from "next/link";

function MiniProfile() {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
        onSnapshot(doc(db, "users", user?.uid), (doc) => {
            setCurrentUser(doc.data())
        });
    }

}, [user]);

  const logout = () => {
    signOut(auth);
  };

  return (
    <>
      {user && currentUser ? (
        <div className="bg-white dark:bg-black dark:bg-opacity-25 border dark:border-gray-500 dark:border-opacity-50 rounded-sm">
          <div className="flex justify-between items-center h-16">
            <Link href="/profile">
              <div className="flex-shrink-0 group block cursor-pointer space-x-2">
                <div className="inline-block pl-4">
                  <div className="h-10 w-10">
                    {currentUser.userImg ? (
                      <Image
                        className="rounded-full"
                        src={currentUser?.userImg}
                        alt=""
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="cover"
                      />
                    ) : (
                      <UserCircleIcon className="w-12" />
                    )}
                  </div>
                </div>
                <div className="inline-block">
                  <p className="text-base leading-6 font-medium text-black dark:text-white group-hover:text-gray-300 transition ease-in-out duration-150">
                    {currentUser?.username}
                  </p>
                  <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                    Go to profile
                  </p>
                </div>
              </div>
            </Link>
            <div className="inline-block">
              <a onClick={logout} className="loginBtn space-x-2 rounded-lg">
                <LogoutIcon className="h-8 w-8 inline-block dark:text-white" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border rounded-sm content-center p-2">
          <div className="flex justify-between">
            <div>
              <UserCircleIcon className="inline-block w-10 dark:text-white" />
            </div>
            <Link href="/auth/signin">
              <a className="loginBtn space-x-2 rounded-lg">
                <p className="inline-block">Sign in</p>
                <LoginIcon className="h-8 w-8 inline-block dark:text-white" />
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default MiniProfile;
