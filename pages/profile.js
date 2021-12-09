import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";
import EditProfileModal from "../components/EditProfileModal";
import UserPosts from  "../components/UserPosts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { useEffect } from "react";
import { useRouter } from 'next/router';

export default function Profile() {
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if(!loadingUser && !user) router.push("/");
  }, [user, loadingUser]);
  
  return (
    <>
      <Layout pageTitle="Profile">
        <section className="col-span-2">
            <ProfileCard />
            <UserPosts/>
        </section>
      </Layout>
      <EditProfileModal />
    </>
  );
}
