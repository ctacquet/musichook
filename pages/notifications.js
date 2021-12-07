import Layout from '../components/Layout';
import NotificationsComponent from '../components/Notifications';

export default function Notifications() {
  return (
    <Layout pageTitle="Notifications">
      <section className="col-span-2">
        <NotificationsComponent />
      </section>
    </Layout>
  );
}
