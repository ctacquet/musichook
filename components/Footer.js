import React, { useState } from 'react';
import { modalState2 } from '../atoms/modalAtom2';
import { useRecoilState } from "recoil";

function Footer() {

    const [isPopupVisible, setPopupVisibility] = useRecoilState(modalState2);
    
   

    return (

        <>

            {isPopupVisible && (

                <div className="fixed bottom-0 z-10 inset-x-0 flex  grid grid-cols-1 md:grid-cols-4 md:max-w-4xl xl:grid-cols-4 xl:max-w-8xl min-w-full px-8 ">
                    <div className="flex-1  p-8 " />


                    <div className="flex-1 bg-white p-8 flex-wrap items-center justify-center space-x-2 col-span-2 border-4 border-red-500 border-opacity-100 shadow-sm rounded-lg">

                        fdsqdsqdss
                    </div>
                    <div className="flex-1 p-8" />


                </div>

            ) 
             
             
             }



        </>




    );
}

export default Footer;