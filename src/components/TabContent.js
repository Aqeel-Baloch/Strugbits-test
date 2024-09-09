// src/components/TabContent.js
import React from 'react';

const TabContent = ({ title, children }) => {
  return (
    <div className="tab-content">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default TabContent;
