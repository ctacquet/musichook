import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, onSnapshot } from "@firebase/firestore";
import Moment from "react-moment";
import Image from "next/image";

function Comment({ uid, comment, date }) {
  const [userWhoCommented, setUserWhoCommented] = useState(null);

  useEffect(
    () =>
      onSnapshot(doc(db, "users", uid), (doc) =>
        setUserWhoCommented(doc.data())
      ),
    [uid]
  );

  return (
    <div className="flex items-center space-x-2 mb-3 last:mb-1">
      <div className="w-7">
        {userWhoCommented && (
          <Image
            src={userWhoCommented?.userImg}
            className="rounded-full"
            alt=""
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="cover"
          />
        )}
      </div>
      <p className="text-sm flex-1">
        <span className="font-bold">{userWhoCommented?.username}</span>{" "}
        {comment}
      </p>

      <Moment fromNow className="pr-5 text-xs">
        {date}
      </Moment>
    </div>
  );
}

export default Comment;