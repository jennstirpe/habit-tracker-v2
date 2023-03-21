import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import GlobalStyles from "./components/global/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './themes.js';

import Header from "./components/header/Header";
import Main from "./components/main/display/Main";
import HabitSetup from "./components/main/form/HabitSetup";

const LOCAL_STORAGE_KEY = "habitsapp.tracking"

function App() {

          /*  ----------    INITIAL SETUP    ----------  */

// SET THEME
  const [colorTheme, setColorTheme] = useState('light');

  function toggleTheme() {
    if (colorTheme === "dark") {
      setColorTheme('light');
    } else if (colorTheme === 'light') {
      setColorTheme('dark');
    }
  }


// WHEN DAY CHANGES, ADD NEW RECORD
  const date = new Date();
  const [ today, setToday ] = useState([]);

// CHECK LOCAL STORAGE FOR SAVED DATA, SET CURRENT DATE
  useEffect(() => {
    const storedHabitTracking = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if(storedHabitTracking) {
      setHabits(storedHabitTracking.habits);
      setRecords(storedHabitTracking.records);
    }

    setToday([date.getFullYear(), date.getMonth() + 1, date.getDate()])

  }, [])


          /*  ----------    HABITS    ----------  */
// HABITS LIST
  const [ habits, setHabits ] = useState([]);
  
// HABIT EDIT FORM OPEN/CLOSE
  const [ setupFormActive, setSetupFormActive ] = useState(false);

// UPDATE HABITS LIST WHEN USER MAKES CHANGES TO IT, UPDATE CURRENT DAY RECORDS
  function createHabitList(list) {

    //Update habits list with added/edited habits
    setHabits(list)
    setSetupFormActive(false);

    // Add new habits to current day without resetting existing, unchanged habits
    const origRecords = [...records]
    let origCurrentDayHabits = origRecords[0].habits;

    const newCurrentDayHabits = list.map(newHabit => {
      const existingHabit = origCurrentDayHabits.find(origHabit => origHabit.id === newHabit.id);
      if(existingHabit) {
        // check for changes to existing habits, update if there are
        if(newHabit.name !== existingHabit.name) {
          existingHabit.name = newHabit.name;
        }
        if(newHabit.color !== existingHabit.color) {
          existingHabit.color = newHabit.color;
        }

        if(existingHabit.type === "quantity") {
          if(Number(newHabit.goalAmt) !== existingHabit.goal.goalAmt) {
            existingHabit.goal.goalAmt = Number(newHabit.goalAmt);
            if(existingHabit.goal.currentAmt < existingHabit.goal.goalAmt) {
              existingHabit.complete = false;
            }
          }
        }

        return existingHabit;
      } else {
        // create new habit in record
        if (newHabit.type === "check") {
          return { id: newHabit.id, name: newHabit.name, color: newHabit.color, type: newHabit.type, complete: false}
        } else {
          return { id: newHabit.id, name: newHabit.name, color: newHabit.color, type: newHabit.type, goal: { currentAmt: 0, goalAmt: newHabit.goalAmt}, complete: false }
        }
      }
    });

    // Update current day record to reflect changes to habits list
    if(today.length === 0) {
      return
    } else {
      if(records[0].date.toString() == today.toString()) {
        records[0] = {...records[0], habits: newCurrentDayHabits};
      }
    }
  }

          /*  ----------    RECORDS    ----------  */

// RECORDS LIST
  const [ records, setRecords ] = useState([]);

// CHECK IF RECORD FOR CURRENT DAY EXISTS, CREATE ONE IF NOT
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

// SET UP NEW RECORD FOR CURRENT DAY
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

// TOGGLE HABIT COMPLETE
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

// UPDATE HABIT QUANTITY
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

          /*  ----------    STREAKS    ----------  */  

// TOGGLE STREAKS DISPLAY
  const [ streaksActive, setStreaksActive ] = useState(false);

  function toggleStreaks() {
      setStreaksActive(setStreaksActive => !setStreaksActive);
  }

// UPDATE STREAKS WHEN A HABIT IS MARKED COMPLETE
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

// UPDATE STREAKS AT END OF DAY (IF HABIT NOT COMPLETED, RESET CURRENT STREAK)
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


// SAVE RECORDS AND HABITS TO LOCAL STORAGE
  useEffect(() => {
    if(records.length !== 0 && habits.length !== 0) {
      const habitTracking = {
        "records": records,
        "habits": habits
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habitTracking))
    }
  }, [records, habits, today])

  
  return (
    <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme} >
    <>
      <GlobalStyles />

      <Header colorTheme={colorTheme} toggleTheme={toggleTheme} />

      { habits.length === 0 ? <HabitSetup habitList={[]} createHabitList={createHabitList} setSetupFormActive={setSetupFormActive} /> : null }

      {
        habits.length > 0 ? <Main 
        setSetupFormActive={setSetupFormActive} 
        setupFormActive={setupFormActive} 
        habitList={habits}
        createHabitList={createHabitList}
        completeHabit={completeHabit}
        updateHabitQuantity={updateHabitQuantity}
        toggleStreaks={toggleStreaks}
        streaksActive={streaksActive}
        setStreaksActive={setStreaksActive}
        records={records}
        today={today}
        /> : null

      }

    </>
    </ThemeProvider>
  );
}

export default App;
