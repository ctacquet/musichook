import Head from "next/head";

export default function Header() {
  return (
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
  );
};
