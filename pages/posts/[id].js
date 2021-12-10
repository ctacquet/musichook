import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PostDetailsComponent from "../../components/PostDetails";
import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import ReactLoading from "react-loading";
import MainSectionHeader from "../../components/MainSectionHeader";

const PostDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id)
      onSnapshot(doc(db, "posts", id), (doc) => {
        if (!doc.empty) setPost(doc.data());
        setLoading(false);
      });
  }, [db, id]);

  return (
    <>
      <Layout pageTitle="Profile">
        <section className="col-span-2">
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
          ) : post ? (
            <>
                <MainSectionHeader>
                    Details of post
                </MainSectionHeader>
                <PostDetailsComponent
                id={id}
                uid={post.uid}
                coverLink={post.coverLink}
                spotifyLink={post.spotifyLink}
                deezerLink={post.deezerLink}
                artist={post.artist}
                title={post.title}
                songDate={post.songDate}
                timestamp={post.timestamp}
                />
            </>
          ) : (
            <MainSectionHeader>
                <p className="text-red-400 font-normal italic text-xl normal-case">This post doesn't exists...</p>
            </MainSectionHeader>
          )}
        </section>
      </Layout>
    </>
  );
};

export default PostDetails;
