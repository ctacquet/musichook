import { useEffect, useRef, useState } from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { doc, deleteDoc } from "@firebase/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

export function DropdownButton({ postId, uid }) {
  const [user] = useAuthState(auth);
  const [hasPosted, setHasPosted] = useState(false);

  useEffect(() => setHasPosted(uid == user?.uid), [uid]);

  const deletePost = async () => {    
    if (hasPosted) {
      await deleteDoc(doc(db, "posts", postId));
      toast.error("Your post has been deleted.")
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle>
        {hasPosted ? (
          <span className="flex bg-gradient-to-l from-purple-500 to-red-500 text-white px-3 py-1 rounded-md shadow-md text-base font-medium ring-2 ring-purple-500 ring-opacity-50">
            <DotsHorizontalIcon className="h-5" />
          </span>
        ) : (
          <span className="flex bg-purple-600 text-white px-3 py-1 rounded-md shadow-md text-base font-medium ring-2 ring-purple-500 ring-opacity-50">
            <DotsHorizontalIcon className="h-5" />
          </span>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item disabled={true}>Details</Dropdown.Item>
        <Dropdown.Divider />
        {hasPosted ? (
          <Dropdown.Item
            disabled={false}
            className="text-red-500"
            action={deletePost}
          >
            Delete
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            disabled={true}
            className="text-red-500"
            action={deletePost}
          >
            Delete
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

/* Logic*/
const useToggle = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const toggle = () => {
    setShow(!show);
  };

  // close dropdown when you click outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [show, ref]);

  // close dropdown when you click on "ESC" key
  useEffect(() => {
    const handleEscape = (event) => {
      if (!show) return;

      if (event.key === "Escape") {
        setShow(false);
      }
    };
    document.addEventListener("keyup", handleEscape);
    return () => document.removeEventListener("keyup", handleEscape);
  }, [show]);

  return {
    show,
    toggle,
    ref,
  };
};

const style = {
  menu: "block z-30 absolute top-0 left-0 bg-white float-left py-2 px-0 text-left border border-gray-300 rounded-sm mt-0.5 mb-0 mx-0 bg-clip-padding",
  item: "block w-full py-1 px-8 mb-2 text-sm font-normal clear-both whitespace-nowrap border-0 hover:bg-gray-200 cursor-pointer hover:font-bold",
  disable: "cursor-not-allowed opacity-50 hover:font-normal",
};

const Dropdown = ({ children }) => {
  const { show, toggle } = useToggle();
  /* First child contains the dropdown toggle */
  const dropdownToggle = children[0];

  /* Second child contains the dropdown menu */
  const dropdownMenu = children[1];

  return (
    <>
      <button
        className="focus:outline-none"
        onClick={toggle}
        type="button"
        id="options-menu"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {dropdownToggle}
      </button>
      {show && <>{dropdownMenu}</>}
    </>
  );
};

Dropdown.Toggle = ({ children }) => <>{children}</>;

Dropdown.Menu = ({ children }) => (
  <div className="relative">
    <div
      style={{ transform: "translate3d(0px, 3px, 0px)" }}
      className={style.menu}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      {children}
    </div>
  </div>
);

/* You can wrap the a tag with Link and pass href prop to Link if you are using either Create-React-App, Next.js or Gatsby */
Dropdown.Item = ({ children, className, disabled, action }) => (
  <a
    tabIndex={0}
    className={
      disabled
        ? [style.item, className, style.disable].join(" ")
        : [style.item, className].join(" ")
    }
    role="menuitem"
    onClick={action}
  >
    {children}
  </a>
);

Dropdown.Divider = () => <hr className="my-2" />;

export default Dropdown;
