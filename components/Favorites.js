import Layout from "../components/Layout";
import Post from "../components/Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useAuthState } from "react-firebase-hooks/auth";
import MainSectionHeader from './MainSectionHeader';
import { useRouter } from 'next/router';

function MainSectionHeaderImpl(){
  return (
    <MainSectionHeader>
      <p className="inline font-normal">Your </p>
      <p className="inline text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">favorites </p>
      <p className="inline font-normal">ordered by addition</p>
    </MainSectionHeader>
  );
}

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if(!loadingUser && !user) router.push("/");
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
  }, [db, user, loadingUser]);

  if (loadingUser) {
    return (
      <Layout pageTitle="Favorites">
        <section className="col-span-2">
          <MainSectionHeaderImpl/>
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
        <>
          <MainSectionHeaderImpl/>
          <div className="h-64">
            <ReactLoading
              type="spin"
              color="black"
              className="mx-auto flex content-center"
              width={64}
              height={"100%"}
            />
          </div>
        </>
      ) : favorites.length != 0 ? (
        <>
          <MainSectionHeaderImpl/>
          {favorites.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              uid={post.data().uid}
              coverLink={post.data().coverLink}
              spotifyLink={post.data().spotifyLink}
              artist={post.data().artist}
              title={post.data().title}
              timestamp={post.data().timestamp}
            />
          ))}
        </>
      ) : (
        <MainSectionHeader>
          <p className="inline text-gray-500">
          You have no favorite music at the moment...
          </p>
        </MainSectionHeader>
      )}
    </>
  );
}
