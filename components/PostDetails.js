import {
  AnnotationIcon,
  HeartIcon,
  ShareIcon,
  ThumbUpIcon,
  XIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ThumbUpIcon as ThumbUpIconFilled,
  AnnotationIcon as AnnotationIconFilled,
  ShareIcon as ShareIconFilled,
} from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faDeezer, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  onSnapshot,
  orderBy,
  query,
  collection,
  setDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "@firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import Moment from "react-moment";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { useAuthState } from "react-firebase-hooks/auth";
import AllComments from "./AllComments";
import Image from "next/image";
import classNames from "classnames";
import toast from "react-hot-toast";

function Post({
  id,
  uid,
  coverLink,
  spotifyLink,
  deezerLink,
  youtubeLink,
  artist,
  title,
  songDate,
  timestamp,
}) {
  const [user] = useAuthState(auth);
  const [userWhoPosted, setUserWhoPosted] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [shares, setShares] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasFaved, setHasFaved] = useState(false);
  const [hasShared, setHasShared] = useState(false);

  useEffect(
    () =>
      onSnapshot(doc(db, "users", uid), (doc) =>
        setUserWhoPosted(doc.data())
      ),
    [uid]
  );

  const likePost = async (e) => {
    e.stopPropagation();

    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        uid: user.uid,
      });
    }
  };

  const favPost = async (e) => {
    e.stopPropagation();

    if (hasFaved) {
      await deleteDoc(doc(db, "users", user.uid, "favorites", id));
    } else {
      await setDoc(doc(db, "users", user.uid, "favorites", id), {
        artist: artist,
        uid: uid,
        coverLink: coverLink,
        spotifyLink: spotifyLink,
        title: title,
        timestamp: serverTimestamp(),
      });
    }
  };

  const sharePost = async (e) => {
    e.stopPropagation();

    if (hasShared) {
      await deleteDoc(doc(db, "posts", id, "shares", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "shares", user.uid), {
        uid: user.uid,
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

  useEffect(() => {
    if (user)
      onSnapshot(collection(db, "users", user.uid, "favorites"), (snapshot) =>
        setFavorites(snapshot.docs)
      );
  }, [db, user]);

  useEffect(() => {
    setHasFaved(favorites.findIndex((favorite) => favorite.id == id) !== -1);
  }, [favorites, user]);

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
              <div className="space-x-1 items-center">
                  <Link href={`/posts/${id}`}>
                    <InformationCircleIcon
                      className={"btn inline-block text-purple-600"}
                    />
                  </Link>
              </div>
            </div>
          </div>
        </div>
      ),
      { id: "unique-notification", position: "bottom-center" }
    );
  };

  return (
    <div className="bg-white dark:bg-black dark:bg-opacity-25 my-7 border dark:border-gray-500 dark:border-opacity-50 rounded-sm mx-7 lg:mx-0" onClick={notify}>
      <div className="flex items-start justify-end p-1">
        <div className="flex" onClick={handleClick}>
          <Dropdown postId={id} uid={uid} />
        </div>
      </div>
      {/* Post */}
      <div className="flex flex-col items-left lg:items-center pb-5 lg:flex-row">
        {/* User and Date */}
        <Link href={`/profiles/${uid}`}>
        <div className="lg:w-48 px-5 cursor-pointer" onClick={handleClick}>
          <div className="flex space-x-4 lg:space-x-0 lg:flex-col pb-3 lg:pb-0 border-b lg:border-b-0 lg:border-r border-gray-300 dark:border-gray-500 dark:border-opacity-50 justify-center text-left lg:text-center content-left lg:content-center">
            <div className="border p-1 w-16 mx-0 lg:mx-auto rounded-full content-center">
              {userWhoPosted && (
                <Image
                  src={userWhoPosted?.userImg}
                  className="rounded-full"
                  alt=""
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="cover"
                />
              )}
            </div>
            <div className="my-auto">
              <p className="font-bold overflow-ellipsis overflow-hidden">
                {userWhoPosted?.username}
              </p>
            </div>
            <Moment fromNow className="my-auto">{timestamp?.toDate()}</Moment>
          </div>
        </div>
        </Link>
        {/* Cover, Artist, Title and Album date */}
        <div className="pt-3 lg:pt-0 pl-6 lg:pl-0 w-64 h-24">
          <div className="grid grid-cols-2">
            <div className="relative w-24 h-24 border mr-2">
              {coverLink && (
                <Image
                  src={coverLink}
                  className="object-cover z-0"
                  alt=""
                  quality={100}
                  priority="false"
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <div className="flex flex-col">
              <p className="h-10 w-auto md:w-max lg:w-32 xl:w-56 2xl:w-80 font-bold truncate">
                {artist}
              </p>
              <p className="h-10 w-auto md:w-max lg:w-32 xl:w-56 2xl:w-80 font-normal truncate">
                {title}
              </p>
              {songDate && (
                <p className="flex h-full w-32 sm:w-64 md:w-72 lg:w-80 xl:w-96 2xl:w-full items-end font-extralight truncate">
                  <Moment format="DD/MM/YYYY">{new Date(songDate)}</Moment>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Streaming platforms buttons */}
        <div className="mt-6 lg:mt-0 flex flex-grow justify-center lg:justify-end pr-2">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-0.5 rounded-lg">
            <div className="rounded-md shadow-xl p-1 bg-white dark:bg-black dark:bg-opacity-100">
              <p className="font-semibold p-2 pt-0">Listen on</p>
              <div className="flex flex-row lg:flex-col justify-center">
                {spotifyLink && (
                  <div className="flex place-content-center">
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
                {deezerLink && (
                  <div className="flex place-content-center pl-2 lg:pl-0 lg:pt-2">
                    <Link href={deezerLink}>
                      <a target="_blank" className="bg-gradient-to-tr from-amber-900 via-fuchsia-600 to-blueGray-800 rounded-full h-8 w-8 btn">
                        <FontAwesomeIcon icon={faDeezer} className="w-6 h-6 text-white mx-auto mt-1" />
                      </a>
                    </Link>
                  </div>
                )}
                {youtubeLink && (
                  <div className="flex place-content-center pl-2 lg:pl-0 lg:pt-2">
                    <Link href={youtubeLink}>
                      <a target="_blank" className="dark:bg-white rounded-full h-8 w-8 btn">
                        <FontAwesomeIcon icon={faYoutube} className="w-6 h-6 text-red-500 mx-auto mt-1" />
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      {user && (
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
              <AnnotationIconFilled
                className="h-7 transition-all duration-150 ease-out select-none inline-block text-purple-600"
              />
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
      )}

      <AllComments
        isCommentOpen={true}
        comments={comments}
        setComments={setComments}
        id={id}
      />
    </div>
  );
}

export default Post;
