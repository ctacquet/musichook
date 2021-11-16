import Head from "next/head";
import Header from "../components/Header";
import Menu from "../components/Menu";
import MiniProfile from "../components/MiniProfile";

export default function Discover() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Favorites - MusicHook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header pageTitle="Discover" />
      <main className="grid grid-cols-1 md:grid-cols-6 md:max-w-6xl xl:grid-cols-6 xl:max-w-12xl mx-auto">
        {/* Left section */}
        <section className="col-span-1">
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
        <section className="col-span-4">
          <h1 className="text-center mt-4 font-bold">This is favorites page</h1>
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
