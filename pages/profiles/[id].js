import Layout from "../../components/Layout";
import ProfileCard from "../../components/ProfileCard";
import VisitorProfileCard from "../../components/VisitorProfileCard";
import EditProfileModal from "../../components/EditProfileModal";
import UserPosts from  "../../components/UserPosts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";

const Profile = () => {
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
     
  return (
    <>
    <Layout pageTitle="Profile">
      <section className="col-span-2">
          {id && user.id != id ? (<VisitorProfileCard id={id} />) : (<ProfileCard />)}
          <UserPosts/>
      </section>
    </Layout>
    <EditProfileModal />
  </>
  )
}
  
export default Profile;