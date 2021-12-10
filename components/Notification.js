import {
  AnnotationIcon,
  ShareIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import Image from "next/image";
import { useState, useEffect } from "react";
import { onSnapshot, doc, updateDoc } from "@firebase/firestore";
import { db, auth } from "../lib/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

class MyLink extends React.Component {
  render () {
    const { onCustomClick, ...props } = this.props
    return <a {...props} onClick={this.handleClick} />
  }

  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }

    if (this.props.onCustomClick) {
      this.props.onCustomClick(event)
    }
  }
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

  useEffect(
    () =>
      onSnapshot(doc(db, "users", uid), (doc) =>
        setUserWhoNotified(doc.data())
      ),
    [uid]
  );

  const updateSeen = async () => {
    if (!seen && user) {
      await updateDoc(doc(db, "users", user.uid, "notifications", id), {
        seen: true,
      });
    }
  };

  const oldNotificationStyle = "bg-white dark:bg-black dark:bg-opacity-25 my-7 border dark:border-gray-500 dark:border-opacity-50 rounded-sm";
  const newNotificationStyle =
    "bg-white dark:bg-black dark:bg-opacity-25 my-7 border dark:border-gray-500 dark:border-opacity-50 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-1 py-1 rounded-lg shadow-md text-base font-medium";

  return (
    <Link action={updateSeen} href={`/posts/${postId}`}>
      <MyLink onCustomClick={updateSeen}>
        <div className={seen ? oldNotificationStyle : newNotificationStyle}>
          <div className="bg-white dark:bg-black dark:bg-opacity-25 rounded-sm pr-4 cursor-pointer">
            {/* Notification */}
            <div className="flex items-center pb-3">
              {/* Type of notification */}
              <div className="flex space-x-4 h-24 px-4">
                <div className="space-x-1 items-start">
                  {type == 0 && <ThumbUpIcon className="h-7" />}
                  {type == 1 && <AnnotationIcon className="h-7" />}
                  {type == 2 && <ShareIcon className="h-7" />}
                </div>
              </div>
              {/* User and Date */}
              <div className="flex w-full p-5">
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
                    <p className="font-bold inline">{userWhoNotified?.username}</p>
                    <p className="inline overflow-ellipsis overflow-hidden">
                      {type == 0 && <>liked your post !</>}
                      {type == 1 && <>sent a comment on your post.</>}
                      {type == 2 && <>shared your post !</>}
                    </p>
                  </div>
                </div>
              </div>
              {/* Cover, Artist, Title and Album date */}
              <div className="flex flex-1 h-24">
                <div className="relative w-24 border mr-2">
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
                <div className="flex flex-col">
                  <p className="h-10 w-32 sm:w-64 md:w-72 lg:w-80 xl:w-96 2xl:w-full font-bold truncate">
                    {artist}
                  </p>
                  <p className="h-10 w-32 sm:w-64 md:w-72 lg:w-80 xl:w-96 2xl:w-full font-normal truncate">
                    {title}
                  </p>
                  <p className="flex h-full w-32 sm:w-64 md:w-72 lg:w-80 xl:w-96 2xl:w-full items-end font-extralight truncate">
                    {songDate && (
                      <Moment format="DD/MM/YYYY">{new Date(songDate)}</Moment>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-left pl-4 italic text-gray-400">
              <Moment fromNow>{timestamp?.toDate()}</Moment>
            </div>
          </div>
        </div>
      </MyLink>
    </Link>
  );
}

export default Notification;
