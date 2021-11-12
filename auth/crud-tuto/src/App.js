import './App.css';
import {useState, useEffect, useContext} from "react";
import {db,auth } from './firebase-config'
import {addDoc, collection, getDocs, updateDoc, doc,deleteDoc} from "firebase/firestore";
import {   createUserWithEmailAndPassword,   signInWithEmailAndPassword,  onAuthStateChanged, signOut,} from "firebase/auth";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./pages/Profile";
import {Switch} from "react-router-dom";



function App() {
    const [isAuthenticated, setAuthentication] = useState(false);

    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db,"users");

  /**** auth ****/
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
            setAuthentication(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
            setAuthentication(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setAuthentication(false);
    };

   /**** auth ****/
  const creatUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: Number(newAge)});
  }

  const updateUser = async (id,age) =>{

      const newFields = {age:age + 1};
      const userDoc = doc(db,"users",id);
      await updateDoc(userDoc,newFields);
  }

    const deleteUser = async (id) =>{

        const userDoc = doc(db,"users",id);
        await deleteDoc(userDoc);
    }

  useEffect(() => {
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc)=> ({...doc.data(),id:doc.id})));
    };
    getUsers();
  }, [])

  return  (

      /* <div className="App">
            <input placeholder="Name" onChange={(event) => {
                setNewName(event.target.value);} }
            />
            <input type="number" placeholder="Age" onChange={(event) => {
                setNewAge(event.target.value);} }
            />
            <button onClick={creatUser}>Create User</button>
                {users.map((user)=> {
                    return <div>
                        <h1>{user.name}</h1>
                        <h1>{user.age}</h1>
                        <button onClick={()=> {updateUser(user.id,user.age);}}>Increase age</button>
                        <button onClick={()=> {deleteUser(user.id);}}>Delete User</button>
                    </div>;
                  })}

            <div>
                <h3> Register User </h3>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />

                <button onClick={register}> Create User</button>
            </div>

            <div>
                <h3> Login </h3>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />

                <button onClick={login}> Login</button>
            </div>

            <h4> User Logged In: </h4>
            {user?.email}

            <button onClick={logout}> Sign Out </button>

          </div>*/


      <Router>
            <Switch>
                <Route exact path="/" >
                    <button>login</button>
                </Route>
            </Switch>



          {/*<ProtectedRoute path="/profile" component={Profile} isAuth={isAuthenticated}/>*/}


      </Router>


    );
}

export default App;
