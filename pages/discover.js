import Head from "next/head";
import Header from "../components/Header";
import Menu from "../components/Menu";
import MiniProfile from "../components/MiniProfile";
import Caroussel from "../components/Caroussel";
import Test from "../components/Test";



export default function Discover() {

  

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Discover - MusicHook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header pageTitle="Discover" />
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
          <h1 className="text-center mt-4 font-bold">This is discover page</h1>
          {/* <Caroussel/> */}
         
         
         
        </section>

        {/* Right section */}
        <section className="col-span-1">
          {/* Events */}
          {/* Favorites */}
         
        
               
         
        </section>
      </main>
    </div>
  );
}
