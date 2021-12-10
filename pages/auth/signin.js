import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { uiConfig } from "../../lib/firebaseUI";

// Firebase related
import { useAuthState } from "react-firebase-hooks/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../../lib/firebase";
import Error from "../../components/Error";

import background from "../../public/bg.png";
import Link from "next/link";

// Browser...
function signIn() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading)
    return (
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full md:w-1/2 bg-gray-100">
          <div className="flex justify-center md:justify-start md:pl-12 md:-mb-24 p-10 my-auto mx-auto">
            <ReactLoading type="spin" color="#fff" />
          </div>
        </div>
      </div>
    );
  else if (error) return <Error msg={error} />;
  else if (user) {
    // user is already logged in, redirect to home page
    router.push("/");
  }

  const authConfig = uiConfig;

  return (
    <>
      <Head>
        <title>Login - MusicHook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full md:w-1/2 bg-gray-100 z-10">
          <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24 p-10">
            <Link href="/">
              <a
                className="p-4 text-xl font-bold text-white bg-gradient-to-l from-purple-600 to-red-600 rounded-lg shadow-2xl"
              >
                MusicHook
              </a>
            </Link>
          </div>

          <div className="flex flex-col justify-center px-8 pt-8 my-auto mx-auto md:justify-start md:pt-0 md:px-24 lg:px-32 bg-white dark:bg-black dark:bg-opacity-25 rounded-lg shadow-2xl">
            <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
            {error && <Error msg={error} />}
          </div>
        </div>
        <div className="hidden relative w-1/2 h-screen md:block">
            <Image
              className="z-0"
              src={background}
              quality={100}
              priority="false"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
        </div>
      </div>
    </>
  );
}

export default signIn;
