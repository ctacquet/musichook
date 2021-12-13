import { useEffect, useRef, useState } from "react";
import Item from "./Item";
import { Slide } from "react-slideshow-image";
import { collection, onSnapshot, query, where, doc } from "@firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "react-slideshow-image/dist/styles.css";
import { InformationCircleIcon } from "@heroicons/react/outline";

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

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user?.uid), (doc) => {
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
      <div
        className="mx-2 md:mx-8 lg:mx-12 xl:mx-18 flex bg-blue-100 dark:bg-blue-600 rounded-lg p-4 m-4 text-sm text-blue-700 dark:text-white"
        role="alert"
      >
        <InformationCircleIcon className="h-6 w-6" />
        <div className="pl-2 w-full translate-y-0.5">
          <span className="font-bold pr-2">Info alert!</span> 
          <p className="inline">We are actually working on updating discover page to let you using filters.</p>
        </div>
      </div>
      <div className="dark:bg-black dark:bg-opacity-25 border dark:border-gray-500 dark:border-opacity-50 rounded-2xl pb-2">
        <div className="mt-6 pt-3 flex flex-wrap mx-6 justify-center">
          {currentUser?.genres && (
            <>
              <div className="text-xl text-center w-36 mr-2 my-1 uppercase tracking-wider border px-2 border-indigo-600 bg-indigo-600 text-indigo-100 cursor-default select-none">
                All genres
              </div>
                {
                    currentUser.genres[0] &&
                    currentUser.genres[0] !== "no genres" &&
                    currentUser.genres[0] !== "No genre" && (
                    <a
                        disabled
                        className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:text-indigo-100 hover:bg-gray-600 cursor-not-allowed select-none"
                    >
                        {currentUser?.genres[0]}
                    </a>
                    )
                }
                {
                    currentUser.genres[1] &&
                    currentUser.genres[1] !== "no genres" &&
                    currentUser.genres[1] !== "No genre" && (
                    <a
                        disabled
                        className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:text-indigo-100 hover:bg-gray-600 cursor-not-allowed select-none"
                    >
                        {currentUser?.genres[1]}
                    </a>
                    )
                }
              
                {
                    currentUser.genres[2] &&
                    currentUser.genres[2] !== "no genres" &&
                    currentUser.genres[2] !== "No genre" && (
                    <a
                        disabled
                        className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:text-indigo-100 hover:bg-gray-600 cursor-not-allowed select-none"
                      >
                          {currentUser?.genres[2]}
                    </a>
                    )
                }
            </>
          )}
        </div>
        {users.length > 2 ? (
          <Slide className="" {...properties}>
            {users.map((user) => {
              return (
                //if c.word.contains les genres du current user
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
                //if c.word.contains les genres du current user
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
