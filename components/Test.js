import React from 'react';
import { useState } from "react";
import Popup from "../components/Popup" ;

import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { modalState2 } from '../atoms/modalAtom2';
import { useRecoilState } from "recoil";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

    
function Test() {

 // const [open, setOpen] = useRecoilState(modalState2);
  const [isPopupVisible, setPopupVisibility] = useRecoilState(modalState2);
  
  // const [isPopupVisible, setPopupVisibility] = useState(true);
   const togglePopup = () => {
       setPopupVisibility(!isPopupVisible);
   };


  // let subtitle;
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  // function openModal() {
  //   setIsOpen(true);
  // }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  // function closeModal() {
  //   setIsOpen(false);
  // }

    return (
        <div>
                {/* <div className="h-25 w-25 bg-green-200">div</div> */}
                <button className="h-25 w-25 bg-green-200" onClick={() => togglePopup(true)}>click me</button>
                   {/* <Popup setup={isPopupVisible}></Popup>    */}

                
                
                {/* <button onClick={openModal}>Open Modal</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        className="top-1/2 left-1/2 right-auto bottom-auto"
                        overlayClassName="fixed inset-0"
                        contentLabel="Example Modal"
                        scrollable={true}
                    >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                        <button onClick={closeModal}>close</button>
                        <div>I am a modal</div>
                    
                    </Modal> */}
            

        </div>
    );
}


// if (typeof window !== 'undefined') {
//   //document.body.appendChild(document.createElement("DIV"))
//   ReactDOM.render(<Popup setup={true} />, document.getElementById("tata") );
// }



export default Test;