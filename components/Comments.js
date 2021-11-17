import { useState, useRef } from "react";
import { auth, db } from "../firebase";
import {
  serverTimestamp,
  collection,
  addDoc,
} from "@firebase/firestore";
import { ChatIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import Moment from "react-moment";
import Image from "next/image";

function Comments({ id, comments, setComments, isCommentOpen }) {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const ref = useRef(null);

  const inlineStyle = isCommentOpen
    ? { height: ref.current?.scrollHeight }
    : { height: 0 };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: user.displayName,
      userImg: user.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <>
      <div
        ref={ref}
        aria-hidden={!isCommentOpen}
        style={inlineStyle}
        className="transition-height ease mt-2 text-gray-600 overflow-hidden duration-300 border-t"
      >
        {comments.length > 0 && (
          <div className="h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin border-b">
            <div className="ml-2 mt-1">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-center space-x-2 mb-3 last:mb-1"
                >
                  <div className="w-7">
                    <Image
                      className="rounded-full"
                      src={comment.data().userImg}
                      alt=""
                      width="100%"
                      height="100%"
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
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
          </div>
        )}
        {user && (
          <form className="flex items-center p-4">
            <ChatIcon className="h-7 text-black" />
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
              className="font-semibold text-purple-600"
            >
              <div className="flex space-x-2 items-end">
                <p className="flex-1">Post</p>
                <PaperAirplaneIcon className="btn flex-1 transform rotate-45" />
              </div>
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Comments;
