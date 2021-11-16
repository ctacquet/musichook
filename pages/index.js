import Head from 'next/head';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Modal from '../components/Modal';

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>MusicHook</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Share your musics together !" />
        <meta property="og:title" content="MusicHook" />
        <meta property="og:description" content="Ce site me sert de portfolio, j'y poste principalement mes informations professionelles" />
        <meta property="og:image" content="/preview.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header pageTitle="Home"/>
      <Feed />
    
      <Modal />
    </div>
  )
}
