import Header from '../components/layouts/Header';
import Feed from '../components/Feed';
import LeftNavbar from "../components/layouts/LeftNavbar";
import RightBar from "../components/layouts/RightBar";
import Modal from '../components/Modal';

export default function Homepage() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Header pageTitle="Home"/>
      
      <main className="grid grid-cols-1 md:grid-cols-4 md:max-w-4xl xl:grid-cols-4 xl:max-w-8xl min-w-full px-8">
        <LeftNavbar />
        <Feed />
        <RightBar />
      </main>
        
      <Modal />
    </div>
  )
}