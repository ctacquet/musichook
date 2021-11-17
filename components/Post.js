import {
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import {
  AnnotationIcon,
  HeartIcon,
  ShareIcon,
  ThumbUpIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ThumbUpIcon as ThumbUpIconFilled,
  AnnotationIcon as AnnotationIconFilled,
  ShareIcon as ShareIconFilled,
} from "@heroicons/react/solid";
import { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import Moment from "react-moment";
import Link from "next/link";
import { DropdownButton } from "./Dropdown";
import { useAuthState } from "react-firebase-hooks/auth";
import Comments from "./Comments";
import Image from "next/image";

function Post({
  id,
  uid,
  username,
  userImg,
  coverLink,
  spotifyLink,
  artist,
  title,
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

  const toggleComments = () => {
    setCommentIsOpen(!isCommentOpen);
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    }
  };

  const favPost = async () => {
    if (hasFaved) {
      await deleteDoc(doc(db, "posts", id, "favorites", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "favorites", user.uid), {
        username: user.displayName,
      });
    }
  };

  const sharePost = async () => {
    if (hasShared) {
      await deleteDoc(doc(db, "posts", id, "shares", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "shares", user.uid), {
        username: user.displayName,
      });
    }
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

  return (
    <div className="bg-white my-7 border rounded-sm">
      <div className="flex items-start justify-end p-1">
        <DropdownButton postId={id} uid={uid} />
      </div>
      {/* Post */}
      <div className="flex items-center pr-5 pb-5">
        {/* User and Date */}
        <div className="flex-1 max-w-xs w-32 p-5">
          <div className="flex flex-col border-r border-gray-300 justify-center text-center content-center">
            <div className="border p-1 w-12 mx-auto rounded-full content-center">
              <Image
                src={userImg}
                className="rounded-full"
                alt=""
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div>
              <p className="font-bold overflow-ellipsis overflow-hidden">{username}</p>
            </div>
            <Moment fromNow>
              {timestamp?.toDate()}
            </Moment>
          </div>
        </div>
        {/* Cover, Artist and Title */}
        <div className="flex flex-none align-middle">
          <div className="w-24 border mr-2">
            <Image
              src={coverLink}
              className="object-cover z-0"
              alt=""
              quality={100}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="flex font-bold overflow-ellipsis overflow-hidden">{artist}</p>
            <p className="flex font-normal overflow-ellipsis overflow-hidden">{title}</p>
          </div>
        </div>

        <div className="flex flex-1 justify-end">
          {spotifyLink && (
            <Link href={spotifyLink}>
              <a target="_blank">
                <ExternalLinkIcon className="h-5 text-green-700" />
              </a>
            </Link>
          )}
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
            {(user == null && comments.length > 0 && isCommentOpen) || (user && isCommentOpen) ? (
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
