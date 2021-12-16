import Post from "./Post";
import { collection, onSnapshot, orderBy, query, limit, startAfter, startAt, getDocs } from "@firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const fetchMorePost = async () => {
    setLoading(true);
    const next = query(collection(db, "posts"), orderBy("timestamp", "desc"), startAfter(posts.at(-1)), limit(15));
    onSnapshot(next, (snapshot) => {
        if(!snapshot.empty){
          setPosts((post) => [...post, ...snapshot.docs]);
        } else setIsEnd(true);
        setLoading(false);
      }
    );
  };

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(15)),
        (snapshot) => {
          setPosts(snapshot.docs);
          setLoading(false);
        }
      ),
    [db]
  );

  return (
    <div className="z-10">
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
          {!isEnd ? (
            <button className="bg-white border dark:bg-black bg-opacity-50 text-black dark:text-white w-full mx-8 lg:mx-0 py-4 px-8 rounded-lg hover:bg-gray-200 dark:hover:bg-white dark:hover:bg-opacity-5" onClick={() => fetchMorePost()}>Load more</button>
          ) : (
            <h4>No more posts</h4>
          )}
        </div>
      )}
    </div>
  );
}

export default Posts;
