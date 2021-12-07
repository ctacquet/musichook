import {
  AnnotationIcon,
  HeartIcon,
  ShareIcon,
  ThumbUpIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ThumbUpIcon as ThumbUpIconFilled,
  AnnotationIcon as AnnotationIconFilled,
  ShareIcon as ShareIconFilled,
} from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

import {
  onSnapshot,
  orderBy,
  query,
  collection,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import Moment from "react-moment";
import Link from "next/link";
import { DropdownButton } from "./Dropdown";
import { useAuthState } from "react-firebase-hooks/auth";
import Comments from "./Comments";
import Image from "next/image";
import classNames from "classnames";
import toast from "react-hot-toast";

function Post({
  id,
  uid,
  username,
  userImg,
  coverLink,
  spotifyLink,
  artist,
  title,
  songDate,
  timestamp,
}) {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [shares, setShares] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasFaved, setHasFaved] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [hasShared, setHasShared] = useState(false);
  const [isCommentOpen, setCommentIsOpen] = useState(false);

  const unselectedStyle = "bg-white my-7 border rounded-sm";
  const selectedStyle =
    "bg-white my-7 border-4 border-red-500 border-opacity-100 rounded-sm";

  const toggleComments = (e) => {
    e.stopPropagation();

    setCommentIsOpen(!isCommentOpen);
  };

  const likePost = async (e) => {
    e.stopPropagation();

    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    }
  };

  const favPost = async (e) => {
    e.stopPropagation();

    if (hasFaved) {
      await deleteDoc(doc(db, "posts", id, "favorites", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "favorites", user.uid), {
        username: user.displayName,
      });
    }
  };

  const sharePost = async (e) => {
    e.stopPropagation();

    if (hasShared) {
      await deleteDoc(doc(db, "posts", id, "shares", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "shares", user.uid), {
        username: user.displayName,
      });
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () => setHasLiked(likes.findIndex((like) => like.id == user?.uid) !== -1),
    [likes, user]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "favorites"), (snapshot) =>
        setFavorites(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasFaved(
        favorites.findIndex((favorite) => favorite.id == user?.uid) !== -1
      ),
    [favorites, user]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "shares"), (snapshot) =>
        setShares(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasShared(shares.findIndex((share) => share.id == user?.uid) !== -1),
    [shares, user]
  );

  useEffect(() => setHasPosted(uid == user?.uid), [user]);

  const notify = () => {
    toast.custom(
      (t) => (
        <div
          className={classNames([
            "toastWrapper",
            t.visible ? "visible " : "hidden",
          ])}
        >
          <div
            className={classNames([
              "notificationWrapper",
              t.visible ? "top-0" : "top-96",
            ])}
          >
            <div className={"iconWrapper"}>
              {/* <HiUser /> */}
              <div className="w-16 border mr-2">
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
              </div>
            </div>
            <div className={"contentWrapper"}>
              {spotifyLink && (
                <Link href={spotifyLink}>
                  <a target="_blank">
                    <h1>{artist}</h1>
                  </a>
                </Link>
              )}

              {spotifyLink && (
                <Link href={spotifyLink}>
                  <a target="_blank">
                    <p>{title}</p>
                  </a>
                </Link>
              )}
            </div>
            <div className="closeIcon" onClick={() => toast.dismiss(t.id)}>
              <XIcon className="btn h-4" />
            </div>

            <div className="flex space-x-4">
              <div className="space-x-1 items-center">
                {user && hasLiked ? (
                  <ThumbUpIconFilled
                    onClick={likePost}
                    className="btn text-purple-600 inline-block"
                  />
                ) : (
                  <ThumbUpIcon
                    onClick={user && likePost}
                    className="btn inline-block"
                  />
                )}
                {likes.length > 0 && (
                  <p className="font-bold inline-block">{likes.length}</p>
                )}
              </div>
              <div className="space-x-1 items-center">
                {(user == null && comments.length > 0 && isCommentOpen) ||
                (user && isCommentOpen) ? (
                  <AnnotationIconFilled
                    className="btn inline-block text-purple-600"
                    onClick={toggleComments}
                  />
                ) : (
                  <AnnotationIcon
                    className={"btn inline-block"}
                    onClick={toggleComments}
                  />
                )}
                {comments.length > 0 && (
                  <p className="font-bold inline-block">{comments.length}</p>
                )}
              </div>
              <div className="space-x-1 items-center">
                {user && hasShared ? (
                  <ShareIconFilled
                    className="btn inline-block text-purple-600"
                    onClick={sharePost}
                  />
                ) : (
                  <ShareIcon
                    className="btn inline-block"
                    onClick={user && sharePost}
                  />
                )}
                {shares.length > 0 && (
                  <p className="font-bold inline-block">{shares.length}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      { id: "unique-notification", position: "bottom-center" }
    );
  };

  return (
    <div className={unselectedStyle} onClick={notify}>
      <div className="flex items-start justify-end p-1">
        <div className="flex" onClick={handleClick}>
          <DropdownButton postId={id} uid={uid} />
        </div>
      </div>
      {/* Post */}
      <div className="flex items-center pb-5">
        {/* User and Date */}
        <div className="w-64 p-5">
          <div className="flex flex-col border-r border-gray-300 justify-center text-center content-center">
            <div className="border p-1 w-12 mx-auto rounded-full content-center">
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
            <div>
              <p className="font-bold overflow-ellipsis overflow-hidden">
                {username}
              </p>
            </div>
            <Moment fromNow>{timestamp?.toDate()}</Moment>
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
            {songDate && (
              <p className="flex h-full w-32 sm:w-64 md:w-72 lg:w-80 xl:w-96 2xl:w-full items-end font-extralight truncate">
                <Moment format="DD/MM/YYYY">{new Date(songDate)}</Moment>
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          {spotifyLink && (
            <div className="flex pr-3">
              <Link href={spotifyLink}>
                <a target="_blank">
                  <FontAwesomeIcon
                    icon={faSpotify}
                    className="h-8 text-green-500 btn"
                  />
                </a>
              </Link>
            </div>
          )}
          {/* 
            //If we want to add link just do like that and replace spotify by the platform we want
            spotifyLink && (
              <div className="flex pr-3">
                <Link href={spotifyLink}>
                  <a target="_blank">
                    <FontAwesomeIcon icon={faSpotify} className="h-8 text-green-500 btn" />
                  </a>
                </Link>
              </div>
            )
            */}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          {user && hasFaved ? (
            <HeartIconFilled
              onClick={favPost}
              className="btn text-red-600 inline-block"
            />
          ) : (
            <HeartIcon onClick={user && favPost} className="btn inline-block" />
          )}
        </div>
        <div className="flex space-x-4">
          <div className="space-x-1 items-center">
            {user && hasLiked ? (
              <ThumbUpIconFilled
                onClick={likePost}
                className="btn text-purple-600 inline-block"
              />
            ) : (
              <ThumbUpIcon
                onClick={user && likePost}
                className="btn inline-block"
              />
            )}
            {likes.length > 0 && (
              <p className="font-bold inline-block">{likes.length}</p>
            )}
          </div>
          <div className="space-x-1 items-center">
            {(user == null && comments.length > 0 && isCommentOpen) ||
            (user && isCommentOpen) ? (
              <AnnotationIconFilled
                className="btn inline-block text-purple-600"
                onClick={toggleComments}
              />
            ) : (
              <AnnotationIcon
                className={"btn inline-block"}
                onClick={toggleComments}
              />
            )}
            {comments.length > 0 && (
              <p className="font-bold inline-block">{comments.length}</p>
            )}
          </div>
          <div className="space-x-1 items-center">
            {user && hasShared ? (
              <ShareIconFilled
                className="btn inline-block text-purple-600"
                onClick={sharePost}
              />
            ) : (
              <ShareIcon
                className="btn inline-block"
                onClick={user && sharePost}
              />
            )}
            {shares.length > 0 && (
              <p className="font-bold inline-block">{shares.length}</p>
            )}
          </div>
        </div>
      </div>

      <Comments
        isCommentOpen={isCommentOpen}
        comments={comments}
        setComments={setComments}
        id={id}
      />
    </div>
  );
}

export default Post;
