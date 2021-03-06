import Menu from "../Menu";
import MiniProfile from '../MiniProfile';

export default function LeftNavbar() {
  return (
    <section className="col-span-1 pl-4">
      <div className="sticky top-20 hidden lg:flex lg:flex-col">
        <Menu />
        <MiniProfile />
      </div>
    </section>
  );
}
