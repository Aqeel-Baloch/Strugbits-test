// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import MealList from './components/MealList.js';
import TabContent from './components/TabContent.js';
import WeekTab from './components/WeekTab.js';

function App(){

  const [meals, setMeals] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [tab, setTab] = useState('all-meals');
  const [weeks, setWeeks] = useState({
    'week-1': [],
    'week-2': [],
    'week-3': [],
    'week-4': [],
  });

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then(response => response.json())
      .then(data => setMeals(data.recipes))
      .catch(error => console.error('Error fetching meals:', error));
  }, []);

  const handleTabChange = (tabName) => {
    setTab(tabName);
  };

  const handleAddToWeek = (meal) => {
    if (selectedWeek) {
      const weekMeals = weeks[selectedWeek];
      if (!weekMeals.find(m => m.id === meal.id)) {
        setWeeks(prevWeeks => ({
          ...prevWeeks,
          [selectedWeek]: [...prevWeeks[selectedWeek], meal]
        }));
      } else {
        alert('Meal already added to this week.');
      }
    } else {
      alert('Please select a week.');
    }
  };

  const handleDeleteMeal = (week, mealId) => {
    setWeeks(prevWeeks => ({
      ...prevWeeks,
      [week]: prevWeeks[week].filter(meal => meal.id !== mealId)
    }));
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value)
    
  }

  return (
    
    <div className="App">
      <h1 style={{textAlign: "center"}}>Meal Planner</h1>
      <div className="tabs">
        {['all-meals', 'week-1', 'week-2', 'week-3', 'week-4'].map(tabName => (
          <WeekTab
            key={tabName}
            tabName={tabName}
            currentTab={tab}
            onTabChange={handleTabChange}
          />
        ))}
      </div>

      {tab === 'all-meals' && (
        <TabContent title="All Meals">
          <select value={selectedWeek} onChange={handleWeekChange}>
            <option value="">Select week</option>
          {['week-1', 'week-2', 'week-3', 'week-4'].map((week)=>(
            <option value={week}>{week}</option>
          ))}
          </select>
          <MealList
            meals={meals}
            onAddToWeek={handleAddToWeek}
          />
        </TabContent>
      )}

      {['week-1', 'week-2', 'week-3', 'week-4'].map(week => (
        tab === week && (
          <TabContent key={week} title={week.replace('-', ' ')}>
            {weeks[week].length ? (
              weeks[week].map(meal => (
                <div key={meal.id} className="meal-item">
                  <span>{meal.name}</span>
                  <button className="delete-meal" onClick={() => handleDeleteMeal(week, meal.id)}>Delete</button>
                </div>
              ))
            ) : (
              <p>No meals added to this week.</p>
            )}
          </TabContent>
        )
      ))}
    </div>
  );
}

export default App;
