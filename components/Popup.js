import React from 'react';
import ReactDOM from 'react-dom';

function Popup(props) {

   let element;

   if(props.setup) {
    element = (
        <p>
        Mauris rhoncus aenean vel elit scelerisque mauris
        pellentesque pulvinar. Neque volutpat ac tincidunt vitae
        semper quis lectus. Sed sed risus pretium quam vulputate
        dignissim suspendisse in. Urna nec tincidunt praesent
        semper feugiat nibh sed pulvinar. Ultricies lacus sed
        turpis tincidunt id aliquet risus feugiat. Amet cursus
        sit amet dictum sit amet justo donec enim. Vestibulum
        rhoncus est pellentesque elit ullamcorper. Id aliquet
        risus feugiat in ante metus dictum at.
       </p>
      );

   }else{
       element = (
           <p> idk </p>
       );
   }

    return (
        <div>
                  
        {element}

            {/* <div className="sticky bg-red-100 inset-0">
                    {/* {setup && (

                    <p>
                    Mauris rhoncus aenean vel elit scelerisque mauris
                    pellentesque pulvinar. Neque volutpat ac tincidunt vitae
                    semper quis lectus. Sed sed risus pretium quam vulputate
                    dignissim suspendisse in. Urna nec tincidunt praesent
                    semper feugiat nibh sed pulvinar. Ultricies lacus sed
                    turpis tincidunt id aliquet risus feugiat. Amet cursus
                    sit amet dictum sit amet justo donec enim. Vestibulum
                    rhoncus est pellentesque elit ullamcorper. Id aliquet
                    risus feugiat in ante metus dictum at.
                    </p>
                    )
                    
                    } */}
                    
                
                
            {/* </div> */} 

        </div>
      
    );
}



export default Popup;