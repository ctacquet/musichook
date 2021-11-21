import {useEffect, useRef, useState} from "react";

import { clientCarouselItems as clients } from "./data";
import Item from "./Item";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'

function Caroussel() {

    const outermostItemRef = useRef(null);

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                setSuggestions(data);
            });
    }, []);

    const style = {
        textAlign: 'center',
        /*background: 'teal',*/
       /* padding: '200px 0',*/
        paddingRight: 25,
        fontSize: '30px'
    };

    const properties = {
        duration: 3000,
        transitionDuration: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        indicators: i => (<div className="indicator"></div>),
    };

    return (
        <div>


                <Slide className="container" {...properties}>


                    {clients.map((c) => {
                        return (

                            //if c.word.contains les genres du current user
                            <div className="card slide"  ref={outermostItemRef} key={c.id}>
                                <Item  data={c}/>
                            </div>
                        );
                    })}


                </Slide>


        </div>





    );

}
export default Caroussel