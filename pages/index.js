import Head from 'next/head';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Modal from '../components/Modal';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>MusicHook</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musichook.vercel.app/" /> 
        <meta property="og:title" property="og:title" content="MusicHook" />
        <meta property="og:description" property="og:description" content="Share and discover songs !" />
        <meta property="og:image" content="/preview.jpg" />
        <meta name="twitter:card" content="summary" /> 
        <meta name="twitter:title" content="MusicHook" />
        <meta name="twitter:description" content="Share and discover songs !" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>

      <Header pageTitle="Home"/>
      <Feed />
    
      <Modal /> 
    
      <Footer/>
    </div>
  )
}
