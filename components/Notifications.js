import Notification from "./Notification";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useAuthState } from "react-firebase-hooks/auth";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, loadingUser, error] = useAuthState(auth);

  useEffect(() => {
    if (loadingUser) {
      return (
        <div className="h-64">
          <ReactLoading
            type="spin"
            color="black"
            className="mx-auto flex content-center"
            width={64}
            height={"100%"}
          />
        </div>
      );
    }
    if (user) {
      onSnapshot(
        query(
          collection(db, "users", user.uid, "notifications"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setNotifications(snapshot.docs);
          setLoading(false);
        }
      ),
        [db];
    }
  });

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
      ) : notifications.length != 0 ? (
        notifications.map((notification) => (
          <Notification
            key={notification.id}
            id={notification.id}
            uid={notification.data().uid}
            username={notification.data().username}
            userImg={notification.data().userImg}
            coverLink={notification.data().coverLink}
            artist={notification.data().artist}
            title={notification.data().title}
            songDate={notification.data().songDate}
            postId={notification.data().postId}
            type={notification.data().type}
            seen={notification.data().seen}
            timestamp={notification.data().timestamp}
          />
        ))
      ) : (
        <h1 className="text-center mt-4 font-medium text-red-500">
          You don't have any notification.
        </h1>
      )}
    </>
  );
}

export default Notifications;
