import { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import {
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    collection,
    addDoc,
    setDoc,
    getDoc,
    doc,
    deleteDoc,
    where,
    getDocs,
} from "@firebase/firestore";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { async } from "@firebase/util";
import Link from "next/link";
import {
    PencilAltIcon
} from "@heroicons/react/solid";
import { modalStateEditProfile } from "../atoms/modalAtomEditProfile";
import { useRecoilState } from "recoil";

function ProfileCard() {

    const [user] = useAuthState(auth);


    const [currentUser, setCurrentUser] = useState(null);
    const [openEdit, setOpenEdit] = useRecoilState(modalStateEditProfile);



    useEffect(() => {

        if (user) {
            onSnapshot(doc(db, "users", user?.uid), (doc) => {
                setCurrentUser(doc.data())
            });
        }

    }, [user]);
    //glisser le currentUser dans le modal






    return (
        <>
            {
                user && (
                    <div>
                        <div className="bg-white p-8 my-7 border rounded-sm">
                            <div className="grid grid-cols-3 gap-3 min-w-full items-center">

                                {currentUser ? (
                                    <div className="col-span-1 w-24 rounded-full   ">
                                        <Image
                                            //src={user.photoURL}
                                            src={currentUser?.userImg}
                                            className="rounded-full "
                                            alt=""
                                            width="100%"
                                            height="100%"
                                            layout="responsive"
                                            objectFit="contain"
                                            priority="true"
                                        />
                                    </div>
                                ) : (
                                    <div className="col-span-1 w-24 rounded-full   ">
                                        <Image
                                            src={user.photoURL}
                                            className="rounded-full "
                                            alt=""
                                            width="100%"
                                            height="100%"
                                            layout="responsive"
                                            objectFit="contain"
                                            priority="true"
                                        />
                                    </div>
                                )}

                                <div className="col-span-1  "  >
                                    <p className=" font-bold overflow-ellipsis overflow-hidden ">
                                        {currentUser?.username}
                                    </p>
                                    <p className=" font-normal overflow-ellipsis overflow-hidden">
                                        {currentUser?.description}
                                    </p>
                                </div>
                                <div className="col-span-1 flex justify-center ">
                                    <button onClick={() => setOpenEdit(true)}>
                                        <PencilAltIcon className="h-7 text-black " />
                                    </button>
                                </div>
                            </div>
                            <div className=" mt-6 pt-3 flex mx-6 justify-center space-x-20 ">
                                <div className="flex-none text-xl justify-start ">

                                    <div className=" text-xl text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-red-600 inline-block pr-3">
                                        {currentUser?.posts}
                                    </div>
                                    <div className=" text-xl inline-block">
                                        Posts
                                    </div>
                                </div>

                                <div className="flex-none text-xl justify-start ">

                                    <div className=" text-xl text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-red-600 inline-block pr-3">
                                        {currentUser?.followers}
                                    </div>
                                    <div className=" text-xl inline-block">
                                        Followers
                                    </div>
                                </div>

                                <div className="flex-none text-xl justify-start ">

                                    <div className=" text-xl text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-red-600 inline-block pr-3">
                                        {currentUser?.follows}
                                    </div>
                                    <div className=" text-xl inline-block">
                                        Follow
                                    </div>
                                </div>




                                {/* <div className="flex-none text-xl justify-center">
                                    {currentUser?.followers} Followers
                                </div>
                                <div className="flex-none text-xl justify-center">
                                    {currentUser?.follows} Follow
                                </div> */}

                            </div>
                            <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t justify-center">

                                {currentUser?.genres && (
                                    <>
                                        <div
                                            className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                                            {currentUser?.genres[0]}
                                        </div>
                                        <div
                                            className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                                            {currentUser?.genres[1]}
                                        </div>
                                        <div
                                            className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                                            {currentUser?.genres[2]}
                                        </div>
                                    </>
                                )}
                            </div>
                            {
                                currentUser?.genres && currentUser?.timestamp && (
                                    <div className="mt-6 pt-3 flex mx-6  ">
                                        <div className="flex-1  justify-start">
                                            Since {currentUser?.timestamp}
                                        </div>
                                        <div className="flex-none  justify-end">
                                            <Link href={currentUser?.links}>
                                                <a target="_blank">
                                                    Add more links here
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }


        </>
    );
}

export default ProfileCard;