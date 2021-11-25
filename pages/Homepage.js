import Head from "next/head";
import Header from "../components/layouts/Header";
import LeftNavbar from "../components/layouts/LeftNavbar";
import RightBar from "../components/layouts/RightBar";
import Footer from "../components/layouts/Footer";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

export default function Homepage() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Home - MusicHook</title>
      </Head>

      <Header pageTitle="Home" />

      <main className="grid grid-cols-1 md:grid-cols-4 md:max-w-4xl xl:grid-cols-4 xl:max-w-8xl min-w-full px-8">
        <LeftNavbar />
        <Feed />
        <RightBar />
        <Modal />
      </main>

      <Footer />
    </div>
  );
}
