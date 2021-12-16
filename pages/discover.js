import Layout from "../components/Layout";
import Caroussel from "../components/Caroussel";
import MainSectionHeader from "../components/MainSectionHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useEffect } from "react";
import { useRouter } from 'next/router';

export default function Discover() {
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if(!loadingUser && !user) router.push("/");
  }, [user, loadingUser]);

  return (
    <Layout pageTitle="Discover">
      <section className="col-span-2">
        <MainSectionHeader>
          <div className="text-xl normal-case">
            <p className="font-light inline">Welcome to </p>
            <p className="font-bold inline text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">discover </p>
            <p className="font-light inline">page,</p>
            <br/>
            <p className="font-light text-base inline">
              You can choose genres to match with people who listen to song of the same genres. <br/>
              Sort them by clicking on different categories.
            </p>
          </div>
        </MainSectionHeader>
        <Caroussel />
      </section>
    </Layout>
  );
}
