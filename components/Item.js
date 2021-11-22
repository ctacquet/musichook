
import {useRef, useState} from "react";

import {clientCarouselItems as clients, wordCarouselItems} from "./data";

function Item({data}) {

    const pathBackground = 'https://source.unsplash.com/random';

    return (


                  /*<p>{props.children}</p>*/


                <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
                    <div className="relative h-40">
                        <img className="absolute h-full w-full object-cover"
                             src={pathBackground}/>
                    </div>
                    <div
                        className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                        <img className="object-cover w-full h-full"
                             src={data.url}/>
                    </div>
                    <div className="mt-16 ">
                        <h1 className="text-lg text-center font-semibold">
                            {/*Destructerz*/}{data.name}
                        </h1>
                        <p className="text-sm text-gray-600 text-center">
                           {/* 13 connections in common*/}{data.content}
                        </p>
                    </div>
                    <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t">
                        <div
                            className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                            {/*Hardstyle*/}{data.word[Math.floor(Math.random() * wordCarouselItems.length)]}
                        </div>
                        <div
                            className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                            {/*Melodic Hardstyle*/}{data.word[Math.floor(Math.random() * wordCarouselItems.length)]}
                        </div>
                        <div
                            className="text-xs mr-2 my-1 uppercase tracking-wider border px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-indigo-100 cursor-default">
                           {/* Melbourn Bounce*/}{data.word[Math.floor(Math.random() * wordCarouselItems.length)]}
                        </div>
                    </div>
                </div>





    );

}
export default Item