import React, { useEffect, useRef } from 'react'

const TranslatePages = () => {

    const googleTranslateRef= useRef(null);
    useEffect(() => {
        let interValidId;
        const checkGoogleTranslate = () => {
            console.log("I am Google Translate:", window.google.translate);
    
            if (window?.google && window.google.translate) {
                clearInterval(interValidId);
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    layout: window.google.translate.TranslateElement.InlineLayout.Simple
                }, googleTranslateRef.current)
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