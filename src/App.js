import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import GlobalStyles from "./components/global/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './themes.js';

import Header from "./components/header/Header";
import Checklist from "./components/main/display/Checklist";
import History from "./components/main/display/History";
import { StyledMain } from "./components/main/Main.styled";

function App() {

  const date = new Date();
  const [ today, setToday ] = useState([]);

  useEffect(() => {
    setToday([date.getFullYear(), date.getMonth() + 1, date.getDate()])
  }, [])

  useEffect(() => {
    if(today.length === 0) {
      return
    } else {
      if(records[0].date.toString() == today.toString()) {
        return
      } else {
        createNewDay()
      }
    }
  }, [today])

  

// SET THEME
const [colorTheme, setColorTheme] = useState('light');

  function toggleTheme() {
    if (colorTheme === "dark") {
      setColorTheme('light');
    } else if (colorTheme === 'light') {
      setColorTheme('dark');
    }
  }

  const [ habits, setHabits ] = useState([
      { 
        id: 1,
        name: "Tidy room",
        color: "#f72585",
        type: "check",
      },
      { 
        id: 2,
        name: "Skincare",
        color: "#0a9396",
        type: "check",
      },
      { 
        id: 3,
        name: "Make bed",
        color: "#d883ff",
        type: "check",
      },
      { 
        id: 4,
        name: "Vitamins",
        color: "#d00000",
        type: "check",
      },
      { 
        id: 5,
        name: "Drink Water",
        color: "#ffaa00",
        type: "quantity",
        goalAmt: 80,
      },
    ])

  const [ records, setRecords ] = useState([
    {
      id: "33",
      date: [2023, 3, 9],
      habits: [
        {
          id: 'Tidy room',
          name: "Tidy Room",
          color: "#f72585",
          type: "check",
          complete: true
        },
        {
          id: 'Skincare',
          name: "Skincare",
          color: "#0a9396",
          type: "check",
          complete: false
        },
        {
          id: 'Make bed',
          name: "Make bed",
          color: "#d883ff",
          type: "check",
          complete: true
        },
        {
          id: 'Vitamins',
          name: "Vitamins",
          color: "#d00000",
          type: "check",
          complete: false
        },
        { 
          id: "Drink Water",
          name: "Drink Water",
          color: "#ffaa00",
          type: "quantity",
          goal: {
            currentAmt: 40,
            goalAmt: 80,
          },
          complete: false
        },
      ]
    },
    {
      id: "22",
      date: [2023, 3, 8],
      habits: [
        {
          id: 'Tidy room',
          name: "Tidy Room",
          color: "#f72585",
          type: "check",
          complete: false
        },
        {
          id: 'Skincare',
          name: "Skincare",
          color: "#0a9396",
          type: "check",
          complete: false
        },
        {
          id: 'Make bed',
          name: "Make bed",
          color: "#d883ff",
          type: "check",
          complete: true
        },
        {
          id: 'Vitamins',
          name: "Vitamins",
          color: "#d00000",
          type: "check",
          complete: true
        },
        { 
          id: "Drink Water",
          name: "Drink Water",
          color: "#ffaa00",
          type: "quantity",
          goal: {
            currentAmt: 80,
            goalAmt: 80,
          },
          complete: true
        },
      ]
    },
    {
      id: "11",
      date: [2023, 3, 7],
      habits: [
        {
          id: 'Tidy room',
          name: "Tidy Room",
          color: "#f72585",
          type: "check",
          complete: true
        },
        {
          id: 'Skincare',
          name: "Skincare",
          color: "#0a9396",
          type: "check",
          complete: true
        },
        {
          id: 'Make bed',
          name: "Make bed",
          color: "#d883ff",
          type: "check",
          complete: false
        },
        {
          id: 'Vitamins',
          name: "Vitamins",
          color: "#d00000",
          type: "check",
          complete: true
        },
        { 
          id: "Drink Water",
          name: "Drink Water",
          color: "#ffaa00",
          type: "quantity",
          goal: {
            currentAmt: 60,
            goalAmt: 80,
          },
          complete: false
        },
      ]
    },
  ])

function createNewDay() {
  const habitsCopy = [...habits];
  const habitsList = habitsCopy.map(habit => {
    if (habit.type === "check") {
      return { id: uuidv4(), name: habit.name, color: habit.color, type: habit.type, complete: false }
    } else {
      return { id: uuidv4(), name: habit.name, color: habit.color, type: habit.type, goal: { currentAmt: 0, goalAmt: habit.goalAmt}, complete: false }
    }
  })

  const newRecord = {
    id: uuidv4(),
    date: [...today],
    habits: [...habitsList]
  }

  setRecords([newRecord, ...records]);
}


// useEffect(() => {
//   console.log(records)
// }, [records])


function completeHabit(updatedHabit) {
  const updatedRecords = [...records];
  const currentDay = updatedRecords[0];
  const selectedHabit = currentDay.habits.find(habit => habit.id === updatedHabit.id);

  selectedHabit.complete = !selectedHabit.complete;

  setRecords(updatedRecords);
}

function updateHabitQuantity(updatedHabit, newAmt) {
  const updatedRecords = [...records];
  const currentDay = updatedRecords[0];
  const selectedHabit = currentDay.habits.find(habit => habit.id === updatedHabit.id);

  selectedHabit.goal.currentAmt = selectedHabit.goal.currentAmt + Number(newAmt);
  if(selectedHabit.goal.currentAmt >= selectedHabit.goal.goalAmt) {
    selectedHabit.complete = true;
  } else {
    selectedHabit.complete = false;
  }

  setRecords(updatedRecords);
}


  return (
    <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme} >
    <>
      <GlobalStyles />

      <Header colorTheme={colorTheme} toggleTheme={toggleTheme} />

      <StyledMain>
        <Checklist currentDay={records[0]} completeHabit={completeHabit} updateHabitQuantity={updateHabitQuantity} />
        <History records={records} today={today} />
      </StyledMain>

    </>
    </ThemeProvider>
  );
}

export default App;
