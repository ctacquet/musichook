import {
  AnnotationIcon,
  ShareIcon,
  ThumbUpIcon,
  XIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import Image from "next/image";
import { useState, useEffect } from "react";
import { onSnapshot, doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { db, auth } from "../lib/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactTooltip from "react-tooltip";
import { useTheme } from 'next-themes';
import toast from "react-hot-toast";

class MyLink extends React.Component {
  render() {
    const { onCustomClick, ...props } = this.props;
    return <a {...props} onClick={this.handleClick} />;
  }

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.onCustomClick) {
      this.props.onCustomClick(event);
    }
  };
}

function Notification({
  id,
  postId,
  uid,
  coverLink,
  artist,
  title,
  songDate,
  type,
  seen,
  timestamp,
}) {
  const [userWhoNotified, setUserWhoNotified] = useState(null);
  const [user] = useAuthState(auth);
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    onSnapshot(doc(db, "users", uid), (doc) => setUserWhoNotified(doc.data()));
    setCurrentTheme(theme);
  }, [db, uid, theme]);

  const updateSeen = async (e) => {
    e.stopPropagation();
    if (!seen && user) {
      await updateDoc(doc(db, "users", user.uid, "notifications", id), {
        seen: true,
      });
    }
  };

  const deleteNotification = async (e) => {
    e.stopPropagation();
    if (user) {
      await deleteDoc(doc(db, "users", user.uid, "notifications", id));
      toast.error(userWhoNotified.username + "'s notification deleted.");
    }
  };

  const oldNotificationStyle =
    "bg-white dark:bg-black dark:bg-opacity-10 my-7 border dark:border-gray-500 dark:border-opacity-50 rounded-sm";
  const newNotificationStyle =
    "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 my-7 border dark:border-gray-500 dark:border-opacity-100 px-1 py-1 rounded-lg shadow-md text-base font-medium";

  return (
    <Link href={`/posts/${postId}`}>
      <MyLink onCustomClick={updateSeen}>
        <div className={seen ? oldNotificationStyle : newNotificationStyle}>
          <ReactTooltip
            disable={isMobile}
            place="top"
            delayHide={10}
            type={currentTheme === "light" ? "dark" : "light"}
            effect="solid"
          />
          <div className="bg-white dark:bg-black dark:bg-opacity-25 rounded-sm cursor-pointer">
              <div className="w-full flex flex-row-reverse text-right">
            <a onClick={deleteNotification} data-tip="Delete notification">
              <XIcon className="h-6 w-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" />
            </a>
              </div>
            {/* Notification */}
            <div className="flex flex-col lg:flex-row items-center pb-3">
              <div className="flex flex-row w-full lg:w-48 xl:w-80 2xl:w-full justify-start pr-16">
                {/* Type of notification */}
                <div className="flex p-4">
                  <div className="space-x-1 items-center lg:items-start">
                    {type == 0 && <ThumbUpIcon className="h-7" />}
                    {type == 1 && <AnnotationIcon className="h-7" />}
                    {type == 2 && <ShareIcon className="h-7" />}
                  </div>
                </div>
                {/* User and Date */}
                <div className="flex flex-none w-full lg:w-28 xl:w-64 p-5 justify-center">
                  <div className="flex flex-col">
                    <div className="inline">
                      <div className="border dark:border-gray-500 dark:border-opacity-50 p-1 w-16 mx-auto rounded-full mb-2">
                        {userWhoNotified && (
                          <Image
                            src={userWhoNotified?.userImg}
                            className="rounded-full"
                            alt=""
                            width="100%"
                            height="100%"
                            layout="responsive"
                            objectFit="cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="space-x-1">
                      <p className="font-bold inline">
                        {userWhoNotified?.username}
                      </p>
                      <p className="inline overflow-ellipsis overflow-hidden">
                        {type == 0 && <>liked your post !</>}
                        {type == 1 && <>sent a comment on your post.</>}
                        {type == 2 && <>shared your post !</>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cover, Artist, Title and Album date */}
              <div className="flex flex-1 lg:flex-grow justify-center lg:justify-start w-full border-t pt-4 lg:pt-0 lg:border-t-0 h-24">
                <div className="relative w-24 h-24 border mr-2">
                  {coverLink && (
                    <Image
                      src={coverLink}
                      className="object-cover z-0"
                      alt=""
                      quality={100}
                      priority="false"
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                    />
                  )}
                </div>
                <div className="flex flex-col w-32 md:w-52 lg:w-52 2xl:w-72">
                  <p className="h-10 font-bold truncate">{artist}</p>
                  <p className="h-10 font-normal truncate">{title}</p>
                  <p className="flex h-full items-end font-extralight truncate">
                    {songDate && (
                      <Moment format="DD/MM/YYYY">{new Date(songDate)}</Moment>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="pl-4 italic text-gray-400">
              <Moment fromNow className="text-left">
                {timestamp?.toDate()}
              </Moment>
            </div>
            {!seen && (
              <div className="w-full flex flex-row-reverse text-right">
                <button onClick={updateSeen} data-tip="Mark as read">
                  <CheckIcon className="h-6 w-6 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" />
                </button>
              </div>
            )}
          </div>
        </div>
      </MyLink>
    </Link>
  );
}

export default Notification;
