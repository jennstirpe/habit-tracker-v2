import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import GlobalStyles from "./components/global/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './themes.js';

import Header from "./components/header/Header";
import Checklist from "./components/main/display/Checklist";
import History from "./components/main/display/History";
import { StyledMain } from "./components/main/Main.styled";
import HabitSetup from "./components/main/form/HabitSetup";
import Streaks from "./components/main/display/Streaks";

function App() {

// WHEN DAY CHANGES, ADD NEW RECORD
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


// HABITS -- LIST
  const [ habits, setHabits ] = useState([
      { 
        id: 1,
        name: "Tidy room",
        color: "#f72585",
        type: "check",
        currentStreak: 10,
        bestStreak: 10
      },
      { 
        id: 2,
        name: "Skincare",
        color: "#0a9396",
        type: "check",
        currentStreak: 4,
        bestStreak: 10
      },
      { 
        id: 3,
        name: "Make bed",
        color: "#d883ff",
        type: "check",
        currentStreak: 3,
        bestStreak: 5
      },
      { 
        id: 4,
        name: "Vitamins",
        color: "#d00000",
        type: "check",
        currentStreak: 0,
        bestStreak: 0
      },
      { 
        id: 5,
        name: "Drink Water",
        color: "#ffaa00",
        type: "quantity",
        goalAmt: 80,
        currentStreak: 5,
        bestStreak: 5
      },
    ])
// HABITS -- HABIT EDIT FORM OPEN/CLOSE
  const [ setupFormActive, setSetupFormActive ] = useState(false);
// HABITS -- UPDATE HABITS LIST WHEN USER MAKES CHANGES TO IT
  function createHabitList(list) {
    setHabits(list);
    setSetupFormActive(false)
      
    const habitsCopy = [...list];
    const habitsList = habitsCopy.map(habit => {
      if (habit.type === "check") {
        return { id: habit.id, name: habit.name, color: habit.color, type: habit.type, complete: false}
      } else {
        return { id: habit.id, name: habit.name, color: habit.color, type: habit.type, goal: { currentAmt: 0, goalAmt: habit.goalAmt}, complete: false }
      }
    })
    // UPDATE CURRENT DAY RECORD TO REFLECT CHANGES TO HABITS LIST
    if(today.length === 0) {
      return
    } else {
      if(records[0].date.toString() == today.toString()) {
        records[0] = {...records[0], habits: habitsList};
      }
    }
  }

// RECORDS -- LIST
  const [ records, setRecords ] = useState([
    {
      id: "33",
      date: [2023, 3, 9],
      habits: [
        {
          id: 1,
          name: "Tidy Room",
          color: "#f72585",
          type: "check",
          complete: true
        },
        {
          id: 2,
          name: "Skincare",
          color: "#0a9396",
          type: "check",
          complete: false
        },
        {
          id: 3,
          name: "Make bed",
          color: "#d883ff",
          type: "check",
          complete: true
        },
        {
          id: 4,
          name: "Vitamins",
          color: "#d00000",
          type: "check",
          complete: false
        },
        { 
          id: 5,
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
          id: 1,
          name: "Tidy Room",
          color: "#f72585",
          type: "check",
          complete: false
        },
        {
          id: 2,
          name: "Skincare",
          color: "#0a9396",
          type: "check",
          complete: false
        },
        {
          id: 3,
          name: "Make bed",
          color: "#d883ff",
          type: "check",
          complete: true
        },
        {
          id: 4,
          name: "Vitamins",
          color: "#d00000",
          type: "check",
          complete: true
        },
        { 
          id: 5,
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
          id: 1,
          name: "Tidy Room",
          color: "#f72585",
          type: "check",
          complete: true
        },
        {
          id: 2,
          name: "Skincare",
          color: "#0a9396",
          type: "check",
          complete: true
        },
        {
          id: 3,
          name: "Make bed",
          color: "#d883ff",
          type: "check",
          complete: false
        },
        {
          id: 4,
          name: "Vitamins",
          color: "#d00000",
          type: "check",
          complete: true
        },
        { 
          id: 5,
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

// RECORDS -- CREATE NEW RECORD FOR CURRENT DAY
  function createNewDay() {
    const habitsCopy = [...habits];
    const habitsList = habitsCopy.map(habit => {
      if (habit.type === "check") {
        return { id: habit.id, name: habit.name, color: habit.color, type: habit.type, complete: false }
      } else {
        return { id: habit.id, name: habit.name, color: habit.color, type: habit.type, goal: { currentAmt: 0, goalAmt: habit.goalAmt}, complete: false }
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
  //   console.log("records: ")
  //   console.log(records)
  // }, [records])

  // useEffect(() => {
  //   console.log("habits: ")
  //   console.log(habits)
  // }, [habits])


  function completeHabit(updatedHabit) {
    const updatedRecords = [...records];
    const currentDay = updatedRecords[0];
    const selectedHabit = currentDay.habits.find(habit => habit.id === updatedHabit.id);

    selectedHabit.complete = !selectedHabit.complete;
    if(selectedHabit.complete === true) {
      updateStreaks(selectedHabit.id, true)
    } else {
      updateStreaks(selectedHabit.id, false)
    }
    

    setRecords(updatedRecords);
  }

  function updateHabitQuantity(updatedHabit, newAmt) {
    const updatedRecords = [...records];
    const currentDay = updatedRecords[0];
    const selectedHabit = currentDay.habits.find(habit => habit.id === updatedHabit.id);

    selectedHabit.goal.currentAmt = selectedHabit.goal.currentAmt + Number(newAmt);
    if(selectedHabit.goal.currentAmt >= selectedHabit.goal.goalAmt) {
      selectedHabit.complete = true;
      updateStreaks(selectedHabit.id, true)
    } else {
      selectedHabit.complete = false;
      updateStreaks(selectedHabit.id, false)
    }

    setRecords(updatedRecords);
  }

  function updateStreaks(habitId, completed) {
    const habitsCopy = [...habits];
    const selectedHabit = habitsCopy.find(habit => habit.id === habitId);

    if(completed === true) {
      selectedHabit.currentStreak += 1;
    } else {
      if (selectedHabit.bestStreak == selectedHabit.currentStreak) {
        selectedHabit.bestStreak -= 1;
      }
      selectedHabit.currentStreak -= 1;
    }
    

    if(selectedHabit.bestStreak < selectedHabit.currentStreak) {
      selectedHabit.bestStreak = selectedHabit.currentStreak;
    }

    setHabits([...habitsCopy])
  }



  return (
    <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme} >
    <>
      <GlobalStyles />

      <Header colorTheme={colorTheme} toggleTheme={toggleTheme} />

      <StyledMain>
        <button onClick={() => setSetupFormActive(true)}>ADD HABIT</button>
        {
          setupFormActive && <HabitSetup habitList={habits} createHabitList={createHabitList} />
        }
        
        <Checklist currentDay={records[0]} completeHabit={completeHabit} updateHabitQuantity={updateHabitQuantity} />
        
        <Streaks habits={habits} />
        
        <History records={records} today={today} />
      </StyledMain>

    </>
    </ThemeProvider>
  );
}

export default App;
