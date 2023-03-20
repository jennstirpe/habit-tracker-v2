import { StyledChecklist } from "../styled/display/Checklist.styled"
import { useState, useRef } from "react"
import CloseBtn from "../../global/CloseBtn";

export default function Checklist({ currentDay, completeHabit, updateHabitQuantity, toggleStreaks, streaksActive }) {

    const [ quantityFormActive, setQuantityFormActive ] = useState(false);
    const [ activeHabit, setActiveHabit ] = useState({})
    const newAmt = useRef();
    
    function handleUpdateRecord(updatedHabit) {
        if(updatedHabit.type === "check") {
            completeHabit(updatedHabit)
        } else {
            setQuantityFormActive(true);
            setActiveHabit(updatedHabit)
        }
    }

    function handleUpdateHabitQuantity(e) {
        e.preventDefault();
        if(newAmt.current.value) {
            updateHabitQuantity(activeHabit, newAmt.current.value);
            setQuantityFormActive(false);
        }

    }

  return (
    <StyledChecklist>
        {
            currentDay.habits.map(habit => {
                return <button onClick={() => handleUpdateRecord(habit)} className="checklist-habit" key={habit.id} style={!habit.complete ? {background: "gray"} : {background: `${habit.color}`}}>{habit.name}</button>
            })
        }

        <button onClick={() => toggleStreaks()} className="checklist-streak-btn">
            {
                streaksActive ? "Close" : "Streaks"
            }
        </button>

        {
            quantityFormActive && (
            <form className="checklist-qty-form">
                <CloseBtn closeFunction={() => setQuantityFormActive(false)} ariaLabel="Close quantity update form" />
                <h3 className="checklist-qty-form-header" style={{color: `${activeHabit.color}`}}>{activeHabit.name}</h3>
                <label className="checklist-qty-form-label" style={{background: `${activeHabit.color}25`}}>
                <input ref={newAmt} type="number" placeholder="Add Amount" className="global-input" />
                / {activeHabit.goal.goalAmt}
                </label>
                <button onClick={handleUpdateHabitQuantity} className="global-submit-btn">Update</button>
            </form>)
        }
    </StyledChecklist>
  )
}
