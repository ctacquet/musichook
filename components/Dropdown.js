import { DotsHorizontalIcon, InformationCircleIcon, TrashIcon } from "@heroicons/react/outline";
import { doc, deleteDoc } from "@firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";

//cf https://headlessui.dev/react/menu
function MyLink(props) {
  let { href, active, disabled, children, ...rest } = props;
  return (
    <Link href={href}>
      <a
        {...rest}
        className={`${active && "bg-gray-100 shadow-md font-bold"} ${
          disabled && "text-gray-300"
        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
      >
        {children}
      </a>
    </Link>
  );
}

function Dropdown({ postId, uid }) {
  const [user] = useAuthState(auth);
  const [hasPosted, setHasPosted] = useState(false);

  useEffect(() => setHasPosted(uid == user?.uid), [uid]);

  const deletePost = async () => {
    if (hasPosted) {
      await deleteDoc(doc(db, "posts", postId));
      toast.error("Your post has been deleted.");
    }
  };

  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          {hasPosted ? (
            <button className="flex bg-gradient-to-l from-purple-500 to-red-500 hover:to-purple-800 text-white px-3 py-1 rounded-md shadow-md text-base font-medium ring-2 ring-purple-500 ring-opacity-50 focus:ring-opacity-80">
              <DotsHorizontalIcon className="h-5" />
            </button>
          ) : (
            <button className="flex bg-purple-600 text-white px-3 py-1 rounded-md shadow-md text-base font-medium ring-2 ring-purple-500 ring-opacity-50">
              <DotsHorizontalIcon className="h-5" />
            </button>
          )}
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-auto mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item disabled>
                {({ active }) => (
                  <MyLink active={active} disabled href="/details">
                    <InformationCircleIcon className="w-5 h-5 mr-2"/>
                    Details
                  </MyLink>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item disabled={!hasPosted}>
                {({ active }) => (
                  <a
                    className={`${
                      active && "bg-gray-100 shadow-md font-bold"
                    } text-red-500 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={deletePost}
                  >
                    <TrashIcon className="w-5 h-5 mr-2"/>
                    Delete
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Dropdown;
