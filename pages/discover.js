import Layout from "../components/Layout";
import Caroussel from "../components/Caroussel";
import MainSectionHeader from "../components/MainSectionHeader";

export default function Discover() {
  return (
    <Layout pageTitle="Discover">
      <section className="col-span-2">
        <MainSectionHeader>
          <div className="text-xl normal-case">
            <p className="font-light inline">Welcome to </p>
            <p className="font-bold inline text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">Discover </p>
            <p className="font-light inline">page,</p>
            <br/>
            <p className="font-light text-base inline">
              Here you can see a list of users who have similar musical
              interests to yours. These users are sorted in order of affinity to
              you displayed as a percentage. Here you will find the three
              musical genres that define you.
            </p>
          </div>
        </MainSectionHeader>
        <Caroussel />
      </section>
    </Layout>
  );
}
