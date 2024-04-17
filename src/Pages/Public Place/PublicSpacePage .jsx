import React, { useState } from 'react';
import Filter from 'bad-words';
import './PublicSpacePage.css';
import { useSelector } from 'react-redux';
// import {Link, useNavigate} from 'react-router-dom'
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import axios from 'axios';
import copy from 'copy-to-clipboard';
// import ShowSharedImage from './ShowSharedImage';

const PublicSpacePage = ({ slideIn, handleSlideIn, isNight }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [userShareData, setUserShareData] = useState(null);
  const [shareText, setSharedText] = useState(null)
  // const [shareFile, setSharedFile] = useState(null)
  const currentUser = useSelector((state) => state.currentUserReducer);
  const id = currentUser?.stackUser._id;

  const apiUrl = "https://stack-overflow-clone-0jhm.onrender.com";

  // const navigate= useNavigate();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const shareText = filterContent(content);

      if (shareText.trim() === '') {
        alert('The Content Contains Some Inappropriate Words');
        return;
      }
  
      if (shareText !== content) {
        alert('The Content Contains Some hateful Words');
        return;
      }

      if (!id) {
        alert("SignIn before Sharing the data")
        return
      }

        const shareFile= await convertToBase64(file)
     

      const response = await axios.post(`${apiUrl}/user/shareData/${id}`, {shareText, shareFile});

      
      const stored= response?.data?.sharedData

      setUserShareData(stored);

      // const storedFile= response.data.sharedData.sharedFile

      
      const storedText= response?.data?.sharedData.sharedText
      
      setSharedText(storedText)

      alert(response?.data.message)

    } catch (error) {
      console.log('Error sharing content:', error);
      alert("Failed Submit The Share Data");
    }
  };

  const filterContent = (content) => {
    const filter = new Filter();
    return filter.clean(content);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected File:', selectedFile); // Check the selected file in the console
    setFile(selectedFile);
  };
  

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const copySharedText = () => {
    if (shareText) {
      copy(shareText);
      alert('File link copied to clipboard!');
    } else {
      alert('No file data available to copy link.');
    }
  };
 
  const copySharedFile = () => {
    if (userShareData) {
      const fileUrl = `${apiUrl}/user/getUserSharedData/${id}`;
  copy(`http://localhost:3000/shareImage/:${id}`);

      alert('File link copied to clipboard!');
    } else {
      alert('No file data available to copy link.');
    }
  };
 

  return (
    <div className="tags_page">
      <div className="LEFT_SIDE_BAR"> 
        <LeftSideBar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </div>
      <div className='publicPlace' style={{ backgroundColor: isNight ? '#060A13' : '', color: isNight ? 'white' : '' }}>
        <h1>Public Space</h1>
        <form className='sharePublicItems' onSubmit={handleSubmit}>
          <textarea
            value={content}
            className='sharePublicText'
            onChange={handleContentChange}
            placeholder="Enter your text"
            required
          ></textarea>
            <input
              type="file"
              accept="image/*"
              className='publicFiles'
              onChange={handleFileChange}
            required

            />
            <button
              type="submit"
              className='publicShareBtn'
              style={{ color: isNight ? 'white' : '' }}
            >
              Submit
            </button>
        </form>
 
   {userShareData && (
   
   <div className='sharedData'>
<button onClick={copySharedText}>Share Text</button>
{/* <button onClick={copySharedFile}>ShareFile</button>  */}
   </div>

   )}

      </div>
    </div>
  );
};

export default PublicSpacePage;
