import { useRecoilState } from "recoil";
import { modalStateEditProfile } from "../atoms/modalAtomEditProfile";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState, useEffect } from "react";
import {
    CameraIcon,
    TrashIcon
} from "@heroicons/react/outline";

import { db, storage, auth } from "../lib/firebase";
import { updateDoc, doc, onSnapshot, arrayUnion, collection, deleteDoc, addDoc } from "@firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from "next/image";
import { ref, getDownloadURL, uploadString } from "firebase/storage"
import classNames from "classnames";

function EditModal() {
    const [user] = useAuthState(auth);
    const [openEdit, setOpenEdit] = useRecoilState(modalStateEditProfile);
    const [loading, setLoading] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);

    const usernameRef = useRef(null);
    //console.log(currentUserData?.username)
    const [username, setUsername] = useState(currentUserData?.username);

    //console.log("username :")
    //console.log(username)


    const descriptionRef = useRef(null);
    const [description, setDescription] = useState(currentUserData?.description);

    const genresRef1 = useRef(null);
    const [genre1, setGenre1] = useState(currentUserData?.genres[0]);

    const genresRef2 = useRef(null);
    const [genre2, setGenre2] = useState(currentUserData?.genres[1]);

    const genresRef3 = useRef(null);
    const [genre3, setGenre3] = useState(currentUserData?.genres[2]);

    const dispayNameRef = useRef(null);
    const [userdisplayName, setUserDisplayName] = useState("");




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
                        0: genresRef1.current.value.toLowerCase(),
                        1: genresRef2.current.value.toLowerCase(),
                        2: genresRef3.current.value.toLowerCase()
                    },
                })
            });
        } else {
            await updateDoc(docRef, {
                description: descriptionRef.current.value,
                username: usernameRef.current.value,
                genres: {
                    0: genresRef1.current.value.toLowerCase(),
                    1: genresRef2.current.value.toLowerCase(),
                    2: genresRef3.current.value.toLowerCase()
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
            case 'facebook':
                return "https?://(www\.)?facebook\.com/(profile\.php\?id=)?";
            case 'twitter':
                return "https?://twitter\.com/";
            case 'instagram':
                return "https?://(www\.)?instagram\.com/";
            case 'github':
                return "https?://(www\.)?github\.com/";
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
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                            <div className="flex justify-center">
                                <p>Profile Editing</p>
                            </div>
                            <form className="flex flex-col" onSubmit={uploadData}>
                                <div className="bg-white p-8 my-7 border rounded-sm">
                                    <div className="grid grid-cols-3 gap-3 min-w-full items-center  place-items-center  ">


                                        {selectedFile ? (
                                            <div className="col-span-1  rounded-full  ">
                                                <div className="h-24 w-24">
                                                    <Image
                                                        src={selectedFile}
                                                        className="rounded-full cursor-pointer"
                                                        alt=""
                                                        width="100%"
                                                        height="100%"
                                                        layout="responsive"
                                                        objectFit="fill"
                                                        onClick={() => setSelectedFile(null)}
                                                    />
                                                </div>
                                            </div>


                                        ) : (
                                            <div onClick={() => filePickerRef.current.click()}>
                                                <div className=" w-full items-center justify-center py-5 " >
                                                    <label className=" flex flex-col items-center px-4 py-2 w-full bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white ">
                                                        <CameraIcon className="w-8 h-8" />
                                                        <span className="mt-2 text-base leading-normal">Select a file</span>
                                                        {/* <input type="file" onChange={handleImageAsFile} className="hidden" ref={filePickerRef} /> */}

                                                    </label>
                                                </div>
                                            </div>

                                        )}
                                        <input type="file" onChange={addImageToPost} className="hidden" ref={filePickerRef} />


                                        <div className="col-span-2 "  >
                                            <input
                                                className="text-ellipsis overflow-hidden sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md mb-1 "
                                                type="text"
                                                ref={usernameRef}
                                                required
                                                //currentUserData?.username                                                
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}

                                            />
                                            <textarea
                                                className="text-ellipsis overflow-hidden sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md w-full"
                                                type="text"
                                                ref={descriptionRef}
                                                required
                                                maxLength={150}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t justify-around">

                                        <input
                                            className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600   "
                                            ref={genresRef1}
                                            value={genre1}
                                            onChange={(e) => setGenre1(e.target.value)}

                                        />
                                        <input
                                            className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 "

                                            ref={genresRef2}
                                            value={genre2}
                                            onChange={(e) => setGenre2(e.target.value)}
                                        />
                                        <input
                                            className="text-xl mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 "

                                            ref={genresRef3}
                                            value={genre3}
                                            onChange={(e) => setGenre3(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <p className="">Links :<br />add links to the sites you want to share with your visitors</p>

                                {displayed ? (
                                    <></>
                                ) : (
                                    <button type="button" className="w-64 h-9 text-blue-500 text-left" onClick={toggleLinks}> + ADD LINK </button>
                                )

                                }


                                <div className={classNames([displayed ? "grid grid-cols-7 gap-4 bg-white border rounded-lg border-gray-300 p-4 visible " : "hidden"])}>
                                    <div className="col-span-1 text-center ">
                                        <p className="text-lg inline-block">Title</p>
                                    </div>
                                    <div className="col-span-2 ">
                                        <select className="text-ellipsis overflow-hidden sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md mb-1" ref={domainRef} value={newDomain} onChange={(e) => setDomain(e.target.value)} >
                                            <option value="">--Choose an domain--</option>
                                            <option value="facebook">Facebook</option>
                                            <option value="twitter">Twitter</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="github">GitHub</option>
                                            <option value="other">Other</option>
                                        </select>


                                    </div>
                                    <div className="col-span-1  text-center ">
                                        <p className="text-lg inline-block">URL</p>
                                    </div>
                                    <div className="col-span-2 space-x-2">
                                        <input
                                            className="text-ellipsis overflow-hidden sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md mb-1"
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
                                    <div className="col-span-1 px-5 w-full" onClick={() => setDisplayed(!displayed)} >
                                        <p className="text-center text-red-500 cursor-pointer w-full">
                                            Cancel
                                        </p>

                                    </div>

                                </div>

                                <div className="h-40 overflow-y-scroll scrollbar-thumb-black scrollbar-thin my-4">
                                    {links && links.map((link) => (
                                        <div className="grid grid-cols-7 gap-4 bg-white border rounded-lg border-gray-300 mb-4 p-4" key={link.id} id={link.id}>
                                            <div className="col-span-1 text-center ">
                                                <p className="text-lg inline-block">Title</p>
                                            </div>
                                            <div className="col-span-2 ">
                                                <p
                                                    className="text-ellipsis overflow-hidden sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md mb-1">
                                                    {link.data().domain}
                                                </p>
                                            </div>
                                            <div className="col-span-1  text-center ">
                                                <p className="text-lg inline-block">URL</p>
                                            </div>
                                            <div className="col-span-2 space-x-2">
                                                <p
                                                    className="text-ellipsis overflow-hidden sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md mb-1" >
                                                    {link.data().url}

                                                </p>
                                            </div>
                                            <div className="col-span-1 px-8 w-full" id={link.id} ref={deleteLinkRef} onClick={(e) => { deleteFromLinks(e); setDeleted(true); }}  >
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




                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default EditModal;
