import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { doc, onSnapshot } from "@firebase/firestore";
import Moment from "react-moment";
import Image from "next/image";
import Link from 'next/link';

function Comment({ uid, comment, date }) {
  const [userWhoCommented, setUserWhoCommented] = useState(null);

  useEffect(
    () =>
      onSnapshot(doc(db, "users", uid), (doc) =>
        setUserWhoCommented(doc.data())
      ),
    [db, uid]
  );

  return (
    <div className="flex items-center space-x-2 mb-3 last:mb-1">
      {uid ? (
      <Link href={`/profiles/${uid}`}>
        <a className="w-7">
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
        </a>
      </Link>
      ) : (
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
      )}
      <p className="text-sm flex-1 dark:text-white">
        {uid ? (
          <Link href={`/profiles/${uid}`}>
            <a>  
              <span className="font-bold">{userWhoCommented?.username}</span>{" "}
            </a>
          </Link>
        ) : (
          <span className="font-bold">{userWhoCommented?.username} </span>
        )}
        {comment}
      </p>

      <Moment fromNow className="pr-5 text-xs dark:text-white">
        {date}
      </Moment>
    </div>
  );
}

export default Comment;
