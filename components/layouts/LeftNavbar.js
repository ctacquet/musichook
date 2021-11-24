import Menu from "../Menu";
import MiniProfile from '../MiniProfile';

export default function LeftNavbar() {
  return (
    <section className="col-span-1 pr-8">
      <div className="flex flex-col">
        <div className="">
          {/* Menu */}
          <Menu />
          {/* Post button */}
        </div>
        <div className="flex-grow"></div>
        <div className="">
          {/* Mini profile */}
          <MiniProfile />
        </div>
      </div>
    </section>
  );
}
