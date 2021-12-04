import Layout from "../components/Layout";

export default function Profile() {
  return (
    <Layout pageTitle="Profile">
      <section className="col-span-2">
          <ProfileCard/>
      </section>
    </Layout>
  );
}
