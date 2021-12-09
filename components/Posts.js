import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";


function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
          setLoading(false);
        }
      ),
    [db]
  );

  return (
    <>
      {loading && (
        <div className="h-64">
          <ReactLoading
            type="spin"
            color="black"
            className="mx-auto flex content-center"
            width={64}
            height={"100%"}
          />
        </div>
      )}
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
    </>
  );
}

export default Posts;
