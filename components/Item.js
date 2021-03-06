import Image from "next/image";
import Link from "next/link";

function Item({ data }) {
    return (
        <div className="h-96 lg:h-80 bg-white border dark:border-gray-500 dark:border-opacity-50 dark:bg-black dark:bg-opacity-75 my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
            <div className="relative h-24">
                {data.background && (
                    <Image
                    src={data.background}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    priority="false"
                />
                )}
            </div>
            <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4 cursor-pointer">
                {data.userImg && (
                <Link href={`/profiles/${data.uid}`}>
                    <a>
                        <Image
                        className="rounded-full"
                        src={data.userImg}
                        alt=""
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="cover"
                        priority="false"
                        />
                    </a>
                </Link>
                )}
            </div>
            <div className="mt-16 ">
                {
                    data.username ? (
                        <Link href={`/profiles/${data.uid}`}>
                            <h1 className="text-lg text-center font-semibold cursor-pointer select-none">
                                {data.username}
                            </h1>
                        </Link>
                    ) : (
                        <Link href={`/profiles/${data.uid}`}>
                            <h1 className="text-lg text-center font-semibold text-gray-600 text-opacity-25 cursor-pointer select-none">
                                No username
                            </h1>
                        </Link>
                    )
                }

                {
                    data.description ? (
                        <p className="text-sm text-gray-600 text-center px-4 truncate select-none">
                            {data.description}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-600 text-center  text-opacity-25 select-none">
                            No description
                        </p>
                    )
                }

            </div>
            <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t justify-center select-none">
                {
                    data.genres[0] &&
                    data.genres[0].toLowerCase() !== "no genres" &&
                    data.genres[0].toLowerCase() !== "no genre" && (
                    <a
                        disabled
                        className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600"
                      >
                          {data?.genres[0]}
                    </a>
                    )
                }

                {
                    data.genres[1] &&
                    data.genres[1].toLowerCase() !== "no genres" &&
                    data.genres[1].toLowerCase() !== "no genre" && (
                    <a
                        disabled
                        className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600"
                      >
                          {data?.genres[1]}
                    </a>
                    )
                }

                {
                    data.genres[2] &&
                    data.genres[2].toLowerCase() !== "no genres" &&
                    data.genres[2].toLowerCase() !== "no genre" && (
                    <a
                        disabled
                        className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600"
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