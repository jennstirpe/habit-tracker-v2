import { StyledHistory } from "../styled/display/History.styled"

export default function History({ records, today }) {

  return (
    <StyledHistory>
        {
            records.map(record => {
                return <li key={record.id}>
                        <span>{record.date.toString() == today.toString() ? "Today" : record.date}</span>
                        <ul className="display-bar">
                            {
                                record.habits.map(habit => {
                                    if (habit.type === "check") {
                                        if(habit.complete) {
                                            return <li className="display-bar-box" key={habit.id} style={{'background' : `${habit.color}`}}></li>
                                        } else {
                                            return <li className="display-bar-box" key={habit.id}></li>
                                        }
                                    } else {
                                        if (habit.goal.currentAmt === 0) {
                                            return <li className="display-bar-box" key={habit.id}></li>
                                        } else if (habit.goal.currentAmt >= habit.goal.goalAmt) {
                                            return <li className="display-bar-box" key={habit.id} style={{'background' : `${habit.color}`}}></li>
                                        } else {
                                            let percentageComplete = Math.round(habit.goal.currentAmt / habit.goal.goalAmt * 100);
                                            if (percentageComplete < 10) {
                                                percentageComplete = 10;
                                            }
                    
                                            return <li className="display-bar-box" key={habit.id} style={{'background' : `${habit.color}${percentageComplete}`}}></li>
                                        }
                                        
                                    }
                                    
                                })
                            }
                        </ul>
                    </li>
            })
        }

    </StyledHistory>
  )
}
