import Layout from '../components/Layout';
import Caroussel from '../components/Caroussel';



export default function Discover() {

  

  return (
    <Layout pageTitle="Discover">
      <section className="col-span-2">
        <h1 className="text-center mt-4 font-bold">
          This is discover page
        </h1>
        <Caroussel/>
      </section>
    </Layout>
  );
}
