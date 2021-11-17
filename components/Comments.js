import { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import {
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  collection,
  addDoc,
} from "@firebase/firestore";
import { ChatIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import { useAuthState } from "react-firebase-hooks/auth";
import Moment from "react-moment";

function Comments({ id, comments, isCommentOpen }) {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const ref = useRef(null);

  const inlineStyle = isCommentOpen
    ? { height: ref.current?.scrollHeight }
    : { height: 0 };

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
        className="transition-height ease mt-2 text-gray-600 overflow-hidden duration-300"
      >
        {comments.length > 0 && (
          <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center space-x-2 mb-3"
              >
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
