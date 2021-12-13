import { useState, useEffect, useRef, Fragment } from "react";
import { auth, db } from "../lib/firebase";
import {
  onSnapshot,
  doc,
  collection,
  setDoc,
  deleteDoc,
} from "@firebase/firestore";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { PencilAltIcon, CheckIcon, CalendarIcon, UserCircleIcon } from "@heroicons/react/solid";
import { modalStateEditProfile } from "../atoms/modalAtomEditProfile";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { Popover, Transition } from '@headlessui/react';

function StatsPopover({ type, currentUser }) {
  const [title, setTitle] = useState("");
  const [titleText, setTitleText] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    switch (type) {
      case 1: {
        setTitle("Followers");
        setTitleText("Users that are following this user :");
        if(currentUser && currentUser.uid) {
          onSnapshot(collection(db, "users", currentUser.uid, "followers"), (snapshot) => {
            setAccounts(snapshot.docs);
          });
        }
        return;
      }
      case 2: {
        setTitle("Following");
        setTitleText("Users that this user is following :");
        if(currentUser && currentUser.uid) {
          onSnapshot(collection(db, "users", currentUser.uid, "following"), (snapshot) => {
            setAccounts(snapshot.docs);
          });
        }
        return;
      }
    }
  }, [type, db, currentUser]);

  if(accounts && accounts.length > 0) {
    return (
      <div>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                  ${open ? "" : "text-opacity-90"}
                  text-white group cursor-pointer rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <div className="flex-none text-xl text-center">
                  <div className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-red-600 inline-block pr-3">
                    {accounts ? (accounts.length) : (0)}
                  </div>
                  <div className="inline-block">{title}</div>
                </div>
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
                <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                  {({ close }) => (
                  <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-10">
                    <div className="relative grid gap-2 lg:gap-4 bg-white dark:bg-black dark:bg-opacity-90 dark:text-black border p-7 lg:grid-cols-2">
                      <div className="lg:col-span-2">
                        <p className="dark:text-white text-xl text-center">{titleText}</p><br/>
                      </div>
                      <div className="max-h-60 overflow-y-scroll scrollbar-thumb-black dark:scrollbar-thumb-white scrollbar-thin">
                        {accounts && accounts.length > 0 && accounts.map((hit) => (
                        <Link href={`/profiles/${hit.id}`}>
                          <div onClick={close} className="w-full p-2 my-1 bg-white dark:bg-black dark:text-black border hover:bg-purple-500 ring-inset focus:ring-2 focus:ring-purple-600 focus:ring-opacity-75 focus:bg-purple-300 rounded-lg">
                            <div className="inline-block pl-1">
                                <div className="translate-y-1 w-6">
                                {hit.data().userImg ? (
                                    <Image
                                    className="rounded-full"
                                    src={hit.data().userImg}
                                    alt=""
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="cover"
                                    />
                                ) : (
                                    <UserCircleIcon className="w-6 dark:text-white" />
                                )}
                                </div>
                            </div>
                            <div className="inline-block pl-2 text-xl dark:text-white">{hit.data().username ? (hit.data().username) : ("No username")}</div>
                          </div>
                        </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  )}
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  } else return (
    <div className="flex-none text-xl text-center">
      <div className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-red-600 inline-block pr-3">
        {accounts ? (accounts.length) : (0)}
      </div>
      <div className="inline-block">{title}</div>
    </div>
  );
}

function ProfileCard() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [openEdit, setOpenEdit] = useRecoilState(modalStateEditProfile);
  const [links, setLinks] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const followButtonRef = useRef(null);

  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserData(doc.data());
      });
    }
  }, [db, user, id]);

  useEffect(() => {
    if (id) {
      onSnapshot(doc(db, "users", id), (doc) => {
        setCurrentUser(doc.data());
      });
    } else if (user) {
      onSnapshot(doc(db, "users", user?.uid), (doc) => {
        setCurrentUser(doc.data());
      });
    }
  }, [db, user, id]);

  useEffect(() => {
    if (id && user) {
      onSnapshot(doc(db, "users", id, "followers", user?.uid), (snapshot) => {
        if (snapshot.exists()) {
          setFollowed(true);
        }
      });
    }
  }, [db, user, id]);

  const handleFollow = async () => {
    setLoading(true);

    if (id) {
      if (!followed) {
        const followingRef = await setDoc(
          doc(db, "users", user?.uid, "following", id),
          {
            username: userData.username,
            userImg: userData.userImg,
          }
        );
        const followersRef = await setDoc(
          doc(db, "users", id, "followers", user?.uid),
          {
            username: userData.username,
            userImg: userData.userImg,
          }
        );
      } else {
        const followingRef = await deleteDoc(
          doc(db, "users", user?.uid, "following", id)
        );
        const followersRef = await deleteDoc(
          doc(db, "users", id, "followers", user?.uid),
          {}
        );
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      onSnapshot(collection(db, "users", id, "links"), (snapshot) => {
        setLinks(snapshot.docs);
      });
    } else if (user) {
      onSnapshot(collection(db, "users", user?.uid, "links"), (snapshot) => {
        setLinks(snapshot.docs);
      });
    }
  }, [db, user, id]);

  const pathMatcher = (data) => {
    let expression = "";
    let regex = new RegExp(expression);
    let empty = "";

    switch (data.domain) {
      case "Facebook":
        expression = "https?://(www.)?facebook.com/(profile.php?id=)?";
        if (data.url.match(regex)) {
          return data.url;
        } else {
          return empty;
        }
      case "Twitter":
        expression = "https?://twitter.com/";
        if (data.url.match(regex)) {
          return data.url;
        } else {
          return empty;
        }
      case "Instagram":
        expression = "https?://(www.)?instagram.com/";
        if (data.url.match(regex)) {
          return data.url;
        } else {
          return empty;
        }
      case "Github":
        expression = "https?://(www.)?github.com/";
        if (data.url.match(regex)) {
          return data.url;
        } else {
          return empty;
        }
      case "Other":
        return data.url;

      default:
        break;
    }
  };

  return (
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
              {id &&
                user &&
                user.uid != id &&
                (followed ? (
                  <div className="flex space-x-4 items-center py-3 px-2">
                    <button
                      type="button"
                      className="btn inline-block text-xl mr-2 my-1 tracking-wider rounded-sm  px-2 cursor-pointer bg-gradient-to-l from-blue-400  to-green-400  text-white hover:from-purple-500 hover:to-red-500"
                      ref={followButtonRef}
                      onClick={() => {
                        handleFollow();
                        setFollowed(false);
                      }}
                    >
                      {followed ? "UnFollow" : "Follow"}
                    </button>

                    {loading ? "Wait..." : ""}
                    <div hidden={!followed}>
                      <CheckIcon className="text-green-500 h-8" />
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-4 items-center py-3 px-2">
                    <button
                      type="button"
                      className="btn inline-block text-xl mr-2 my-1 tracking-wider rounded-sm  px-2 cursor-pointer bg-gradient-to-bl from-purple-600 to-red-600 text-white "
                      ref={followButtonRef}
                      onClick={() => {
                        handleFollow();
                        setFollowed(true);
                      }}
                    >
                      {followed ? "UnFollow" : "Follow"}
                    </button>
                    {loading ? "Wait..." : ""}
                    <div hidden={!followed}>
                      <CheckIcon className="text-green-500 h-8" />
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="col-span-1  ">
            <p className=" font-bold overflow-ellipsis overflow-hidden ">
              {currentUser?.username}
            </p>
            <p className=" font-normal overflow-ellipsis overflow-hidden">
              {currentUser?.description}
            </p>
          </div>
          {((id && user && user.uid == id) || (!id && user)) && (
            <div className="col-span-1 flex justify-center ">
              <button onClick={() => setOpenEdit(true)}>
                <PencilAltIcon className="h-7 text-black dark:text-white" />
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 pt-3 flex flex-col lg:flex-row mx-6 justify-center lg:space-x-20">
          <div className="flex-none text-xl text-center">
            <div className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-red-600 inline-block pr-3">
              {currentUser?.posts}
            </div>
            <div className="inline-block">Posts</div>
          </div>

          <div className="flex-none text-xl text-center">
            {<StatsPopover type={1} currentUser={currentUser} />}
          </div>
          <div className="flex-none text-xl text-center">
            {<StatsPopover type={2} currentUser={currentUser} />}
          </div>

        </div>
        <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t justify-center">
          {currentUser?.genres && (
            <>
              {currentUser.genres[0] && currentUser.genres[0] !== "no genres" && currentUser.genres[0] !== "No genre" && (
                <div className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default select-none">
                  {currentUser?.genres[0]}
                </div>
              )}
              {currentUser.genres[1] && currentUser.genres[1] !== "no genres" && currentUser.genres[1] !== "No genre" && (
              <div className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default select-none">
                {currentUser?.genres[1]}
              </div>
              )}
              {currentUser.genres[2] && currentUser.genres[2] !== "no genres" && currentUser.genres[2] !== "No genre" && (
              <div className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default select-none">
                {currentUser?.genres[2]}
              </div>
              )}
            </>
          )}
        </div>
        <div>
          <div className="flex justify-end p-4">
            <div className="flex space-x-4">
              {links &&
                links.map((link) => {
                  switch (link.data().domain) {
                    case "Facebook":
                      return (
                        <div
                          className="space-x-1 items-center"
                          key={link.id}
                          id={link.id}
                        >
                          <span>
                            <Link href={pathMatcher(link.data())}>
                              <a
                                target="_blank"
                                className="flex w-full justify-end pr-3"
                              >
                                <FontAwesomeIcon
                                  icon={faFacebook}
                                  className="h-8 text-blue-700  btn"
                                />
                              </a>
                            </Link>
                          </span>
                        </div>
                      );
                    case "Instagram":
                      return (
                        <div
                          className="space-x-1 items-center"
                          key={link.id}
                          id={link.id}
                        >
                          <span>
                            <Link href={pathMatcher(link.data())}>
                              <a
                                target="_blank"
                                className="flex w-full justify-end pr-3"
                              >
                                <FontAwesomeIcon
                                  icon={faInstagram}
                                  className="h-8 text-black  btn"
                                />
                              </a>
                            </Link>
                          </span>
                        </div>
                      );
                    case "Github":
                      return (
                        <div
                          className="space-x-1 items-center"
                          key={link.id}
                          id={link.id}
                        >
                          <span>
                            <Link href={pathMatcher(link.data())}>
                              <a
                                target="_blank"
                                className="flex w-full justify-end pr-3"
                              >
                                <FontAwesomeIcon
                                  icon={faGithub}
                                  className="h-8 text-gray-800  btn"
                                />
                              </a>
                            </Link>
                          </span>
                        </div>
                      );
                    case "Twitter":
                      return (
                        <div
                          className="space-x-1 items-center"
                          key={link.id}
                          id={link.id}
                        >
                          <span>
                            <Link href={pathMatcher(link.data())}>
                              <a
                                target="_blank"
                                className="flex w-full justify-end pr-3"
                              >
                                <FontAwesomeIcon
                                  icon={faTwitter}
                                  className="h-8 text-blue-500 btn"
                                />
                              </a>
                            </Link>
                          </span>
                        </div>
                      );
                    case "Other":
                      return (
                        <div
                          className="space-x-1 items-center"
                          key={link.id}
                          id={link.id}
                        >
                          <span>
                            <Link href={pathMatcher(link.data())}>
                              <a
                                target="_blank"
                                className="flex w-full justify-end pr-3"
                              >
                                <FontAwesomeIcon
                                  icon={faGlobe}
                                  className="h-8 text-black dark:text-white btn"
                                />
                              </a>
                            </Link>
                          </span>
                        </div>
                      );
                  }
                })}
            </div>
          </div>
          <div className="flex-1 justify-start align-middle">
            <CalendarIcon className="h-4 w-4 -translate-y-0.5 inline" />
            <p className="pl-2 inline text-md">Joined </p>
            <Moment format="DD/MM/YYYY">{currentUser?.timestamp}</Moment>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
