import { StyledChecklist } from "../styled/Checklist.styled"
import { useState, useRef } from "react"

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
                return <button onClick={() => handleUpdateRecord(habit)} key={habit.id} style={!habit.complete ? {background: "gray"} : {background: `${habit.color}`}}>{habit.name}</button>
            })
        }

        {
            quantityFormActive && (
            <form>
                {activeHabit.name}
                <label>
                <input ref={newAmt} type="number" placeholder="Add Amount" />
                / {activeHabit.goal.goalAmt}
                </label>
                <button onClick={handleUpdateHabitQuantity}>Update</button>
            </form>)
        }
    </StyledChecklist>
  )
}
