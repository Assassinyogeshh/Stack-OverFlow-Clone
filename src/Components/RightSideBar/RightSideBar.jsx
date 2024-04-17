import React, {useEffect, useState} from 'react'
import Widget from './Widget'
import WidgetTags from './WidgetTags'

function RightSideBar({isNight}) {
  
  
  const [isNightR, setIsNightR] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    setIsNightR(currentTime < 6 || currentTime >= 18);
  }, []);

  return (
    <>
      <div className="right_Side">
        <div className="first_box">
            <Widget isNightR={isNightR}   style={{ backgroundColor: isNight ? '#060A13' : '#fdf7e2' , color: isNight ? 'white' : '' }} />
        </div>
        <div className="second_box">
            <WidgetTags isNightR={isNightR} style={{ backgroundColor: isNight ? '#060A13' : '#fdf7e2' , color: isNight ? 'white' : '' }}/>
        </div>
      </div>
    </>
  )
}

export default RightSideBar
