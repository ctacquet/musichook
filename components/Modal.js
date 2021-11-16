import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import {
  LinkIcon,
  MusicNoteIcon,
  SearchIcon,
  TemplateIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { useSession } from "next-auth/react";

function Modal() {
  const { data: session } = useSession();
  const searchRef = useRef(null);
  const [open, setOpen] = useRecoilState(modalState);
  const [loading, setLoading] = useState(null);

  /* Temporary variables */
  const artistRef = useRef(null);
  const titleRef = useRef(null);
  const coverLinkRef = useRef(null);
  const spotifyLinkRef = useRef(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1 - Create a post and add to firestore "posts" collection    DONE
    // 2 - Get post ID for the newly created post
    // 3 - Get ID of the song from API call
    // 4 - Update the original post with the link of the song

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      userUID: session.user.uid,
      userImg: session.user.image,
      search: searchRef.current.value,
      artist: artistRef.current.value,
      title: titleRef.current.value,
      coverLink: coverLinkRef.current.value,
      spotifyLink: spotifyLinkRef.current.value,
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
            <form
              onSubmit={uploadPost}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            >
              <div>
                <div className="relative mt-1 p-3 rounded-md">
                  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="bg-gray-300 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                    type="text"
                    ref={searchRef}
                    disabled={true}
                    placeholder="Search"
                  />
                </div>
                <div className="relative mt-1 p-3 rounded-md">
                  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                    <UsersIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="bg-white block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                    type="text"
                    ref={artistRef}
                    required
                    placeholder="Artist *"
                  />
                </div>
                <div className="relative mt-1 p-3 rounded-md">
                  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                    <MusicNoteIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="bg-white block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                    type="text"
                    ref={titleRef}
                    required
                    placeholder="Title *"
                  />
                </div>
                <div className="relative mt-1 p-3 rounded-md">
                  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="bg-white block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                    type="text"
                    ref={coverLinkRef}
                    required
                    placeholder="Cover link"
                  />
                </div>
                <div className="relative mt-1 p-3 rounded-md">
                  <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                    <TemplateIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    className="bg-white block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
                    type="text"
                    ref={spotifyLinkRef}
                    required
                    placeholder="Spotify link"
                  />
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-l from-purple-600 to-red-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                  >
                    {loading ? "Uploading..." : "Upload Song"}
                  </button>
                </div>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
