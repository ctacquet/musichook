import Post from "./Post";
import { collection, onSnapshot, orderBy, query, limit, startAfter, doc, where } from "@firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserAddIcon } from "@heroicons/react/outline";
import Link from "next/link";

function FeedPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [user] = useAuthState(auth);
  const [followingAccounts, setFollowingAccounts] = useState([]);
  const [followSomeUsers, setFollowSomeUsers] = useState(false);

  useEffect(
    () => {
      if (user) {
        onSnapshot(
          collection(db, "users", user.uid, "following"),
          (snapshot) => {
            if(!snapshot.empty){
              const ids = snapshot.docs.map(doc => doc.id);
              setFollowingAccounts(ids);
            } 
          }
        );
        if(followingAccounts && followingAccounts.length > 0){
          setFollowSomeUsers(false);
          onSnapshot(
            query(collection(db, "posts"), orderBy("timestamp", "desc"), where("uid", "in", followingAccounts), limit(15)),
            (snapshot) => {
              setPosts(snapshot.docs);
            }
          );
        } else setFollowSomeUsers(true);
      };
      setLoading(false);
    }, [db, user, followingAccounts]
  );

  return (
    <>
      { 
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            uid={post.data().uid}
            coverLink={post.data().coverLink}
            spotifyLink={post.data().spotifyLink}
            deezerLink={post.data()?.deezerLink}
            artist={post.data().artist}
            title={post.data().title}
            songDate={post.data().songDate}
            timestamp={post.data().timestamp}
          />
        ))
      }
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
        <div className="flex justify-center">
          {followSomeUsers ? (
            <div
                className="mx-2 md:mx-4 lg:mx-6 xl:mx-8 flex bg-purple-100 dark:bg-purple-600 rounded-lg p-4 m-4 text-sm text-purple-700 dark:text-white"
                role="alert"
            >
                <UserAddIcon className="h-6 w-6 animate-pulse" />
                <div className="pl-2 w-full translate-y-0.5">
                <span className="font-bold pr-2">You are actually following no one.</span> <br/>
                <p className="inline">When you follow someone, his posts will be appear here. <br/>Let's follow some users ! You should check </p> 
                <Link href="/discover">
                  <a className="inline font-bold underline hover:text-blue-400">discover</a>
                </Link>
                <p className="inline"> page 😉</p>
                </div>
            </div>
          ) : (
            <h4 className="p-4">No more posts</h4>
          )}
        </div>
      )}
    </>
  );
}

export default FeedPosts;
