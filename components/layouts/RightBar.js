import MiniFavorites from '../MiniFavorites';

export default function LeftNavbar() {
  return (
    <section className="col-span-1 pr-4">
      <div className="sticky top-20 hidden lg:flex lg:flex-col">
        <MiniFavorites />
      </div>
    </section>
  );
}
