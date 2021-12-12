import { useState, useRef } from "react";
import { auth, db } from "../lib/firebase";
import {
  serverTimestamp,
  collection,
  addDoc,
} from "@firebase/firestore";
import { ChatIcon, ReplyIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import Comment from "./Comment";

function Comments({ id, comments, setComments, isCommentOpen }) {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const ref = useRef(null);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      uid: user.uid,
      timestamp: serverTimestamp(),
    });
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        ref={ref}
        aria-hidden={!isCommentOpen}
        onClick={handleClick}
        className="transition-height ease mt-2 text-gray-600 overflow-hidden duration-300 border-t dark:border-gray-500 dark:border-opacity-50"
      >
        {user && (
          <form className="flex items-center p-4">
            <ChatIcon className="h-7 text-black" />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="border-none flex-1 focus:ring-0 outline-none rounded-lg dark:bg-black dark:bg-opacity-75 mx-2"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              onClick={sendComment}
              className="font-semibold text-purple-600"
            >
              <div className="flex space-x-2 items-end">
                <p className="flex-1">Post</p>
                <ReplyIcon className="btn flex-1" />
              </div>
            </button>
          </form>
        )}
        {comments.length > 0 && (
          <div className="border-t dark:border-gray-500 dark:border-opacity-50">
            <div className="ml-2 mt-1">
              {comments.map((comment) => (
                <Comment 
                key={comment.id}
                id={comment.id}
                uid={comment.data().uid} 
                comment={comment.data().comment}
                date={comment.data().timestamp?.toDate()}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Comments;
