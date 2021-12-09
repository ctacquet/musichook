import { useEffect, useRef, useState } from "react";
import Item from "./Item";
import { Slide } from "react-slideshow-image";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import 'react-slideshow-image/dist/styles.css';


function Caroussel() {

    const outermostItemRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [currentUser] = useAuthState(auth);
    const properties = {
        duration: 3000,
        transitionDuration: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        indicators: i => (<div className="indicator"></div>),
    };

    useEffect(
        () => {
            if (currentUser) {
                onSnapshot(
                    query(collection(db, "users"), where("uid", "!=", currentUser?.uid)),
                    (snapshot) => {
                        setUsers(snapshot.docs);
                    }
                )
            }

        },
        [db]
    );

    return (
        <div className="bg-gray-50 rounded-2xl pb-2">
            {
                users.length > 2 ? (
                    <Slide className="container" {...properties}>
                        {users.map((user) => {
                            return (
                                //if c.word.contains les genres du current user
                                <div className="card slide" ref={outermostItemRef} key={user.data().uid}>
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
                                <div className="card slide pr-0" ref={outermostItemRef} key={user.data().uid}>
                                    <Item data={user.data()} />
                                </div>
                            );
                        })}
                    </div>
                )
            }
        </div>
    );
}
export default Caroussel