import Post from "./Post";
import { collection, onSnapshot, orderBy, query, limit, startAfter, startAt, getDocs } from "@firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  /*
  const fetchMorePost = async () => {
    setLoading(true);
    const next = query(collection(db, "posts"), orderBy("timestamp", "desc"), startAfter(posts.length), limit(5));
    onSnapshot(next, (snapshot) => {
        const newOnes = [];
        snapshot.forEach((doc) => {
          newOnes.push(doc.data());
        });
        console.log(newOnes);
        setPosts((post) => [...post, ...newOnes]);
        setLoading(false);
      }
    );
  };
  */

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")), //, limit(5)
        (snapshot) => {
          setPosts(snapshot.docs);
          setLoading(false);
        }
      ),
    [db]
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
        <>
          {/*
            <button className="bg-black dark:bg-black bg-opacity-50 text-white p-4 rounded-lg w-full hover:bg-gray-500 dark:hover:bg-gray-600" onClick={() => fetchMorePost()}>More Posts</button>
          */}
        </>
      )}
    </>
  );
}

export default Posts;
