import HabitSetup from "../form/HabitSetup";
import Checklist from "./Checklist";
import History from "./History";
import Streaks from "./Streaks";

export default function Main({ setSetupFormActive, setupFormActive, habitList, createHabitList, completeHabit, updateHabitQuantity, toggleStreaks, streaksActive, setStreaksActive, records, today }) {

    function openSetupForm() {
        setSetupFormActive(true)
    }


  return (
    <div>
        <button onClick={openSetupForm} className="global-edit-btn" aria-label="Add or edit habits">
          <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M343.029 42.3419C352.402 32.9693 367.598 32.9694 376.971 42.3419L469.657 135.028C479.029 144.401 479.029 159.597 469.657 168.969L179.462 459.164C179.006 459.633 178.521 460.073 178.011 460.482C176 462.099 173.688 463.158 171.283 463.66C170.898 463.741 170.509 463.808 170.115 463.86L50.1148 479.86C45.175 480.519 40.2103 478.838 36.6864 475.314C33.1626 471.79 31.4819 466.826 32.1405 461.886L48.1164 342.066C48.5312 338.637 50.0545 335.317 52.6863 332.685L343.029 42.3419ZM393.372 199.999L167.999 425.372L86.6267 344L312 118.627L393.372 199.999ZM416 177.372L441.373 151.999L360 70.6262L334.627 95.9992L416 177.372ZM75.5807 378.208L66.6251 445.376L133.792 436.42L75.5807 378.208Z" fill="black"/></svg>
        </button>

        { setupFormActive ? <HabitSetup habitList={habitList} createHabitList={createHabitList} setSetupFormActive={setSetupFormActive} /> : null }

        <Checklist currentDay={records[0]} completeHabit={completeHabit} updateHabitQuantity={updateHabitQuantity} toggleStreaks={toggleStreaks} streaksActive={streaksActive} />

        { streaksActive ? <Streaks habits={habitList} setStreaksActive={setStreaksActive} /> : null }

        <History records={records} today={today} setStreaksActive={setStreaksActive} />

    </div>
  )
}
