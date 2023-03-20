import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import GlobalStyles from "./components/global/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './themes.js';

import Header from "./components/header/Header";
import Main from "./components/main/Main";
import HabitSetup from "./components/main/form/HabitSetup";

const LOCAL_STORAGE_KEY = "habitsapp.tracking"

function App() {

// WHEN DAY CHANGES, ADD NEW RECORD
  const date = new Date();
  const [ today, setToday ] = useState([]);

  useEffect(() => {
    const storedHabitTracking = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if(storedHabitTracking) {
      setHabits(storedHabitTracking.habits);
      setRecords(storedHabitTracking.records);
    }

    setToday([date.getFullYear(), date.getMonth() + 1, date.getDate()])

  }, [])

  useEffect(() => {
    if(today.length === 0) {
      return
    } else {
      if(records.length > 0 && records[0].date.toString() == today.toString()) {
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

          /*      HABITS       */
// LIST
  const [ habits, setHabits ] = useState([]);
  
// HABIT EDIT FORM OPEN/CLOSE
  const [ setupFormActive, setSetupFormActive ] = useState(false);

// UPDATE HABITS LIST WHEN USER MAKES CHANGES TO IT
  function createHabitList(list) {

    // UPDATE HABITS LIST WITH ADDED/EDITED HABITS
    setHabits(list)
    setSetupFormActive(false);

    // ADD NEW HABITS TO CURRENT DAY WITHOUT RESETTING EXISTING HABITS THAT WEREN'T EDITED
    const origRecords = [...records]
    let origCurrentDayHabits = origRecords[0].habits;

    const newCurrentDayHabits = list.map(newHabit => {
      const existingHabit = origCurrentDayHabits.find(origHabit => origHabit.id === newHabit.id);
      if(existingHabit) {
        return existingHabit;
      } else {
        if (newHabit.type === "check") {
          return { id: newHabit.id, name: newHabit.name, color: newHabit.color, type: newHabit.type, complete: false}
        } else {
          return { id: newHabit.id, name: newHabit.name, color: newHabit.color, type: newHabit.type, goal: { currentAmt: 0, goalAmt: newHabit.goalAmt}, complete: false }
        }
      }

    });

    // UPDATE CURRENT DAY RECORD TO REFLECT CHANGES TO HABITS LIST
    if(today.length === 0) {
      return
    } else {
      if(records[0].date.toString() == today.toString()) {
        records[0] = {...records[0], habits: newCurrentDayHabits};
      }
    }
  }

          /*      RECORDS       */

// LIST
  const [ records, setRecords ] = useState([])

// CREATE NEW RECORD FOR CURRENT DAY
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


  useEffect(() => {
    if(records.length !== 0 && habits.length !== 0) {
      const habitTracking = {
        "records": records,
        "habits": habits
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habitTracking))
    }
  }, [records, habits, today])


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

    if(selectedHabit.complete === true) {
      selectedHabit.goal.currentAmt = selectedHabit.goal.currentAmt + Number(newAmt);

      if(selectedHabit.goal.currentAmt < selectedHabit.goal.goalAmt) {
        const habitsCopy = [...habits];
        const incompleteHabit = habitsCopy.find(habit => habit.id === selectedHabit.id);

        selectedHabit.complete = false;

        if (incompleteHabit.bestStreak == incompleteHabit.currentStreak) {
          incompleteHabit.bestStreak -= 1;
        }
        incompleteHabit.currentStreak -=1;
        

        setHabits(habitsCopy);
        setRecords(updatedRecords);
      }
    } else {
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

    
  }

  function updateStreaks(habitId, completed) {
    const habitsCopy = [...habits];
    const selectedHabit = habitsCopy.find(habit => habit.id === habitId);

      if(completed === true) {
        selectedHabit.currentStreak += 1;
      } else {
        // if user toggles a task back to incomplete
        if (selectedHabit.bestStreak == selectedHabit.currentStreak) {
          selectedHabit.bestStreak -= 1;
        }
        selectedHabit.currentStreak = 0;
      }
  
      if(selectedHabit.bestStreak < selectedHabit.currentStreak) {
        selectedHabit.bestStreak = selectedHabit.currentStreak;
      }

  
    setHabits([...habitsCopy])
  }

  useEffect(() => {

    if(records.length > 0 && habits.length > 0) {
      const checkedHabits = [...habits];
      const prevDayHabits = records[1].habits;
  
      prevDayHabits.forEach(habit => {
        if(habit.complete === false) {
          const incompleteHabit = checkedHabits.find(checkedHabit => checkedHabit.id === habit.id);
          if(incompleteHabit) {
            incompleteHabit.currentStreak = 0;
          } else {
            return
          }
        }
      })
  
      setHabits(checkedHabits);
    } else {
      return
    }
    

  }, [today])

  const [ streaksActive, setStreaksActive ] = useState(false);

  function toggleStreaks() {
      setStreaksActive(setStreaksActive => !setStreaksActive);
  }

  return (
    <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme} >
    <>
      <GlobalStyles />

      <Header colorTheme={colorTheme} toggleTheme={toggleTheme} />

      {/* {
        habits.length === 0 && <HabitSetup habitList={[]} createHabitList={createHabitList} setSetupFormActive={setSetupFormActive} />
      } */}

      {
        habits.length === 0 ? <HabitSetup habitList={[]} createHabitList={createHabitList} setSetupFormActive={setSetupFormActive} /> : null
      }

      {
        habits.length > 0 && <Main 
        setSetupFormActive={setSetupFormActive} 
        setupFormActive={setupFormActive} 
        habitList={habits}
        createHabitList={createHabitList}
        currentDay={records[0]}
        completeHabit={completeHabit}
        updateHabitQuantity={updateHabitQuantity}
        toggleStreaks={toggleStreaks}
        streaksActive={streaksActive}
        setStreaksActive={setStreaksActive}
        records={records}
        today={today}
        />

      }

    </>
    </ThemeProvider>
  );
}

export default App;
