import { useState, useEffect, useRef, Fragment } from "react";
import { auth, db } from "../lib/firebase";
import {
  onSnapshot,
  doc,
  collection,
} from "@firebase/firestore";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import {
  PencilAltIcon,
  CalendarIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
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
import Moment from "react-moment";
import { Popover, Transition } from "@headlessui/react";
import ReactLoading from "react-loading";

function StatsPopover({ type, user }) {
  const [title, setTitle] = useState("");
  const [titleText, setTitleText] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    switch (type) {
      case 1: {
        if (user && user.uid) {
          onSnapshot(
            collection(db, "users", user.uid, "followers"),
            (snapshot) => {
              setAccounts(snapshot.docs);
            }
          );
          if (accounts && accounts.length > 1) setTitle("Followers");
          else setTitle("Follower");
          setTitleText("Users that are following this user :");
        }
        return;
      }
      case 2: {
        if (user && user.uid) {
          onSnapshot(
            collection(db, "users", user.uid, "following"),
            (snapshot) => {
              setAccounts(snapshot.docs);
            }
          );
          setTitle("Following");
          setTitleText("Users that this user is following :");
        }
        return;
      }
    }
  }, [type, db, user, accounts]);

  if (accounts && accounts.length > 0) {
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
                    {accounts ? accounts.length : 0}
                  </div>
                  <div className="inline-block text-black dark:text-white">
                    {title}
                  </div>
                  <div className="inline text-black dark:text-white">
                    {open ? (<ChevronUpIcon className="h-6 w-6 inline" />) : (<ChevronDownIcon className="h-6 w-6 inline" />)}
                  </div>
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
                    <div className="max-h-60 overflow-y-scroll scrollbar-thumb-black dark:scrollbar-thumb-white scrollbar-thin rounded-lg bg-white shadow-lg ring-1 ring-black dark:ring-white ring-opacity-10">
                      <div className="relative grid gap-2 lg:gap-4 bg-white dark:bg-black dark:bg-opacity-90 dark:text-black p-7 lg:grid-cols-2">
                        <div className="lg:col-span-2">
                          <p className="text-black dark:text-white text-xl text-center">
                            {titleText}
                          </p>
                          <br />
                        </div>
                        {accounts &&
                          accounts.length > 0 &&
                          accounts.map((hit) => (
                            <Link href={`/profiles/${hit.id}`} key={hit.id}>
                              <div
                                onClick={close}
                                className="cursor-pointer w-full p-2 my-1 bg-white dark:bg-black dark:text-black border hover:bg-purple-500 ring-inset focus:ring-2 focus:ring-purple-600 focus:ring-opacity-75 focus:bg-purple-300 rounded-lg"
                              >
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
                                <div className="inline-block pl-2 text-xl text-black dark:text-white">
                                  {hit.data().username
                                    ? hit.data().username
                                    : "No username"}
                                </div>
                              </div>
                            </Link>
                          ))}
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
  } else
    return (
      <div className="flex-none text-xl text-center">
        <div className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-red-600 inline-block pr-3">
          {accounts ? accounts.length : 0}
        </div>
        <div className="inline-block">{title}</div>
      </div>
    );
}

function ProfileCard() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [openEdit, setOpenEdit] = useRecoilState(modalStateEditProfile);
  const [links, setLinks] = useState([]);

  const followButtonRef = useRef(null);

  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserData(doc.data());
      });
    }
  }, [db, user]);

  useEffect(() => {
    if (user) {
      onSnapshot(collection(db, "users", user?.uid, "links"), (snapshot) => {
        setLinks(snapshot.docs);
      });
    }
  }, [db, user]);

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

  if (userData) {
    return (
      <div>
        <div className="bg-white dark:bg-black dark:bg-opacity-25 p-8 my-7 border rounded-sm">
          <div className="grid grid-cols-3 gap-3 min-w-full items-center">
            <div className="col-span-1 w-24 rounded-full   ">
              {userData.userImg && (
                <Image
                  src={userData?.userImg}
                  className="rounded-full "
                  alt=""
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="cover"
                  priority="true"
                />
              )}
            </div>

            <div className="col-span-1  ">
              <p className=" font-bold overflow-ellipsis overflow-hidden ">
                {userData?.username}
              </p>
              <p className=" font-normal overflow-ellipsis overflow-hidden">
                {userData?.description}
              </p>
            </div>
            <div className="col-span-1 flex justify-center ">
              <button onClick={() => setOpenEdit(true)}>
                <PencilAltIcon className="h-7 text-black dark:text-white" />
              </button>
            </div>
          </div>
          <div className="mt-6 pt-3 flex flex-col lg:flex-row mx-6 justify-center lg:space-x-20">
            <div className="flex-none text-xl text-center">
              <div className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-red-600 inline-block pr-3">
                {userData?.posts}
              </div>
              <div className="inline-block">{userData && userData.posts && userData.posts > 1 ? ("Posts") : ("Post")}</div>
            </div>

            <div className="flex-none text-xl text-center">
              {<StatsPopover type={1} user={userData} />}
            </div>
            <div className="flex-none text-xl text-center">
              {<StatsPopover type={2} user={userData} />}
            </div>
          </div>
          <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t justify-center">
            {userData?.genres && (
              <>
                {userData.genres[0] &&
                  userData.genres[0].toLowerCase() !== "no genres" &&
                  userData.genres[0].toLowerCase() !== "no genre" && (
                    <div className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 select-none">
                      {userData?.genres[0]}
                    </div>
                  )}
                {userData.genres[1] &&
                  userData.genres[1].toLowerCase() !== "no genres" &&
                  userData.genres[1].toLowerCase() !== "no genre" && (
                    <div className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 select-none">
                      {userData?.genres[1]}
                    </div>
                  )}
                {userData.genres[2] &&
                  userData.genres[2].toLowerCase() !== "no genres" &&
                  userData.genres[2].toLowerCase() !== "no genre" && (
                    <div className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 select-none">
                      {userData?.genres[2]}
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
              <Moment format="DD/MM/YYYY">{userData?.timestamp}</Moment>
            </div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="h-64">
        <ReactLoading
          type="spin"
          color="black"
          className="mx-auto flex content-center"
          width={64}
          height={"100%"}
        />
      </div>
    );
}

export default ProfileCard;
