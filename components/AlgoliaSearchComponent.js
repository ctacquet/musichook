import { SearchIcon } from "@heroicons/react/outline";
import AlgoliaSearch from "./AlgoliaSearch";

function AlgoliaSearchComponent({ mobile }) {
  return (
    <>
      {/*
      <div
        className={
          mobile
            ? "block relative rounded-md"
            : "hidden lg:block relative rounded-md"
        }
      >
        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          className="bg-white block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
          type="text"
          placeholder="Search"
        />
      </div>
      */}
      <AlgoliaSearch />
    </>
  );
}

export default AlgoliaSearchComponent;
