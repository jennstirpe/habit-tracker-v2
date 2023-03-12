import { StyledChecklist } from "../styled/display/Checklist.styled"
import { useState, useRef, useEffect } from "react"

export default function Checklist({ currentDay, completeHabit, updateHabitQuantity }) {

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

        {
            quantityFormActive && (
            <form className="checklist-qty-form">
                <button onClick={() => setQuantityFormActive(false)} className="global-close-btn">&#x2715;</button>
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
