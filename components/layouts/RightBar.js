import MiniFavorites from "../MiniFavorites";
import DarkModeSwitch from "../DarkModeSwitch";

export default function RightNavbar() {

  

  return (
    <section className="col-span-1 pr-4">
      <div className="sticky top-20 hidden lg:flex lg:flex-col">
        <div className="bg-white dark:bg-black dark:bg-opacity-25 mt-7 mb-4 border dark:border-gray-500 dark:border-opacity-50 rounded-sm p-2 space-y-2 text-center">
          <DarkModeSwitch />
        </div>
        <MiniFavorites />
      </div>
    </section>
  );
}
