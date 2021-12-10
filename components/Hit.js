import Link from "next/link";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/outline";

export function Hit({ hit, closeModal }) {

  return (
    <Link href={`/profiles/${hit.uid}`}>
      <div onClick={closeModal} className="w-full p-2 my-1 bg-white border hover:bg-purple-500 ring-inset focus:ring-2 focus:ring-purple-600 focus:ring-opacity-75 focus:bg-purple-300 rounded-lg">
        
        <div className="inline-block pl-1">
            <div className="translate-y-1 w-6">
            {hit.userImg ? (
                <Image
                className="rounded-full"
                src={hit?.userImg}
                alt=""
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="cover"
                />
            ) : (
                <UserCircleIcon className="w-6" />
            )}
            </div>
        </div>
        <div className="inline-block pl-2 text-xl">{hit.username}</div>
      </div>
    </Link>
  );
}
