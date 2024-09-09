// src/components/WeekTab.js
import React from 'react';

const WeekTab = ({ tabName, currentTab, onTabChange }) => {
  return (
    <button
      className={`tab-button ${currentTab === tabName ? 'active' : ''}`}
      onClick={() => onTabChange(tabName)}
    >
      {tabName.replace('-', ' ')}
    </button>
  );
};

export default WeekTab;
