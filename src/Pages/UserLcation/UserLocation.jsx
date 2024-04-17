import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
const UserLocation = ({ slideIn, handleSlideIn, isNight }) => {
    const [userLocation, setUserLocation] = useState(null);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        const getLocation = async () => {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            } catch (error) {
                console.error('Error getting user location:', error);
            }
        };

        getLocation();
    }, []);

    return (
        <div className="tags_page">
        <div className="LEFT_SIDE_BAR"> 
            <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
          </div>
        <div style={{ width: '100%', height: '100vh',  backgroundColor: isNight ? '#060A13' : '',  color: isNight ? 'white' : ''  }}>
            <LoadScript googleMapsApiKey={apiKey}>
                <h1>Current Location</h1>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={userLocation}
                    zoom={12}
                >
                    {userLocation && <Marker position={userLocation} />}
                </GoogleMap>
            </LoadScript>
        </div>
        </div>
    );
};

export default UserLocation;
