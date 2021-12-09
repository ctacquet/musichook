import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";
import EditProfileModal from "../components/EditProfileModal";
import UserPosts from  "../components/UserPosts";

export default function Profile() {
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
