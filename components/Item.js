import Image from "next/image";
import Link from "next/link";

function Item({ data }) {
    return (
        <div className="h-96 bg-white border dark:border-gray-500 dark:border-opacity-50 dark:bg-black dark:bg-opacity-75 my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
            <div className="relative h-40">
                {data.background && <Image className=" "
                    src={data.background}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    priority="false"
                />}
            </div>
            <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4 cursor-pointer">
                {data.userImg && (
                <Link href={`/profiles/${data.uid}`}>
                    <Image
                        src={data.userImg}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        priority="false"
                    />
                </Link>
                )}
            </div>
            <div className="mt-16 ">
                {
                    data.username ? (
                        <Link href={`/profiles/${data.uid}`}>
                            <h1 className="text-lg text-center font-semibold cursor-pointer">
                                {data.username}
                            </h1>
                        </Link>
                    ) : (
                        <Link href={`/profiles/${data.uid}`}>
                            <h1 className="text-lg text-center font-semibold text-gray-600 text-opacity-25 cursor-pointer">
                                No username
                            </h1>
                        </Link>
                    )
                }

                {
                    data.description ? (
                        <p className="text-sm text-gray-600 text-center px-4 truncate">
                            {data.description}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-600 text-center  text-opacity-25">
                            No description
                        </p>
                    )
                }

            </div>
            <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t justify-center">
                {
                    data.genres[0] &&
                    data.genres[0] !== "no genres" &&
                    data.genres[0] !== "No genre" && (
                    <a
                        disabled
                        className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:text-indigo-100 hover:bg-gray-600 cursor-not-allowed select-none"
                      >
                          {data?.genres[0]}
                    </a>
                    )
                }

                {
                    data.genres[1] &&
                    data.genres[1] !== "no genres" &&
                    data.genres[1] !== "No genre" && (
                    <a
                        disabled
                        className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:text-indigo-100 hover:bg-gray-600 cursor-not-allowed select-none"
                      >
                          {data?.genres[1]}
                    </a>
                    )
                }

                {
                    data.genres[2] &&
                    data.genres[2] !== "no genres" &&
                    data.genres[2] !== "No genre" && (
                    <a
                        disabled
                        className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:text-indigo-100 hover:bg-gray-600 cursor-not-allowed select-none"
                      >
                          {data?.genres[2]}
                    </a>
                    )
                }
            </div>
        </div>

    );

}
export default Item