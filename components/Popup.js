import React from 'react';

function Popup({setup}) {

   

    return (

        <div>
                {setup && (

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
                
                }
              
             
        </div>
    );
}

export default Popup;