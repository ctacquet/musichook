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
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  ThumbUpIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ThumbUpIcon as ThumbUpIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Moment from "react-moment";
import Link from "next/link";

function Post({
  id,
  username,
  userImg,
  coverLink,
  spotifyLink,
  artist,
  title,
  timestamp,
}) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

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
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id == session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
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
        <DotsHorizontalIcon className="h-5" />
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
      <div className="flex justify-between px-4 pt-4 pb-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
        </div>
        <div className="flex space-x-4">
            <div className="space-x-1 items-center">
                {hasLiked ? (
                    <ThumbUpIconFilled onClick={likePost} className="btn text-purple-600 inline-block" />
                ) : (
                    <ThumbUpIcon onClick={likePost} className="btn inline-block" />
                )}
                {likes.length > 0 && (
                    <p className="font-bold inline-block">{likes.length}</p>
                )}
            </div>
            <div className="space-x-1 items-center">
                <AnnotationIcon className="btn inline-block" />
                {comments.length > 0 && (
                    <p className="font-bold inline-block">{comments.length}</p>
                )}
            </div>
          <ShareIcon className="btn" />
        </div>
      </div>
      
      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="w-7 rounded-full"
                src={comment.data().userImg}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>

              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input box */}
      {session && (
        <form className="flex items-center p-4">
          <ChatIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
