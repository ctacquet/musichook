import Head from "next/head";
import Header from "../components/Header";
import Menu from "../components/Menu";
import MiniProfile from "../components/MiniProfile";
import Notification from "../components/Notification";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import {io} from "socket.io-client";
import {useEffect, useState} from "react";
import Posts from "../components/Posts";

export default function Notifications() {

  const [socket, setSocket] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);



  return (
      <>
        {user ? (
            <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
              <Head>
                <title>Notifications - MusicHook</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>

              <Header pageTitle="Notifications" />
              <main className="grid grid-cols-1 md:grid-cols-4 md:max-w-4xl xl:grid-cols-4 xl:max-w-8xl min-w-full px-8">
                {/* Left section */}
                <section className="col-span-1 pr-8">
                  <div className="flex flex-col">
                    <div className="">
                      {/* Menu */}
                      <Menu />
                      {/* Post button */}
                    </div>
                    <div className="flex-grow"></div>
                    <div className="">
                      {/* Mini profile */}
                      <MiniProfile />
                    </div>
                  </div>
                </section>

                {/* Middle section */}
                <section className="col-span-2">
                  <h1 className="text-center mt-4 font-bold">This is notifications page and i will test it</h1>

                  <Posts socket={socket} user={user}/>
                </section>

                {/* Right section */}
                <section className="col-span-1">
                  {/* Events */}
                  {/* Favorites */}
                  <Notification socket={socket} />
                </section>
              </main>
            </div>
        ) : (
            <div> nope</div>
        )
        }
      </>

  );
}
