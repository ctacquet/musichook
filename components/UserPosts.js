import Post from "./Post";
import { collection, onSnapshot, orderBy, query, where, getDocs } from "@firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import MainSectionHeader from "./MainSectionHeader";

function UserPosts() {

    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);



    const router = useRouter()
    const { id } = router.query


    useEffect(
        () => {
            if (id) {
                onSnapshot(
                    query(collection(db, "posts"), where("uid", "==", id)),
                    async (snapshot) => {
                        const qsn = await getDocs(snapshot.query);
                        setPosts(qsn.docs)
                        setLoading(false);

                    }
                )
            } else if (user) {
                onSnapshot(
                    query(collection(db, "posts"), where("uid", "==", user?.uid)),
                    async (snapshot) => {
                        const qsn = await getDocs(snapshot.query);
                        setPosts(qsn.docs)
                        setLoading(false);
                    }
                )
            }
        },
        [db, user, id]
    );

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
            ) :
                (posts.length > 0) ? (
                    <>

                        <div className="pt-1 mx-6 border-t border-gray-700 border-opacity-70"></div>

                        {
                            posts.map((post) => (
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
                        }
                    </>
                ) : (
                    <>
                        {id ? (
                            <div className="pt-1 mx-6 border-t border-gray-700 border-opacity-70">
                                <MainSectionHeader> This account hasn't posted yet.</MainSectionHeader>
                            </div>
                        ) :

                            (
                                <div className="pt-1 mx-6 border-t border-gray-700 border-opacity-70">
                                    <MainSectionHeader>You didn't posted yet.</MainSectionHeader>
                                </div>

                            )
                        }
                    </>
                )
            }
        </>
    );
}

export default UserPosts;
