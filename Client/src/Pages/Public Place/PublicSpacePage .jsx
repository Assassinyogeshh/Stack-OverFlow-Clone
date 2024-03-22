import React, { useState } from 'react';
import Filter from 'bad-words';
import './PublicSpacePage.css';
import copy from 'copy-to-clipboard';

const PublicSpacePage = ({ isNight }) => {
  const [content, setContent] = useState('');
  const [fileDataURL, setFileDataURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Perform text filtering
    const filteredContent = filterContent(content);

    // Check if filtered content is empty
    if (filteredContent.trim() === '') {
      setErrorMessage('Content contains abusive or hateful words.');
      alert('The Content Contains Some Inappropriate Words');
      return;
    }

    // Copy filtered content to clipboard
    copy(filteredContent);
    alert("Text Is Being Copied");
  };

  const filterContent = (content) => {
    const filter = new Filter();
    return filter.clean(content);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (!selectedFile) {
      alert("Please provide a file that you want to share.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const dataURL = event.target.result;
      setFileDataURL(dataURL);
    };
  
    reader.readAsDataURL(selectedFile);
  };

  const handleShareFile = () => {
    if (!fileDataURL) {
      alert("Please upload a file first.");
      return;
    }

    // Copy file data URL to clipboard
    copy(fileDataURL);
    alert("File link copied: ");
  };
  
  return (
    <div className='publicPlace' style={{ backgroundColor: isNight ? '#060A13' : '', color: isNight ? 'white' : '' }}>
      <h1>Public Space</h1>
      <div className='sharePublicItems'>
        <textarea value={content} className='sharePublicText' onChange={handleContentChange} placeholder="Enter your text"></textarea>
        <button type="submit" className='publicShareBtn' style={{color: isNight ? 'white' : ''}} onClick={handleSubmit}>Share</button>
        <form className='submitFiles'>
          <input type="file" className='publicFiles' onChange={handleFileChange}/>
          <button type="button" className='publicFilesShareBtn' style={{color: isNight ? 'white' : ''}} onClick={handleShareFile}>Share File</button>
        </form>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default PublicSpacePage;
