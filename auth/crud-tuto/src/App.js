import {useState, useEffect, useContext} from "react";
import {db,auth } from './firebase-config'
import {addDoc, collection, getDocs, updateDoc, doc,deleteDoc} from "firebase/firestore";
import {   createUserWithEmailAndPassword,   signInWithEmailAndPassword,  onAuthStateChanged, signOut,} from "firebase/auth";
import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./pages/Profile";
import {Switch} from "react-router-dom";
import {Redirect, withRouter} from "react-router";
import {AuthProvider} from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import UpdateProfile from "./components/UpdateProfile";
import Signup from "./components/SignUp";



function App(props) {
   /* const [isAuthenticated, setAuthentication] = useState(false);
    const [redirection, setRedirection ] = useState(false);

    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db,"users");

  /!**** auth ****!/
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

    const redirect =  () => {
        console.log(props.history);
        setRedirection(props.history.push("/profile"));

    }

    const login = async () => {

        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );

            setAuthentication(true);

            redirect();

            //console.log(user);

        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setAuthentication(false);
    };

   /!**** auth ****!/
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
  }, [])*/

  return  (

              <Router>
                  <AuthProvider>
                      <Switch>
                          <ProtectedRoute exact path="/" component={Dashboard} />
                          <ProtectedRoute path="/update-profile" component={UpdateProfile} />
                          <Route path="/signup" component={Signup} />
                          <Route path="/login" component={Login} />
                          <Route path="/profile" component={Profile} />
                         {/* <Route path="/forgot-password" component={ForgotPassword} />*/}
                      </Switch>
                  </AuthProvider>
              </Router>





    );
}
//export default withRouter(App);
export default App;
