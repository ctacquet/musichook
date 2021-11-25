import Head from "next/head";
import Header from "../components/layouts/Header";
import LeftNavbar from "../components/layouts/LeftNavbar";
import RightBar from "../components/layouts/RightBar";
import Footer from "../components/layouts/Footer";
import Modal from "../components/Modal";

export default function Profile() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Profile - MusicHook</title>
      </Head>

      <Header pageTitle="Profile" />

      <main className="mainStyle">
        <LeftNavbar />
        <section className="col-span-2">
          <h1 className="text-center mt-4 font-bold">This is profile page</h1>
        </section>
        <RightBar />
        <Modal />
      </main>

      <Footer />
    </div>
  );
}
