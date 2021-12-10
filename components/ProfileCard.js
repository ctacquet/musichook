import { useState, useEffect, useRef } from "react";
import { auth, db } from "../lib/firebase";
import {
    onSnapshot,
    doc,
    collection,
    addDoc,
    setDoc,
    deleteDoc,
    where, query
} from "@firebase/firestore";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import {
    PencilAltIcon,
    CheckIcon
} from "@heroicons/react/solid";
import { modalStateEditProfile } from "../atoms/modalAtomEditProfile";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";

import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function ProfileCard() {
    const [user] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState(null);
    const [openEdit, setOpenEdit] = useRecoilState(modalStateEditProfile);
    const [links, setLinks] = useState([]);

    const router = useRouter()
    const { id } = router.query

    const followButtonRef = useRef(null);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);

    const [followed, setFollowed] = useState(false);
    const [loading, setLoading] = useState(null);

    useEffect(
        () => {
            if (id && user) {
                onSnapshot(
                    doc(db, "users", id, "followers", user?.uid),
                    (snapshot) => {
                        if (snapshot.exists()) {
                            setFollowed(true);
                        }
                    }
                )
            }

        },
        [db, user, id]
    );

    const handleFollow = async () => {
        setLoading(true);

        if (id) {
            if (!followed) {

                const followingRef = await setDoc(doc(db, "users", user?.uid, "following", id), {});
                //setIsFollowing(false);
                const followersRef = await setDoc(doc(db, "users", id, "followers", user?.uid), {});
            } else {
                const followinRef = await deleteDoc(doc(db, "users", user?.uid, "following", id));
                const followersRef = await deleteDoc(doc(db, "users", id, "followers", user?.uid), {});
                //setIsFollowing(!isfollowing);
            }
        }
        setLoading(false);
    }

    useEffect(
        () => {
            if (id) {
                onSnapshot(
                    collection(db, "users", id, "links"),
                    (snapshot) => {
                        setLinks(snapshot.docs);
                    }
                )
            }
            else if (user) {
                onSnapshot(
                    collection(db, "users", user?.uid, "links"),
                    (snapshot) => {
                        setLinks(snapshot.docs);
                    }
                )
            }
        },
        [db, user, id]
    );

    useEffect(() => {
        if (id) {
            onSnapshot(doc(db, "users", id), (doc) => {
                setCurrentUser(doc.data())
            });
        } else if (user) {
            onSnapshot(doc(db, "users", user?.uid), (doc) => {
                setCurrentUser(doc.data())
            });
        }

    }, [db, user, id]);


    const pathMatcher = (data) => {

        let expression = "";
        let regex = new RegExp(expression);
        let empty = "";

        switch (data.domain) {
            case 'facebook':
                expression = "https?://(www\.)?facebook\.com/(profile\.php\?id=)?";
                if (data.url.match(regex)) {
                    return data.url;
                } else {
                    return empty;
                }
            case 'twitter':
                expression = "https?://twitter\.com/";
                if (data.url.match(regex)) {
                    return data.url;
                } else {
                    return empty;
                }
            case 'instagram':
                expression = "https?://(www\.)?instagram\.com/";
                if (data.url.match(regex)) {
                    return data.url;
                } else {
                    return empty;
                }
            case 'github':
                expression = "https?://(www\.)?github\.com/";
                if (data.url.match(regex)) {
                    return data.url;
                } else {
                    return empty;
                }
            case 'other':
                return data.url;

            default:
                break;
        }


    }


    return (
        <>

            <div>
                <div className="bg-white dark:bg-black dark:bg-opacity-25 p-8 my-7 border rounded-sm">
                    <div className="grid grid-cols-3 gap-3 min-w-full items-center">

                        {currentUser && (
                            <div className="col-span-1 w-24 rounded-full   ">
                                <Image
                                    src={currentUser?.userImg}
                                    className="rounded-full "
                                    alt=""
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="cover"
                                    priority="true"
                                />
                                {
                                    id && user && user.uid != id &&  (
                                        (
                                            followed ? (
                                                <div className="flex space-x-4 items-center py-3 px-2" >
                                                    <button type="button" className="btn inline-block text-xl mr-2 my-1 tracking-wider rounded-sm  px-2 cursor-pointer bg-gradient-to-l from-blue-400  to-green-400  text-white hover:from-purple-500 hover:to-red-500"
                                                        ref={followButtonRef}
                                                        onClick={() => { handleFollow(); setFollowed(false); }}
                                                    >
                                                        {followed ? "UnFollow" : "Follow"}

                                                    </button>

                                                    {loading ? "Wait..." : ""}
                                                    <div hidden={!followed}>
                                                        <CheckIcon className="text-green-500 h-8" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex space-x-4 items-center py-3 px-2" >
                                                    <button type="button" className="btn inline-block text-xl mr-2 my-1 tracking-wider rounded-sm  px-2 cursor-pointer bg-gradient-to-bl from-purple-600 to-red-600 text-white "
                                                        ref={followButtonRef}
                                                        onClick={() => { handleFollow(); setFollowed(true); }}
                                                    >
                                                        {followed ? "UnFollow" : "Follow"}
                                                    </button>
                                                    {loading ? "Wait..." : ""}
                                                    <div hidden={!followed}>
                                                        <CheckIcon className="text-green-500 h-8" />
                                                    </div>
                                                </div>
                                            )
                                        )
                                    )
                                }


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
                        {((id && user.uid == id) || (!id && user)) && (
                            <div className="col-span-1 flex justify-center ">
                                <button onClick={() => setOpenEdit(true)}>
                                    <PencilAltIcon className="h-7 text-black dark:text-white" />
                                </button>
                            </div>)
                        }
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
                                    className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default select-none">
                                    {currentUser?.genres[0]}
                                </div>
                                <div
                                    className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default select-none">
                                    {currentUser?.genres[1]}
                                </div>
                                <div
                                    className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default select-none">
                                    {currentUser?.genres[2]}
                                </div>
                            </>
                        )}
                    </div>
                    {/* <div className="flex-1  justify-start">
                                Since {currentUser?.timestamp}
                            </div> */}


                    <div>
                        <div className="flex justify-end p-4">

                            {/* { id && user && (  <div className="flex space-x-4 items-center">
                                <button type="button" className="btn inline-block text-xl mr-2 my-1 tracking-wider border rounded-sm border-purple-600 px-2 cursor-default bg-gradient-to-bl  hover:from-purple-600 hover:to-red-600 hover:text-white hover:rounded-sm hover:border-none ">
                                    Follow
                                </button>
                            </div>)
                            } */}

                            <div className="flex space-x-4">



                                {links && links.map((link) => {

                                    // console.log( `${typeof (link.data().domain) }`)

                                    switch (link.data().domain) {
                                        case 'facebook':
                                            return <div className="space-x-1 items-center" key={link.id} id={link.id}>
                                                <span>
                                                    <Link href={pathMatcher(link.data())}>
                                                        <a target="_blank" className="flex w-full justify-end pr-3">
                                                            <FontAwesomeIcon
                                                                icon={faFacebook}
                                                                className="h-8 text-blue-700  btn"
                                                            />
                                                        </a>
                                                    </Link>
                                                </span>
                                            </div>
                                        case 'instagram':
                                            return <div className="space-x-1 items-center" key={link.id} id={link.id}>
                                                <span>
                                                    <Link href={pathMatcher(link.data())}>
                                                        <a target="_blank" className="flex w-full justify-end pr-3">
                                                            <FontAwesomeIcon
                                                                icon={faInstagram}
                                                                className="h-8 text-black  btn"
                                                            />
                                                        </a>
                                                    </Link>
                                                </span>
                                            </div>
                                        case 'github':
                                            return <div className="space-x-1 items-center" key={link.id} id={link.id}>
                                                <span>
                                                    <Link href={pathMatcher(link.data())}>
                                                        <a target="_blank" className="flex w-full justify-end pr-3">
                                                            <FontAwesomeIcon
                                                                icon={faGithub}
                                                                className="h-8 text-gray-800  btn"
                                                            />
                                                        </a>
                                                    </Link>
                                                </span>
                                            </div>
                                        case 'twitter':
                                            return <div className="space-x-1 items-center" key={link.id} id={link.id}>
                                                <span>
                                                    <Link href={pathMatcher(link.data())}>
                                                        <a target="_blank" className="flex w-full justify-end pr-3">
                                                            <FontAwesomeIcon
                                                                icon={faTwitter}
                                                                className="h-8 text-blue-500 btn"
                                                            />
                                                        </a>
                                                    </Link>
                                                </span>
                                            </div>
                                        case 'other':
                                            return <div className="space-x-1 items-center" key={link.id} id={link.id}>
                                                <span>
                                                    <Link href={pathMatcher(link.data())}>
                                                        <a target="_blank" className="flex w-full justify-end pr-3">
                                                            <FontAwesomeIcon
                                                                icon={faGlobe}
                                                                className="h-8 text-black btn"
                                                            />
                                                        </a>
                                                    </Link>
                                                </span>
                                            </div>
                                        // default:
                                        //     return 'foo';
                                    }




                                }
                                )
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div >




        </>
    );
}

export default ProfileCard;