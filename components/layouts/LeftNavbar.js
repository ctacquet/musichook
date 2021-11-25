import Menu from "../Menu";
import MiniProfile from '../MiniProfile';

export default function LeftNavbar() {
  return (
    <section className="col-span-1 pl-4">
      <div className="sticky top-24 hidden lg:flex lg:flex-col">
        <Menu/>
        <MiniProfile className="bottom-0"/>
      </div>
    </section>
  );
}
