import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { modalState } from "../atoms/modalAtom";
import ReactLoading from "react-loading";
import Search from "./Search";
import toast from "react-hot-toast";

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
    if(track.deezerLink){
      await addDoc(collection(db, "posts"), {
        uid: user.uid,
        search: track.search,
        artist: track.artist,
        title: track.title,
        songDate: track.songDate,
        coverLink: track.coverLink,
        spotifyLink: track.spotifyLink,
        spotifyId: track.spotifyId,
        deezerLink: track.deezerLink,
        timestamp: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, "posts"), {
        uid: user.uid,
        search: track.search,
        artist: track.artist,
        title: track.title,
        songDate: track.songDate,
        coverLink: track.coverLink,
        spotifyLink: track.spotifyLink,
        spotifyId: track.spotifyId,
        timestamp: serverTimestamp(),
      });
    }

    setOpen(false);
    setLoading(false);
    
    toast.success("Successfully posted your song !")
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="block xl:flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 xl:p-0 text-center">
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
            className="inline-block align-middle xl:hidden"
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
              className="inline-block align-bottom bg-white dark:bg-gray-500 rounded-lg p-4 mx-2 my-32 md:my-96 lg:my-12 xl:my-auto max-w-full w-full lg:max-w-xl xl:max-w-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
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

                <div className="mt-2 py-6 px-6">
                  <button
                    type="button"
                    onClick={uploadPost}
                    className="inline-flex justify-center w-full rounded-md shadow-sm py-3 bg-gradient-to-l from-purple-600 to-red-600 text-base font-medium text-white hover:bg-purple-700 hover:ring-2 hover:ring-black dark:hover:ring-opacity-50 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
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
