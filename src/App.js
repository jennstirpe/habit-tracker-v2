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

  // useEffect(() => {
  //   console.log(records[1].habits)
  // }, [])

  const [ streaksActive, setStreaksActive ] = useState(false);

  function toggleStreaks() {
      setStreaksActive(setStreaksActive => !setStreaksActive);
  }

  return (
    <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme} >
    <>
      <GlobalStyles />

      <Header colorTheme={colorTheme} toggleTheme={toggleTheme} />

      {
        habits.length === 0 && <HabitSetup habitList={[]} createHabitList={createHabitList} setSetupFormActive={setSetupFormActive} />
      }

      {
        habits.length > 0 && <StyledMain>
        <button onClick={() => setSetupFormActive(true)} className="global-edit-btn">
          <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M343.029 42.3419C352.402 32.9693 367.598 32.9694 376.971 42.3419L469.657 135.028C479.029 144.401 479.029 159.597 469.657 168.969L179.462 459.164C179.006 459.633 178.521 460.073 178.011 460.482C176 462.099 173.688 463.158 171.283 463.66C170.898 463.741 170.509 463.808 170.115 463.86L50.1148 479.86C45.175 480.519 40.2103 478.838 36.6864 475.314C33.1626 471.79 31.4819 466.826 32.1405 461.886L48.1164 342.066C48.5312 338.637 50.0545 335.317 52.6863 332.685L343.029 42.3419ZM393.372 199.999L167.999 425.372L86.6267 344L312 118.627L393.372 199.999ZM416 177.372L441.373 151.999L360 70.6262L334.627 95.9992L416 177.372ZM75.5807 378.208L66.6251 445.376L133.792 436.42L75.5807 378.208Z" fill="black"/></svg>
        </button>
        {
          setupFormActive && <HabitSetup habitList={habits} createHabitList={createHabitList} setSetupFormActive={setSetupFormActive} />
        }
        
        <Checklist currentDay={records[0]} completeHabit={completeHabit} updateHabitQuantity={updateHabitQuantity} toggleStreaks={toggleStreaks} streaksActive={streaksActive} />
        
        {
          streaksActive && <Streaks habits={habits} setStreaksActive={setStreaksActive} />
        }
        
        
        <History records={records} today={today} setStreaksActive={setStreaksActive} />
      </StyledMain>
      }

    </>
    </ThemeProvider>
  );
}

export default App;
