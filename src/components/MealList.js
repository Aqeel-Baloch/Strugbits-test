// src/components/MealList.js
import React from 'react';

const MealList = ({ meals, onAddToWeek }) => {
  return (
    <div>
      {meals.map(meal => (
        <div key={meal.id} className="meal-item">
          <span>{meal.name}</span>
          <button className="add-to-week" onClick={() => onAddToWeek(meal)}>Add to week</button>
        </div>
      ))}
    </div>
  );
};

export default MealList;
