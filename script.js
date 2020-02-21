// LIGHTS

const lights = {
    
    bodyClasses: document.body.classList
    
   ,modes: [
        'auto'
       ,'noon'
       ,'dusk'
       ,'dark'
    ]
    
   ,mode: 'auto'
    
   ,switchTemp: [
        `<div id='light-switch'>
            <div id='light-switch--auto'></div>
            <div id='light-switch--noon'></div>
            <div id='light-switch--dusk'></div>
            <div id='light-switch--dark'></div>
        </div>`
   ]
    
   ,purge: () => { lights.modes.forEach(
       (mode) => {
           lights.bodyClasses.remove( `light-switch-${ mode }` );
        }
    ) }
    
   ,setURLs: () => {
       
       let A = Array.from(document.getElementsByTagName( 'a' ));
       
       A.forEach(
        (a) => {
            
            let href = a.getAttribute('href');
            
            // RegExp local URL test
            if ( /^\//.test(href) ) {
                
                let root_href = (href.split('?'))[0];
                
                if ( !/\/$/.test(root_href) ) {
                    
                    root_href += '/';
                    
                }
                
                a.setAttribute(
                    'href'
                   ,`${ root_href }?t=${ lights.mode }`
                );
                
            }
            
            let pathname = window.location.pathname;
                
            if ( pathname.slice(-1) == '/' && pathname != '/' ) { 
                pathname = pathname.slice(0,-1);
            }
            
            //window.history.replaceState( '', '', pathname );
            
        }
       );
       
   }
    
   ,set: function (mode) {
        lights.purge();
        lights.mode = mode;
        lights.setURLs();
        if ( mode != 'auto' ) {
            lights.bodyClasses.add( `light-switch-${ mode }` )
        }
   }
    
   ,on: () => {
       
       /* Create switch */
       document
           .getElementsByTagName( 'main' )[0]
           .getElementsByTagName( 'header' )[0]
           .innerHTML += lights.switchTemp[0];
       
       /* Add a click event listener to each button which updates the body class */
       lights.modes.forEach(
            (mode) => {
                document
                    .getElementById( `light-switch--${ mode }` )
                    .addEventListener(
                        "click",
                        () => { lights.set( mode ) }
                );
            }
       )
       
       /* If a mode selection is passed in the URL, switch to it */
       
       if ( getUrlVars()['t'] != undefined )
          { lights.set( getUrlVars()['t'] ) }
       
    }
    
}; lights.on();