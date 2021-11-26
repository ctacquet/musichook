import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";

import { modalState } from "../atoms/modalAtom";
import { db } from "../lib/firebase";
import Search from "./Search";

function Modal() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(null);
  const [open, setOpen] = useRecoilState(modalState);
  const [track, setTrack] = useState(null);

  const uploadPost = async (e) => {
    if (loading) return;
    if (!track){
      setOpen(false);
      return;
    } 
    e.preventDefault();

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: user.displayName,
      uid: user.uid,
      userImg: user.photoURL,
      search: track.search,
      artist: track.artist,
      title: track.title,
      coverLink: track.coverLink,
      spotifyLink: track.spotifyLink,
      spotifyId: track.spotifyId,
      timestamp: serverTimestamp(),
    });

    setOpen(false);
    setLoading(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity 0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal content */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity 0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all lg:max-w-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                <Search setTrack={setTrack} />

                <div className="mt-2">
                  {loading && (
                    <ReactLoading
                      type="spin"
                      color="black"
                      className="mx-auto"
                      width={20}
                      height={20}
                    />
                  )}
                </div>

                <div className="mt-2 sm:mt-4">
                  <button
                    type="button"
                    onClick={uploadPost}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-l from-purple-600 to-red-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                  >
                    {loading ? "Uploading..." : "Upload Song"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
