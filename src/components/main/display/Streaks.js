import { StyledStreaks } from "../styled/display/Streaks.styled"

export default function Streaks({ habits }) {
  return (
    <StyledStreaks>
        {
            habits.map(habit => {
            return <span key={habit.id}> {habit.name}: {habit.currentStreak} | {habit.bestStreak} </span>
            })
        }
    </StyledStreaks>
  )
}
