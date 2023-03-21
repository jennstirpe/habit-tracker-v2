import { useState, useRef } from "react";
import CloseBtn from "../../global/CloseBtn";
import { StyledEditHabitForm } from "../styled/form/EditHabitForm.styled";
import ColorInput from "./ColorInput";

export default function EditHabitForm({ habit, updateHabit, deleteHabit, closeEditForm }) {
  
  const [colorInputActive, setColorInputActive] = useState(false);
  const nameInput = useRef();
  const [habitColor, setHabitColor] = useState("");
  const goalInput = useRef();

  function handleCloseEditForm() {
    closeEditForm()
  }

// Handle color update
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

// Update habit details
  function handleUpdateHabit() {
    let newName;
    let newColor;
    let newGoal;

    // check if name changed, update if so
    if(!nameInput.current.value || nameInput.current.value == habit.name) {
      newName = habit.name;
    } else if (nameInput.current.value !== habit.name){
      newName = nameInput.current.value;
    }

    // check if color changed, update if so
    if(!habitColor || habitColor == habit.color) {
      newColor = habit.color;
    } else if (habitColor !== habit.color){
      newColor = habitColor;
    }

    // check if quantity changed, update if so
    if(habit.type === "quantity") {
      if(!goalInput.current.value || goalInput.current.value == habit.goalAmt) {
        newGoal = habit.goalAmt;
      } else if (goalInput.current.value !== habit.goalAmt) {
        newGoal = goalInput.current.value;
      }
    }

    updateHabit(habit.id, newName, newColor, newGoal);
  }

  function handleDeleteHabit() {
    deleteHabit(habit.id)
  }

  return (
    <StyledEditHabitForm>
   
        <CloseBtn closeFunction={handleCloseEditForm} ariaLabel="Close edit form" />
        
        <div className="edit-details">
          <div className="edit-details-group">
            <input ref={nameInput} className="global-input" type="text" placeholder={habit.name} />
            <div onClick={openColorInput} className="edit-color" style={ habitColor ? {"background": `${habitColor}`} : {"background": `${habit.color}`}}></div>
          </div>

          {
            habit.type === "quantity" ? (
                <label className="qty-edit-label">
                  Goal: 
                  <input ref={goalInput} placeholder={habit.goalAmt} className="global-input" />
                </label>
            ) : null
          }
        </div>
        
        {
          colorInputActive ? <ColorInput closeColorInput={closeColorInput} setSelectedColor={setSelectedColor} /> : null
        }

        <div className="edit-btns">
          <button onClick={handleDeleteHabit} className="edit-btn delete" aria-label="Delete habit">
            <svg id="i-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"  fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" /></svg>
          </button>
          <button onClick={handleCloseEditForm} className="edit-btn cancel">Cancel</button>
          <button onClick={handleUpdateHabit} className="edit-btn update">Update</button>
        </div>
        
    </StyledEditHabitForm>
  )
}


