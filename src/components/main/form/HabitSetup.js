import { useState, useRef} from "react";
import { v4 as uuidv4 } from 'uuid';
import CloseBtn from "../../global/CloseBtn";

import { StyledHabitSetup } from "../styled/form/HabitSetup.styled";
import ColorInput from "./ColorInput";
import EditHabitForm from "./EditHabitForm";





export default function HabitSetup({ habitList, createHabitList, setSetupFormActive }) {

// HABIT LIST
    const [ tempHabitsList, setTempHabitsList ] = useState([...habitList]);
    const [ editFormActive, setEditFormActive ] = useState(false);
    const [ editHabit, setEditHabit ] = useState({});

    // HABIT LIST - toggle edit form 
    function openEditForm(habit) {
        setEditHabit(habit);
        setEditFormActive(true);
    }
    
    function closeEditForm() {
        setEditFormActive(false);
    }

    // HABIT LIST - create new habit and push to temporary list
    function addHabitToList(habitName, habitColor, habitType, habitGoalAmt) {
  
      const tempListCopy = [...tempHabitsList];
      let newHabit;
  
      if (habitType === "check") {
        newHabit = { id: uuidv4(), name: habitName, color: habitColor, type: habitType, currentStreak: 0, bestStreak: 0 }
      } else {
        newHabit = { id: uuidv4(), name: habitName, color: habitColor, type: habitType, goalAmt: Number(habitGoalAmt), currentStreak: 0, bestStreak: 0 }
      }
  
      setTempHabitsList([newHabit, ...tempListCopy])
    }

    
    // HABIT LIST - update existing habit
    function updateHabit(id, newName, newColor, newGoal) {
      const updatedHabitList = [...tempHabitsList];
      let updatedHabit = updatedHabitList.find(habit => habit.id === id);
      if(updatedHabit.name !== newName) {
        updatedHabit.name = newName;
      }
      if(updatedHabit.color !== newColor) {
        updatedHabit.color = newColor;
      }
      if(updatedHabit.type === "quantity") {
        if(updatedHabit.goalAmt !== newGoal) {
          updatedHabit.goalAmt = newGoal;
        }
      }
  
      setTempHabitsList(updatedHabitList);
      setEditFormActive(false);
    }
  
    // HABIT LIST - delete habit
    function deleteHabit(id) {
      const habitList = [...tempHabitsList];
      const updatedHabitList = habitList.filter(habit => habit.id !== id);
  
      setTempHabitsList(updatedHabitList);
      setEditFormActive(false);
    }
  
    // HABIT LIST - update habit list
    function handleSetHabits() {
        createHabitList(tempHabitsList)
    }
  


// NEW HABIT INPUT
    const [colorInputActive, setColorInputActive] = useState(false);

    const habitName = useRef();
    const [habitColor, setHabitColor] = useState("");
    const [habitType, setHabitType] = useState("check");
    const habitTypeInput = useRef();
    const quantityGoalInput = useRef();
    
    // NEW HABIT - toggle color input, set color 
    function openColorInput(e) {
        e.preventDefault();
        setColorInputActive(true)
    }

    function closeColorInput() {
        setColorInputActive(false)
    }

    function setSelectedColor(color) {
        setHabitColor(color)
        closeColorInput()
    }

    // NEW HABIT - set habit type
    function changeHabitType() {
        if (habitTypeInput.current.value === "check") {
            setHabitType("check")
        } else {
            setHabitType("quantity")
        }
    }

    // NEW HABIT - create new habit
    function handleSubmitNewHabit(e) {
        e.preventDefault();

        const name = habitName.current.value;
        const color = habitColor;
        const type = habitType;

        if(!name || !color ) {
            return
        } else if (type === "quantity") {
            const goal = quantityGoalInput.current.value;

            if(!goal) {
                return
            } else {
                addHabitToList(name, color, type, goal);
                habitName.current.value = "";
                setHabitColor("#fff");
                quantityGoalInput.current.value = "";
            }
        } else if (type === "check"){
            addHabitToList(name, color, type);
            habitName.current.value = "";
            setHabitColor("#fff");
        }
    }

  return (
    <StyledHabitSetup>

        <h2 className="habit-setup-heading">Add habits</h2>
        <CloseBtn closeFunction={() => setSetupFormActive(false)} ariaLabel="Close habit setup form" />

        { tempHabitsList.length < 10 ? (
            <div className="new-habit-form">
                <input ref={habitName} className="global-input" type="text" placeholder="Habit Name" maxLength="20" />
                <div className="habit-specs">
                    <button className="habit-color" onClick={openColorInput} aria-label="Color selector" style={habitColor ? {"background" : `${habitColor}`} : {"background" : `${({theme}) => theme.colors.bgSecondary}`}}></button>
                    {
                        colorInputActive ? <ColorInput closeColorInput={closeColorInput} setSelectedColor={setSelectedColor} /> : null
                    }
                    <select name="habit-type" className="global-input" ref={habitTypeInput} onChange={changeHabitType}>
                        <option value="" defaultValue disabled>Habit Type</option>
                        <option value="check">Yes/No</option>
                        <option value="quantity">Quantity</option>
                    </select>
                </div>

                {
                    habitType === "quantity" ? (
                        <div className="habit-quantity-values">
                            <label className="habit-quantity-label">
                                Goal: 
                                <input ref={quantityGoalInput} className="global-input" type="number" placeholder="Enter goal amount" />
                            </label>
                        </div>
                    ) : null
                }
                
                <button onClick={handleSubmitNewHabit} className="global-submit-btn habit-submit-btn" aria-label="Add new habit">+ Add</button>
            </div>
        ) : null
        
        }


        { tempHabitsList.length > 0 ? (
            <div className="temp-habits">

            <ul className="temp-habits-list">
                {
                    tempHabitsList.map(habit => {
                        return (
                            <li key={habit.id} className="temp-habits-list-item" style={{"border": `2px solid ${habit.color}50`}}>
                                <div className="temp-list-item-color" style={{"background": `${habit.color}`}}></div>
                                <p className="temp-list-item-name">{habit.name}</p>
                                {
                                    habit.type === "quantity" ? <p className="temp-list-item-details">{habit.goalAmt}</p> : null
                                }
                                <button onClick={() => openEditForm(habit)} className="global-edit-btn" aria-label="edit">
                                    <svg style={{height: "1rem", width: "1rem"}} width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M343.029 42.3419C352.402 32.9693 367.598 32.9694 376.971 42.3419L469.657 135.028C479.029 144.401 479.029 159.597 469.657 168.969L179.462 459.164C179.006 459.633 178.521 460.073 178.011 460.482C176 462.099 173.688 463.158 171.283 463.66C170.898 463.741 170.509 463.808 170.115 463.86L50.1148 479.86C45.175 480.519 40.2103 478.838 36.6864 475.314C33.1626 471.79 31.4819 466.826 32.1405 461.886L48.1164 342.066C48.5312 338.637 50.0545 335.317 52.6863 332.685L343.029 42.3419ZM393.372 199.999L167.999 425.372L86.6267 344L312 118.627L393.372 199.999ZM416 177.372L441.373 151.999L360 70.6262L334.627 95.9992L416 177.372ZM75.5807 378.208L66.6251 445.376L133.792 436.42L75.5807 378.208Z" fill="black"/></svg>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>

            { 
                editFormActive ? <EditHabitForm habit={editHabit} updateHabit={updateHabit} deleteHabit={deleteHabit} closeEditForm={closeEditForm} /> : null
            }
                
                
            <button onClick={handleSetHabits} className="global-submit-btn">Done</button>
            </div>
         ) : null
        }

    </StyledHabitSetup>
  )
}
