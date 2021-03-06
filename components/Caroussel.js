import { useEffect, useRef, useState } from "react";
import Item from "./Item";
import { Slide } from "react-slideshow-image";
import { collection, onSnapshot, query, where, doc, getDocs } from "@firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-slideshow-image/dist/styles.css";

function Caroussel() {
  const outermostItemRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(null);

  const properties = {
    duration: 3000,
    transitionDuration: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    indicators: (i) => <div className="indicator"></div>,
  };

  async function handleClickOnGenre(genre) {
    if (user) {
      const snapshot = await getDocs(query(collection(db, "users"), where("uid", "!=", user.uid)));
      if (genre) {
        const newUsers = [];
        snapshot.docs.map((user) => {
          if (Object.values(user.data().genres).includes(genre))
            newUsers.push(user);
        });
        setUsers(newUsers);
      } else {
        setUsers(snapshot.docs);
      }
    }
  }

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.uid), (doc) => {
        setCurrentUser(doc.data());
      });
      onSnapshot(
        query(collection(db, "users"), where("uid", "!=", user.uid)),
        (snapshot) => {
          setUsers(snapshot.docs);
        }
      );
    }
  }, [db, user]);

  return (
    <>
      <div className="dark:bg-black dark:bg-opacity-25 border dark:border-gray-500 dark:border-opacity-50 rounded-2xl pb-2">
        <div className="mt-6 pt-3 flex flex-wrap mx-6 justify-center">
          {currentUser?.genres && (
            <>
              <button
                onClick={() => handleClickOnGenre()}
                className="text-xl text-center w-36 mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 focus:bg-indigo-600 focus:text-indigo-100 hover:text-indigo-100 hover:bg-gray-600 select-none"
              >
                All genres
              </button>
              {currentUser.genres[0] &&
                currentUser.genres[0].toLowerCase() !== "no genres" &&
                currentUser.genres[0].toLowerCase() !== "no genre" && (
                  <button
                    onClick={() => handleClickOnGenre(currentUser.genres[0])}
                    className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 focus:bg-indigo-600 focus:text-indigo-100 hover:text-indigo-100 hover:bg-gray-600 select-none"
                  >
                    {currentUser?.genres[0]}
                  </button>
                )}
              {currentUser.genres[1] &&
                currentUser.genres[1].toLowerCase() !== "no genres" &&
                currentUser.genres[1].toLowerCase() !== "no genre" && (
                  <button
                    onClick={() => handleClickOnGenre(currentUser.genres[1])}
                    className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 focus:bg-indigo-600 focus:text-indigo-100 hover:text-indigo-100 hover:bg-gray-600 select-none"
                  >
                    {currentUser?.genres[1]}
                  </button>
                )}

              {currentUser.genres[2] &&
                currentUser.genres[2].toLowerCase() !== "no genres" &&
                currentUser.genres[2].toLowerCase() !== "no genre" && (
                  <button
                    onClick={() => handleClickOnGenre(currentUser.genres[2])}
                    className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 focus:bg-indigo-600 focus:text-indigo-100 hover:text-indigo-100 hover:bg-gray-600 select-none"
                  >
                    {currentUser?.genres[2]}
                  </button>
                )}
            </>
          )}
        </div>
        {users.length == 0 ? (
          <h1 className="pt-6 p-4 w-full text-center">No user found</h1>
        ) : users.length > 2 ? (
          <Slide className="" {...properties}>
            {users &&
              users.map((user) => {
                return (
                  <div
                    className="card slide"
                    ref={outermostItemRef}
                    key={user.data().uid}
                  >
                    <Item data={user.data()} />
                  </div>
                );
              })}
          </Slide>
        ) : (
          <div className="flex justify-center">
            {users.map((user) => {
              return (
                <div
                  className="card slide pr-0"
                  ref={outermostItemRef}
                  key={user.data().uid}
                >
                  <Item data={user.data()} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
export default Caroussel;
