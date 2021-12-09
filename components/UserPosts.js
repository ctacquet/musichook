import Post from "./Post";
import { collection, onSnapshot, orderBy, query, where, getDocs } from "@firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

function UserPosts() {

    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [otherUser,setOtherUser] = useState(null);

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
                        snapshot.docs.map((doc) => {
                            setOtherUser(doc.get("username"))
                        });
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
            {(posts.length > 0) ? (
                <>
                    { id ? 
                        <p> {otherUser} posts</p>
                        : 
                        (<p>Your posts</p>)
                    }
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
                { id ? 
                    <p> {otherUser} hasn't posted yet.</p>
                    : 
                    (<p>This account hasn't posted yet.</p>)
                }
                </>
            )
            }
        </>
    );
}

export default UserPosts;
