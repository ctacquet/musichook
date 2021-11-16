import React, {useEffect, useRef, useState} from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./signup.css"
import {addDoc, collection, getDocs, updateDoc, doc, deleteDoc, query, where, setDoc} from "firebase/firestore";
import {auth, db} from "../firebase-config";
import {uiConfig} from "../firebaseUI-config";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import {StyledFirebaseAuth} from "react-firebaseui";


export default function Signup() {
    const emailRef = useRef()
    const pseudoRef = useRef();
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser,signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    /**database connectivity**/
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db,"users");


    const creatUser = async () => {
        const uid = currentUser.uid;
        console.log("uid :      ", uid);
        //await addDoc(usersCollectionRef,{name: newName,email: newEmail});
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        await setDoc(doc(db,"test",uid),{
            pseudo: newName,
            email: newEmail,
            description:"",
            posts:0,
            followers:0,
            follows:0,
            genres:["","",""],
            dateOfCreation:date,
            links:"",
            picture:"",
            certified:false,
            private:true,
            public:false,
            firstname:"",
            lastname:""
        });

    }
/*
   const verifyUser = async () => {

        const q = query(usersCollectionRef, where("email", "==", emailRef));
        const querySnapshot = await getDocs(q);
        try {
            if(querySnapshot.empty) {
                await creatUser()
            }else{
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            }
        }catch {
            setError("ici")
        }


    }*/


/*
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc)=> ({...doc.data(),id:doc.id})));
        };
        getUsers();
    }, [])*/

    /**database connectivity**/





    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/");

        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <>

         {/*   <div>

                    <h2>Sign Up</h2>
                {error}

                    <form onSubmit={handleSubmit}>

                        <input  ref={pseudoRef} type="pseudo" id="pseudo" required={true} placeholder="pseudo" onChange={(event) => {
                            setNewName(event.target.value);} }/>

                        <input  ref={emailRef} type="email" id="email" required={true} placeholder="email" onChange={(event) => {
                            setNewEmail(event.target.value);} }/>

                        <input  ref={passwordRef} type="password" id="password" required={true} placeholder="password">
                        </input>

                        <input  ref={passwordConfirmRef} type="password" id="password-confirm" required={true} placeholder="password-confirm">
                        </input>

                        <input  disabled={loading} value="Sign up" type="submit" >
                        </input>
                    </form>

            </div>
            <div>
                Already have an account? <Link to="/login">Log In</Link>
            </div>*/}
            <div className="signupWrapper">
                <h2 >Sign up</h2>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                <div id="loader">Loading...</div>
            </div>


        </>
    )
}
