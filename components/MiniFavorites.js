import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  onSnapshot,
  query,
  orderBy,
  collection,
  limit,
} from "@firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import MiniFavorite from "./MiniFavorite";

function MiniFavorites() {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      onSnapshot(
        query(
          collection(db, "users", user.uid, "favorites"),
          orderBy("timestamp", "desc"),
          limit(4)
        ),
        (snapshot) => {
          setFavorites(snapshot.docs);
          setLoading(false);
        }
      );
    }
  }, [db, user]);

  if (user)
    return (
      <>
        {favorites.length != 0 && (
          <div className="bg-white my-7 border rounded-sm p-2 space-y-2">
            <Link href="/favorites">
              <a className="cursor-pointer text-xl">
                <div className="flex items-center space-x-2">
                  <HeartIconFilled className="icon" />
                  <p className="menuText">Last favorites</p>
                </div>
              </a>
            </Link>
            {loading ? (
              <div className="h-64">
                <ReactLoading
                  type="spin"
                  color="black"
                  className="mx-auto flex content-center"
                  width={64}
                  height={"100%"}
                />
              </div>
            ) : (
              favorites.map((post) => (
                <MiniFavorite
                  key={post.id}
                  id={post.id}
                  coverLink={post.data().coverLink}
                  artist={post.data().artist}
                  title={post.data().title}
                />
              ))
            )}
          </div>
        )}
      </>
    );

  return <></>;
}

export default MiniFavorites;
