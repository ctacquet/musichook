import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { uiConfig } from "../../firebaseUI";

// Firebase related
import { useAuthState } from "react-firebase-hooks/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../../firebase";
import Error from "../../components/Error";

// Browser...
function signIn() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <ReactLoading type="spin" color="#fff" />;
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
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <a
              href="/"
              className="p-4 text-xl font-bold text-white bg-gradient-to-l from-purple-600 to-red-600"
            >
              MusicHook
            </a>
          </div>

          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="hidden object-cover w-full h-screen md:block"
            src="/bg.png"
          />
        </div>
      </div>
    </>
  );
}

export default signIn;
