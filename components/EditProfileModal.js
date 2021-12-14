import { useRecoilState } from "recoil";
import { modalStateEditProfile } from "../atoms/modalAtomEditProfile";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useRef, useState, useEffect } from "react";
import {
    CameraIcon,
    TrashIcon,
    CheckIcon, 
    SelectorIcon,
} from "@heroicons/react/outline";

import { db, storage, auth } from "../lib/firebase";
import { updateDoc, doc, onSnapshot, arrayUnion, collection, deleteDoc, addDoc } from "@firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from "next/image";
import { ref, getDownloadURL, uploadString } from "firebase/storage"
import classNames from "classnames";

const genres = [
    "No genre",
    "Acoustic",
    "Afrobeat",
    "Alt-rock",
    "Alternative",
    "Ambient",
    "Anime",
    "Black-metal",
    "Bluegrass",
    "Blues",
    "Bossanova",
    "Brazil",
    "Breakbeat",
    "British",
    "Cantopop",
    "Chicago-house",
    "Children",
    "Chill",
    "Classical",
    "Club",
    "Comedy",
    "Country",
    "Dance",
    "Dancehall",
    "Death-metal",
    "Deep-house",
    "Detroit-techno",
    "Disco",
    "Disney",
    "Drum-and-bass",
    "Dub",
    "Dubstep",
    "Edm",
    "Electro",
    "Electronic",
    "Emo",
    "Folk",
    "Forro",
    "French",
    "Funk",
    "Garage",
    "German",
    "Gospel",
    "Goth",
    "Grindcore",
    "Groove",
    "Grunge",
    "Guitar",
    "Happy",
    "Hard-rock",
    "Hardcore",
    "Hardstyle",
    "Heavy-metal",
    "Hip-hop",
    "Holidays",
    "Honky-tonk",
    "House",
    "Idm",
    "Indian",
    "Indie",
    "Indie-pop",
    "Industrial",
    "Iranian",
    "J-dance",
    "J-idol",
    "J-pop",
    "J-rock",
    "Jazz",
    "K-pop",
    "Kids",
    "Latin",
    "Latino",
    "Malay",
    "Mandopop",
    "Metal",
    "Metal-misc",
    "Metalcore",
    "Minimal-techno",
    "Movies",
    "Mpb",
    "New-age",
    "New-release",
    "Opera",
    "Pagode",
    "Party",
    "Philippines-opm",
    "Piano",
    "Pop",
    "Pop-film",
    "Post-dubstep",
    "Power-pop",
    "Progressive-house",
    "Psych-rock",
    "Punk",
    "Punk-rock",
    "R-n-b",
    "Rainy-day",
    "Reggae",
    "Reggaeton",
    "Road-trip",
    "Rock",
    "Rock-n-roll",
    "Rockabilly",
    "Romance",
    "Sad",
    "Salsa",
    "Samba",
    "Sertanejo",
    "Show-tunes",
    "Singer-songwriter",
    "Ska",
    "Sleep",
    "Songwriter",
    "Soul",
    "Soundtracks",
    "Spanish",
    "Study",
    "Summer",
    "Swedish",
    "Synth-pop",
    "Tango",
    "Techno",
    "Trance",
    "Trip-hop",
    "Turkish",
    "Work-out",
    "World-music"
];

function renderGenreListBox(genreNumber, setGenreNumber) {
    return (
    <Listbox value={genreNumber} onChange={setGenreNumber}>
        <div className="relative mt-1">
        <Listbox.Button className="relative w-44 py-2 pl-3 text-left bg-white hover:bg-purple-300 hover:ring-2 hover:ring-black rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-indigo-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate dark:text-black">{genreNumber}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
            />
            </span>
        </Listbox.Button>
        <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {genres.map((genre, genreIdx) => (
                <Listbox.Option
                key={genreIdx}
                className={({ active }) =>
                    `${active ? 'text-purple-900 bg-purple-400 hover:text-white' : 'text-gray-900 dark:text-black'}
                        cursor-default select-none relative py-2 pl-3fff pr-4`
                }
                value={genre}
                >
                {({ genreNumber, active }) => (
                    <span
                        className={`${
                        genreNumber ? 'font-medium' : 'font-normal'
                        } block truncate`}
                    >
                        {genre}
                    </span>
                )}
                </Listbox.Option>
            ))}
            </Listbox.Options>
        </Transition>
        </div>
    </Listbox>);
}

