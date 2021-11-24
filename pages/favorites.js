import Head from "next/head";
import Header from "../components/layouts/Header";
import LeftNavbar from "../components/layouts/LeftNavbar";
import RightBar from "../components/layouts/RightBar";
import Modal from '../components/Modal';

export default function Favorites() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Favorites - MusicHook</title>
      </Head>

      <Header pageTitle="Favorites" />
      
      <main className="grid grid-cols-1 md:grid-cols-4 md:max-w-4xl xl:grid-cols-4 xl:max-w-8xl min-w-full px-8">
        <LeftNavbar />
        <section className="col-span-2">
          <h1 className="text-center mt-4 font-bold">This is favorites page</h1>
        </section>
        <RightBar />
        <Modal />
      </main>
    </div>
  );
}
