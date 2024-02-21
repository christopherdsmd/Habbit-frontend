import React, { useEffect, useState, useContext } from 'react';
import './calandarView.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import axios from 'axios';
import { UserContext } from '../context/userContext';

const generateDateValues = (habitDates, startDate, endDate) => {
  const dateValues = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    const count =
      habitDates?.find((habitDate) => habitDate.date === dateString)?.count || 0;
    dateValues.push({ date: dateString, count });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateValues;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const CalendarView = ({ habits }) => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  const { user } = useContext(UserContext); // Get user data from context

  return (
    <div>
      {habits.map((habit) => (
        <div key={habit._id} className="habit-calendar">
          <h2>
            {habit.habit_name}
            {habit.emoji}
          </h2>
          <CalendarHeatmap
            key={habit._id}
            startDate={startDate}
            endDate={endDate}
            values={generateDateValues(habit.daily_check, startDate, endDate)}
            classForValue={(value) => {
              if (!value || value.count === 0) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
            showOutOfRangeDays={true}
            tooltipDataAttrs={(value) => ({
              'data-tip': `${value.date} has count: ${value.count}`,
            })}
            showWeekdayLabels={true}
            onClick={(value) =>
              alert(
                `On ${formatDate(value.date)} You Completed '${habit.habit_name}' ${value.count} times.`
              )
            }
          />
          <Tooltip id="calendar-tooltip" />
        </div>
      ))}
    </div>
  );
};

export default CalendarView;
