import {
  AnnotationIcon,
  ShareIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import { DropdownButton } from "./Dropdown";
import Image from "next/image";

function Notification({
  id,
  uid,
  username,
  userImg,
  coverLink,
  artist,
  title,
  songDate,
  postId,
  type,
  seen,
  timestamp,
}) {
  const oldNotificationStyle = "bg-white my-7 border rounded-sm";
  const newNotificationStyle =
    "bg-white my-7 border bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-3 py-1 rounded-lg shadow-md text-base font-medium";

  return (
    <div className={seen ? oldNotificationStyle : newNotificationStyle}>
      <div className="flex items-start justify-end p-1">
        <div className="flex">
          <DropdownButton notificationId={id} uid={uid} />
        </div>
      </div>
      {/* Notification */}
      <div className="flex items-center pb-3">
        {/* Type of notification */}
        <div className="flex space-x-4 h-24 px-4">
          <div className={seen ? "space-x-1 items-start" : "space-x-1 items-start text-white"}>
            {type == 0 && (<ThumbUpIcon className="h-7" />)}
            {type == 1 && (<AnnotationIcon className="h-7" />)}
            {type == 2 && (<ShareIcon className="h-7" />)}
          </div>
        </div>
        {/* User and Date */}
        <div className="flex w-full p-5">
          <div className="flex flex-col">
            <div className="inline">
              <div className="border p-1 w-16 mx-auto rounded-full mb-2">
                {userImg && (
                  <Image
                    src={userImg}
                    className="rounded-full"
                    alt=""
                    width="100%"
                    height="100%"
                    layout="responsive"
                    objectFit="contain"
                  />
                )}
              </div>
            </div>
            <div className="space-x-1">
              <p className="font-bold inline">{username}</p>
              <p className="inline overflow-ellipsis overflow-hidden">
                {type == 0 && (<>liked your post !</>)}
                {type == 1 && (<>sent a comment on your post.</>)}
                {type == 2 && (<>shared your post !</>)}
                
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
      <div className="text-right">
        <Moment fromNow>{timestamp?.toDate()}</Moment>
      </div>
    </div>
  );
}

export default Notification;
