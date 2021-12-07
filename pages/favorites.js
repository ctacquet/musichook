import Layout from "../components/Layout";
import FavoritesComponent from "../components/Favorites";

export default function Favorites() {
  return (
    <Layout pageTitle="Favorites">
      <section className="col-span-2">
        <FavoritesComponent />
      </section>
    </Layout>
  );
}