function EditModal() {
    const [user] = useAuthState(auth);
    const [openEdit, setOpenEdit] = useRecoilState(modalStateEditProfile);
    const [loading, setLoading] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);

    const usernameRef = useRef(null);
    const [username, setUsername] = useState(currentUserData?.username);

    const descriptionRef = useRef(null);
    const [description, setDescription] = useState(currentUserData?.description);

    const [genre1, setGenre1] = useState(currentUserData?.genres[0]);
    const [genre2, setGenre2] = useState(currentUserData?.genres[1]);
    const [genre3, setGenre3] = useState(currentUserData?.genres[2]);

    const filePickerRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const [currentLinksData, setCurrentLinksData] = useState(null);
    const [links, setLinks] = useState([]);

    const domainRef = useRef(null);
    const [newDomain, setDomain] = useState(currentLinksData?.domain);
    const urlRef = useRef(null);
    const [newUrl, setUrl] = useState(currentLinksData?.url);
    const deleteLinkRef = useRef(null);
    const [isDeleted, setDeleted] = useState(false);

    const [isAccepted, setIsAccepted] = useState(false);

    useEffect(
        () => {
            if (user) {
                onSnapshot(
                    collection(db, "users", user?.uid, "links"),
                    (snapshot) => {
                        setLinks(snapshot.docs);
                    }
                )
            }
        },
        [db, user]
    );

    const uploadData = async (e) => {
        if (loading) return;
        e.preventDefault();
        setLoading(true);

        const docRef = doc(db, "users", user?.uid);

        const imageRef = ref(storage, "/images-user-" + user?.uid + "/image");

        if (selectedFile != null) {
            await uploadString(imageRef, selectedFile, "data_url").then(async (snapshot) => {
                const downloadUrl = await getDownloadURL(imageRef);

                await updateDoc(docRef, {
                    userImg: downloadUrl,
                    description: descriptionRef.current.value,
                    username: usernameRef.current.value,
                    genres: {
                        0: genre1,
                        1: genre2,
                        2: genre3
                    },
                })
            });
        } else {
            await updateDoc(docRef, {
                description: descriptionRef.current.value,
                username: usernameRef.current.value,
                genres: {
                    0: genre1,
                    1: genre2,
                    2: genre3
                },

            });
        }

        if (domainRef.current.value != "" && domainRef.current.value != "") {
            const docLinksRef = await addDoc(collection(db, "users", user?.uid, "links"), {
                domain: domainRef.current.value,
                url: urlRef.current.value
            })
        }
        //si domain null ou vide => pas de upload

        setOpenEdit(false);
        setLoading(false);
        setSelectedFile(null);
        setDisplayed(false);
    };


    const deleteFromLinks = async (e) => {
        if (isDeleted) {
            await deleteDoc(doc(db, "users", user?.uid, "links", e.currentTarget.id));
        }
    }


    useEffect(() => {

        if (user) {
            onSnapshot(doc(db, "users", user?.uid), (doc) => {
                setCurrentUserData(doc.data())
                setUsername(doc.data().username);
                setDescription(doc.data().description);
                setGenre1(doc.data().genres[0]);
                setGenre2(doc.data().genres[1]);
                setGenre3(doc.data().genres[2]);

            });
            onSnapshot(collection(db, "users", user?.uid, "links"), (snapShot) => {
                setCurrentLinksData(snapShot.docs);
                setDomain("");
                setUrl("");
            });
        }

    }, [user]);

    const [displayed, setDisplayed] = useState(false);

    const toggleLinks = () => {
        setDisplayed(!displayed);
    }


    const getPattern = (dom) =>{
        switch (dom) {
            case 'Facebook':
                return "https?://(www\.)?facebook\.com/.*";
            case 'Twitter':
                return "https?://twitter\.com/.*";
            case 'Instagram':
                return "https?://(www\.)?instagram\.com/.*";
            case 'Github':
                return "https?://(www\.)?github\.com/.*";
            default:
                break;
        }
    }


    const handleChange = (evt) => {
        isAccepted = (evt.target.validity.valid) ? 
        evt.target.value : !isAccepted;
        setIsAccepted(true);
      }


    return (
        <Transition.Root show={openEdit} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={setOpenEdit}
            >
                <div className="flex items-end justify-center min-h-[00px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        <div className="inline-block align-bottom bg-white dark:bg-gray-500 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                            <div className="flex justify-center">
                                <p>Profile Editing</p>
                            </div>
                            <form className="flex flex-col" onSubmit={uploadData}>
                                <div className="bg-white dark:bg-gray-500 p-8 my-7 border dark:border-white dark:border-opacity-50 rounded-sm">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 min-w-full items-center  place-items-center  ">


                                        {selectedFile ? (
                                            <div className="col-span-1 rounded-full">
                                                <div className="h-24 w-24">
                                                    <Image
                                                        src={selectedFile}
                                                        className="rounded-full cursor-pointer"
                                                        alt=""
                                                        width="100%"
                                                        height="100%"
                                                        layout="responsive"
                                                        objectFit="cover"
                                                        onClick={() => setSelectedFile(null)}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div onClick={() => filePickerRef.current.click()}>
                                                <div className=" w-full items-center justify-center py-5 " >
                                                    <label className=" flex flex-col items-center px-4 py-2 w-full bg-white dark:border dark:border-white dark:bg-gray-500 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer dark:hover:bg-purple-600 hover:bg-purple-600 hover:text-white ">
                                                        <CameraIcon className="w-8 h-8" />
                                                        <span className="mt-2 text-base leading-normal">Select a file</span>

                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                        <input type="file" onChange={addImageToPost} className="hidden" ref={filePickerRef} />


                                        <div className="col-span-2">
                                            <input
                                                className="select-all w-full sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md mb-1 dark:text-black"
                                                type="text"
                                                ref={usernameRef}
                                                require
                                                value={username}
                                                placeholder="Username"
                                                onChange={(e) => setUsername(e.target.value)}
                                                />
                                            <textarea
                                                className="select-all w-full sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md dark:text-black"
                                                type="text"
                                                ref={descriptionRef}
                                                maxLength={150}
                                                value={description}
                                                placeholder="Description"
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 py-3 border-t border-b">
                                        <p className="font-bold">Genres :</p>
                                        <div className="mt-3 flex flex-wrap mx-10 justify-around">
                                            {renderGenreListBox(genre1, setGenre1)}
                                            {renderGenreListBox(genre2, setGenre2)}
                                            {renderGenreListBox(genre3, setGenre3)}
                                        </div>
                                    </div>
                                    <p className="mt-3 font-bold">Links :</p>
                                    <p>Add links to the sites you want to share with your visitors</p>

                                    {!displayed && (<button type="button" className="w-64 h-9 text-blue-500 dark:font-bold text-left" onClick={toggleLinks}> + ADD LINK </button>)}

                                    <div className={classNames([displayed ? "grid grid-cols-5 lg:grid-flow-col lg:grid-rows-1 gap-2 bg-white dark:bg-gray-500 border rounded-lg border-gray-300 p-4 visible " : "hidden"])}>
                                        <div className="col-span-5">
                                            <div className="text-center">
                                                <p className="text-lg">Title</p>
                                            </div>
                                            <div className="mt-3">
                                                <select className="overflow-auto sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md mb-1 w-full dark:text-black" ref={domainRef} value={newDomain} onChange={(e) => setDomain(e.target.value)} >
                                                    <option value="">--Choose one--</option>
                                                    <option value="Facebook">Facebook</option>
                                                    <option value="Twitter">Twitter</option>
                                                    <option value="Instagram">Instagram</option>
                                                    <option value="Github">GitHub</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-span-5">
                                            <div className="text-center">
                                                <p className="text-lg">URL</p>
                                            </div>
                                            <div className="mt-3">
                                                <input
                                                    className="overflow-auto sm:text-sm border-gray-300 dark:border-white focus:ring-black focus:border-black rounded-md mb-1 w-full dark:text-black"
                                                    type="text"
                                                    required={displayed}
                                                    placeholder="Type URL here"
                                                    ref={urlRef}
                                                    value={newUrl}
                                                    pattern={ getPattern(newDomain) }
                                                    onInput={(e) => handleChange(e)}
                                                    onChange={(e) => setUrl(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-5 lg:col-span-1 row-span-1 m-auto" onClick={() => setDisplayed(!displayed)} >
                                            <p className="text-center bg-white border hover:bg-red-500 hover:text-white p-2 text-red-500 dark:text-red dark:font-bold cursor-pointer">
                                                Cancel
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-40 overflow-scroll scrollbar-thumb-black scrollbar-thin my-4">
                                        {links && links.map((link) => (
                                            <div className="grid grid-cols-5 grid-flow-col grid-rows-3 lg:grid-rows-1 gap-2 bg-white dark:bg-gray-500 border dark:border-white rounded-lg border-gray-300 mb-4 p-4" key={link.id} id={link.id}>
                                                <div className="row-span-1 col-span-5 flex lg:hidden mx-auto" id={link.id} ref={deleteLinkRef} onClick={(e) => { deleteFromLinks(e); setDeleted(true); }}  >
                                                    <TrashIcon className="h-8 cursor-pointer" />
                                                </div>
                                                <div className="col-span-5 lg:col-span-1 text-center">
                                                    <div className="row-span-1">
                                                        <div className="">
                                                            <p className="text-lg inline-block">Title</p>
                                                            <div className="row-span-1">
                                                                <p
                                                                    className="sm:text-sm border-gray-300 dark:border-white focus:ring-black focus:border-black rounded-md mb-1">
                                                                    {link.data().domain}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row-span-1 col-span-5 text-center">
                                                    <div>
                                                        <p className="text-lg inline-block">URL</p>
                                                    </div>
                                                    <div>
                                                        <p
                                                            className="overflow-auto sm:text-sm border-gray-300 dark:border-white focus:ring-black focus:border-black rounded-md mb-1" >
                                                            {link.data().url}

                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="hidden lg:flex col-span-1 px-8 w-full" id={link.id} ref={deleteLinkRef} onClick={(e) => { deleteFromLinks(e); setDeleted(true); }}  >
                                                    <TrashIcon className="h-8 cursor-pointer" />
                                                </div>
                                            </div>


                                        )
                                        )}
                                    </div>

                                    <div className="w-48 h-16 ml-auto right-0 mt-10" >
                                        <button type="submit" className="flex items-center justify-end flex-1 h-full py-3 pl-14 pr-12 bg-blue-600 border rounded-full "  >
                                            <p className="text-xl text-white">
                                                Validate
                                            </p>
                                        </button>
                                    </div>
                                    <p className="text-xl font-bold text-center"> {loading ? "Uploading..." : ""} </p>
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default EditModal;
