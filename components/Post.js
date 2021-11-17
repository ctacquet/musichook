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
  ChatIcon,
  HeartIcon,
  ShareIcon,
  ThumbUpIcon,
  ExternalLinkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ThumbUpIcon as ThumbUpIconFilled,
  AnnotationIcon as AnnotationIconFilled,
} from "@heroicons/react/solid";
import { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import Moment from "react-moment";
import Link from "next/link";
import { DropdownButton } from "./Dropdown";
import { useAuthState } from "react-firebase-hooks/auth";
import Comments from './Comments';

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
  const [hasLiked, setHasLiked] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [isCommentOpen, setCommentIsOpen] = useState(false);

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

  const toggleComments = () => {
    setCommentIsOpen(!isCommentOpen);
  };

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

  useEffect(() => setHasPosted(uid == user?.uid), [user]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    }
  };

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-cover border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        {hasPosted && <DropdownButton postId={id} uid={uid} />}
      </div>

      {/* Title */}
      <div className="flex items-center p-5">
        <div className="mr-2">
          <img src={coverLink} className="object-cover w-16" alt="" />
        </div>
        <div className="flex-1">
          <p className="font-bold">{artist}</p>
          <p className="font-normal">{title}</p>
        </div>

        {spotifyLink && (
          <div className="flex-auto">
            <Link href={spotifyLink}>
              <a target="_blank">
                <ExternalLinkIcon className="h-5 text-green-700" />
              </a>
            </Link>
          </div>
        )}

        <Moment fromNow className="flex-none">
          {timestamp?.toDate()}
        </Moment>
      </div>

      {/* Buttons */}
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
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
            {(user && isCommentOpen) ||
            (isCommentOpen && comments.length > 0) ? (
              <AnnotationIconFilled
                className="btn inline-block text-purple-600"
                onClick={toggleComments}
              />
            ) : (
              <AnnotationIcon
                className="btn inline-block"
                onClick={toggleComments}
              />
            )}
            {comments.length > 0 && (
              <p className="font-bold inline-block">{comments.length}</p>
            )}
          </div>
          <ShareIcon className="btn" />
        </div>
      </div>

      <Comments isCommentOpen={isCommentOpen} comments={comments} id={id} />
    </div>
  );
}

export default Post;
