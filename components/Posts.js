import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { modalState2 } from '../atoms/modalAtom2';
import { useRecoilState } from "recoil";

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


  /*partie ouverture sticky bottom */
  const [isPopupVisible, setPopupVisibility] = useRecoilState(modalState2);
  //const [opened, setOpened] = useState(true);
  const [selectedId, setSelectedId] = useState(null);


  const togglePopup = ({ id }) => {
  
    setSelectedId(id);
    setPopupVisibility(!isPopupVisible);
    // setOpened(!opened);
    posts.find((post) =>  post.active = true);
  };






  return (
    <div>
      {posts.map((post) => (
        <Post
          
          togglePopup={togglePopup}
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
      ))}
    </div>
  );
}

export default Posts;
