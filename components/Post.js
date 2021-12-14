import {
  AnnotationIcon,
  HeartIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ThumbUpIcon as ThumbUpIconFilled,
  AnnotationIcon as AnnotationIconFilled,
  ShareIcon as ShareIconFilled,
} from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faDeezer, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
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
import Comments from "./Comments";
import Image from "next/image";
import ReactTooltip from 'react-tooltip';
import { useTheme } from 'next-themes';

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
  const [isCommentOpen, setCommentIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect( () => {
    onSnapshot(doc(db, "users", uid), (doc) =>
      setUserWhoPosted(doc.data())
    );
    setIsMounted(true);
    setCurrentTheme(theme);
  }, [db, uid, theme]);

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
  }, [favorites, id]);

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

  return (
    <div className="bg-white dark:bg-black dark:bg-opacity-25 my-7 border dark:border-gray-500 dark:border-opacity-50 rounded-sm mx-7 lg:mx-0">
      <ReactTooltip place="top" delayHide={0} type={currentTheme === "light" ? "dark" : "light"} effect="solid" />
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
            <div className="relative w-24 h-24 border dark:border-gray-500 dark:border-opacity-50  mr-2">
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
                      <a target="_blank" data-tip="Spotify">
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
                      <a target="_blank" data-tip="Deezer" className="bg-gradient-to-tr from-amber-900 via-fuchsia-600 to-blueGray-800 rounded-full h-8 w-8 btn">
                        <FontAwesomeIcon icon={faDeezer} className="w-6 h-6 text-white mx-auto mt-1" />
                      </a>
                    </Link>
                  </div>
                )}
                {youtubeLink && (
                  <div className="flex place-content-center pl-2 lg:pl-0 lg:pt-2">
                    <Link href={youtubeLink}>
                      <a target="_blank" data-tip="Youtube" className="dark:bg-white rounded-full h-8 w-8 btn">
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
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          {user && hasFaved ? (
            <a onClick={favPost} data-tip="Remove from favorite" >
              <HeartIconFilled className="btn text-red-600 inline-block" />
            </a>
          ) : (
            <a onClick={user && favPost} data-tip="Add to favorite" >
              <HeartIcon className="btn inline-block" />
            </a>
          )}
        </div>
        <div className="flex space-x-4">
          <div className="space-x-1 items-center">
            {user && hasLiked ? (
              <a onClick={likePost} data-tip="Unlike">
                <ThumbUpIconFilled className="btn text-purple-600 inline-block" />
              </a>
            ) : (
              <a onClick={user && likePost} data-tip="Like">
                <ThumbUpIcon className="btn inline-block" />
              </a>
            )}
            {likes.length > 0 && (
              <p className="font-bold inline-block">{likes.length}</p>
            )}
          </div>
          <div className="space-x-1 items-center">
            {(user == null && comments.length > 0 && isCommentOpen) ||
            (user && isCommentOpen) ? (
              <a onClick={toggleComments} data-tip="Hide comments">
                <AnnotationIconFilled className="btn inline-block text-purple-600" />
              </a>
            ) : (
              <a onClick={toggleComments} data-tip="Show comments">
                <AnnotationIcon className={"btn inline-block"} />
              </a>
            )}
            {comments.length > 0 && (
              <p className="font-bold inline-block">{comments.length}</p>
            )}
          </div>
          <div className="space-x-1 items-center">
            <div className="bg-transparent border-0 border-transparent ring-0">
              {user && hasShared ? (
                <FontAwesomeIcon
                  icon={faRetweet}
                  className="text-purple-600 btn inline-block"
                  onClick={sharePost}
                  data-tip="Remove share"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faRetweet}
                  className="btn inline-block h-7 w-7"
                  onClick={user && sharePost}
                  data-tip="Share on MusicHook"
                />
              )}
              {shares.length > 0 && (
                <p className="font-bold inline-block pl-1">{shares.length}</p>
              )}
            </div>
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
