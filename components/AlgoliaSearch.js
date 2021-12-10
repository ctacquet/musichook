import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, connectSearchBox } from "react-instantsearch-dom";
import { Hit } from "./Hit";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { SearchIcon } from "@heroicons/react/outline";

const searchClient = algoliasearch(
  "GQOSKB9P5P",
  "3534601df5769241e2f380c6a929f25c"
);

function AlgoliaSearch() {
  let [isOpen, setIsOpen] = useState(false);
  const TheHit = ({ hit }) => {
    return (
      <div>
        <Hit hit={hit} closeModal={closeModal}/>
      </div>
    );
  };

  const SearchBox = ({ currentRefinement, refine }) => (
    <form noValidate role="search">
      <input
        type="search"
        placeholder="Search for users..."
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
        className="w-full"
      />
    </form>
  );
  
  const CustomSearchBox = connectSearchBox(SearchBox);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex flex-grow items-center justify-center">
          <button
            type="button"
            onClick={openModal}
            className="flex w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <div className="flex flex-row items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <p className="flex flex-row pl-4 sm:text-sm rounded-md">Search</p>
          </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-black dark:dg-opacity-75 shadow-2xl rounded-2xl">
                  <InstantSearch indexName="users" searchClient={searchClient} className="block relative rounded-md">
                      <div className="w-full pb-2 border-b">
                      <CustomSearchBox
                        className="bg-white dark:bg-gray-400 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                      />
                      </div>
                      <div className="pt-2">
                        <Hits hitComponent={TheHit} className="h-60 overflow-y-scroll scrollbar-thumb-black dark:scrollbar-thumb-white scrollbar-thin"/>
                      </div>
                  </InstantSearch>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
  );
}

export default AlgoliaSearch;
