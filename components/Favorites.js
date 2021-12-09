import Layout from "../components/Layout";
import Post from "../components/Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, loadingUser, error] = useAuthState(auth);

  useEffect(() => {
    if(user){
      onSnapshot(
        query(
          collection(db, "users", user.uid, "favorites"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setFavorites(snapshot.docs);
          setLoading(false);
        }
      )
    }
  }, [db, user]);

  if (loadingUser) {
    return (
      <Layout pageTitle="Favorites">
        <section className="col-span-2">
          <div className="h-64">
            <ReactLoading
              type="spin"
              color="black"
              className="mx-auto flex content-center"
              width={64}
              height={"100%"}
            />
          </div>
        </section>
      </Layout>
    );
  }
  
  return (
    <>
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
      ) : favorites.length != 0 ? (
        favorites.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            uid={post.data().uid}
            username={post.data().username}
            userImg={post.data().userImg}
            coverLink={post.data().coverLink}
            spotifyLink={post.data().spotifyLink}
            artist={post.data().artist}
            title={post.data().title}
            timestamp={post.data().timestamp}
          />
        ))
      ) : (
        <h1 className="text-center mt-4 font-medium text-red-500">
          You have no musics in favorites
        </h1>
      )}
    </>
  );
}
