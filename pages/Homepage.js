import Feed from "../components/Feed";
import Layout from '../components/Layout';
import { Toaster } from 'react-hot-toast';

export default function Homepage() {
  return (
    <>
      <Layout pageTitle="Home">
          <Feed />
      </Layout>
      <Toaster
        toastOptions={{
        // Define default options
        className: '',
        duration: 1000000,
        }}/>
    </>
  );
}
