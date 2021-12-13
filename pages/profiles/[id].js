import Layout from "../../components/Layout";
import ProfileCard from "../../components/ProfileCard";
import VisitorProfileCard from "../../components/VisitorProfileCard";
import EditProfileModal from "../../components/EditProfileModal";
import UserPosts from  "../../components/UserPosts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Profile = () => {
  const [user, loadingUser, error] = useAuthState(auth);
  const [profileCard, setProfileCard] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user && user.id == id) {
      setProfileCard(<ProfileCard />);
    } else {
      setProfileCard(<VisitorProfileCard id={id} />);
    }
  }, [user, id]);
     
  return (
    <>
    <Layout pageTitle="Profile">
      <section className="col-span-2">
          {profileCard}
          <UserPosts/>
      </section>
    </Layout>
    <EditProfileModal />
  </>
  )
}
  
export default Profile;