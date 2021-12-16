import Head from "next/head";
import TopBar from "./layouts/TopBar";
import LeftNavbar from "./layouts/LeftNavbar";
import RightBar from "./layouts/RightBar";
import Footer from "./layouts/Footer";
import Modal from "./Modal";
import { Toaster } from 'react-hot-toast';
import AlgoliaSearch from "./AlgoliaSearch";

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>MusicHook</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musichook.vercel.app/" />
        <meta property="og:title" property="og:title" content="MusicHook" />
        <meta
          property="og:description"
          property="og:description"
          content="Share and discover songs !"
        />
        <meta property="og:image" content="/preview.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="MusicHook" />
        <meta name="twitter:description" content="Share and discover songs !" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide dark:bg-black dark:bg-opacity-80">
        <header className="sticky top-0 z-50">
          <TopBar pageTitle={pageTitle} />
        </header>
        <div className="mainStyle">
          <LeftNavbar />
          {children}
          <RightBar />
          <Modal />
        </div>
        <footer className="lg:sticky lg:bottom-0 z-0 pointer-events-none">
          <Footer />
        </footer>
        <Toaster
          toastOptions={{
            custom: {
              duration: 1000000,
            },
            error: {
              duration: 2000,
            }
          }}
        />
      </main>
    </>
  );
}
