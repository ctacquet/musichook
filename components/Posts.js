import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().userImg}
          coverLink={post.data().coverLink}
          spotifyLink={post.data().spotifyLink}
          artist={post.data().artist}
          title={post.data().title}
          timestamp={post.data().timestamp}
        />
      ))}
    </div>
  );
}

export default Posts;
