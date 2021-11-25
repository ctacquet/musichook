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

      <main className="mainStyle">
        <LeftNavbar />
        <Feed />
        <RightBar />
        <Modal />
      </main>

      <Footer />
    </div>
  );
}
