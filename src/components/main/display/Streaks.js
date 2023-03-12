import { StyledStreaks } from "../styled/display/Streaks.styled"

export default function Streaks({ habits, setStreaksActive }) {
  return (
    <StyledStreaks>
      <button onClick={() => setStreaksActive(false)} className="global-close-btn" aria-label="Close streaks">&#x2715;</button>

        {
            habits.map(habit => {
            return <div key={habit.id} style={{border: `1px solid ${habit.color}`}} className="streak-container">
              <h3 style={{color: `${habit.color}`}} className="streak-name">{habit.name}</h3>
              <div className="streak-amts">
                <p className="streak"><span className="streak-amt">{habit.currentStreak}</span><span className="streak-type">Current</span></p>
                <p className="streak"><span className="streak-amt">{habit.bestStreak}</span><span className="streak-type">Best</span></p>
              </div>
            </div>
            })
        }
    </StyledStreaks>
  )
}
