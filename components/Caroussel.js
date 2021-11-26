import { useEffect, useRef, useState } from "react";

import { clientCarouselItems as clients } from "./data";
import Item from "./Item";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
import { collection, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";


function Caroussel() {

    const outermostItemRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser] = useAuthState(auth);


    useEffect(
        onSnapshot(
            query(collection(db, "users"),where("uid","!=",currentUser.uid)),
            (snapshot) => {
                setUsers(snapshot.docs);
            }
        ),
        [db]
    );



    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setSuggestions(data);
    //         });
    // }, []);

    const properties = {
        duration: 3000,
        transitionDuration: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        indicators: i => (<div className="indicator"></div>),
    };

    return (
        <div>
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