import React from "react";
import './RightSideBar.css'
const WidgetTags = ({isNightR}) => {
  const tags = [
    "c",
    "css",
    "express",
    "firebase",
    "html",
    "java",
    "javascript",
    "mern",
    "mongodb",
    "mysql",
    "next.js",
    "node.js",
    "php",
    "python",
    "reactjs",
  ];

  return (
    <div className="widget-tags" style={{backgroundColor: isNightR?"#060A13":""}}>
      <h4 className="defaultH4" style={{backgroundColor: isNightR?"#060A13":""}}>Watched tags</h4>
      <div className="widget-tags-map">
        {tags.map((tag) => (
          <p className="defaultWidget" style={{backgroundColor: isNightR?"#060A13":""}} key={tag}>{tag}</p>
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;