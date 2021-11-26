
import { useRef, useState } from "react";

import { clientCarouselItems as clients, wordCarouselItems } from "./data";
import Image from "next/image";


function Item({ data }) {

    // const pathBackground = 'https://source.unsplash.com/random';
    

    return (



        <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
            <div className="relative h-40">
                {data.background && <Image className=" "
                    src={data.background}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    priority="false"

                />}
            </div>
            <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                {data.userImg && <Image className=""
                    src={data.userImg}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    priority="false"


                />}
            </div>
            <div className="mt-16 ">
                {
                    data.username ? (
                        <h1 className="text-lg text-center font-semibold">
                            {/*Destructerz*/}{data.username}
                        </h1>
                    ) : (
                        <h1 className="text-lg text-center font-semibold text-gray-600 text-opacity-25 ">
                            No username
                        </h1>
                    )

                }
                {
                    data.description ? (
                        <p className="text-sm text-gray-600 text-center">
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
                {data.genres[0] ? (
                    <div
                        className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                        {data.genres[0]}
                    </div>
                ) :
                    (
                        <div
                            className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-gray-600 text-opacity-25 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                            No genres
                        </div>
                    )

                }
                {data.genres[1] ? (
                    <div
                        className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                        {data.genres[1]}
                    </div>
                ) :
                    (
                        <div
                            className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-gray-600 text-opacity-25 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                            No genres
                        </div>
                    )

                }
                {data.genres[2] ? (
                    <div
                        className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                        {data.genres[2]}
                    </div>
                ) :
                    (
                        <div
                            className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-gray-600 text-opacity-25 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                            No genres
                        </div>
                    )

                }
               
            </div>
        </div>

    );

}
export default Item