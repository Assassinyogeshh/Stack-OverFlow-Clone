import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ShowSharedImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const apiUrl = "https://stack-overflow-clone-0jhm.onrender.com"; // Update with your API URL
  const currentUser = useSelector((state) => state.currentUserReducer);
  const id = currentUser?.stackUser?._id;

  useEffect(() => {
    const getSharedImage = async () => {
      try {
        if (!id) {
          console.log('User ID not available');
          return;
        }

        const response = await axios.get(`${apiUrl}/user/getUserSharedData/${id}`);
        if (response.data && response.data.shareData) {
          setImageUrl(response.data.shareData);
        } else {
          console.log('No shared image found');
        }
      } catch (error) {
        console.error('Error fetching shared image:', error);
      }
    };

    getSharedImage();
  }, [apiUrl, id]);

  const copyImageUrlToClipboard = async () => {
    if (imageUrl) {
      try {
        await navigator.clipboard.writeText(imageUrl);
        console.log('Image URL copied to clipboard:', imageUrl);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000); // Reset after 2 seconds
      } catch (error) {
        console.error('Failed to copy image URL to clipboard:', error);
      }
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {imageUrl ? (
        <div>
          <img src={imageUrl} style={{ width: '50%' }} alt="Shared Image" />
          <button onClick={copyImageUrlToClipboard}>Copy Image URL</button>
          {copied && <p style={{ marginTop: '10px', color: 'green' }}>Image URL copied to clipboard!</p>}
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ShowSharedImage;
