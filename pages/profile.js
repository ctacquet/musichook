import Layout from "../components/Layout";
import ProfileCard from "../components/ProfileCard";

export default function Profile() {
  return (
    <Layout pageTitle="Profile">
      <section className="col-span-2">
          <ProfileCard/>
      </section>
    </Layout>
  );
}
