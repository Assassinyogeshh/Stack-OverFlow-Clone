import React, { useEffect, useRef } from 'react'

const TranslatePages = () => {

    const googleTranslateRef= useRef(null);
    useEffect(() => {
        let interValidId;
      
          
       
        const checkGoogleTranslate = () => {
          try {
    
            if (window?.google && window.google.translate) {
                clearInterval(interValidId);
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    layout: window.google.translate.TranslateElement.InlineLayout.Simple
                }, googleTranslateRef.current)
            }
          } catch (error) {
          console.log(error);
          // alert("Check Your Internet Connection")
          }
        }
   
        interValidId = setInterval(checkGoogleTranslate, 100)
    }, []);
   
    

  return (
    <div>
      <div ref={googleTranslateRef}></div>
    </div>
  )
}

export default TranslatePages