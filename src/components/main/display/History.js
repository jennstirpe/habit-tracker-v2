import { StyledHistory } from "../styled/display/History.styled"

export default function History({ records, today }) {

// create blocks for display bar based on type of habit and whether complete or not
    function createBlocks(record) {
        const habitBlocks = record.habits.map(habit => {
            if (habit.type === "check") {
                if(habit.complete) {
                    return <li className="display-bar-box" key={habit.id} style={{'background' : `${habit.color}`}}>
                        <div className="display-bar-label check"><span className="label-name">{habit.name}</span></div>
                    </li>
                } else {
                    return <li className="display-bar-box" key={habit.id}>
                        <div className="display-bar-label check"><span className="label-name">{habit.name}</span></div>
                    </li>
                }
            } else {
                if (habit.goal.currentAmt === 0) {
                    return <li className="display-bar-box" key={habit.id}>
                        <div className="display-bar-label qty"><span className="label-name">{habit.name}</span><span className="label-amt-current">0</span> <span className="label-amt-goal">{habit.goal.goalAmt}</span></div>
                    </li>
                } else if (habit.goal.currentAmt >= habit.goal.goalAmt) {
                    return <li className="display-bar-box" key={habit.id} style={{'background' : `${habit.color}`}}>
                        <div className="display-bar-label qty"><span className="label-name">{habit.name}</span><span className="label-amt-current">{habit.goal.currentAmt}</span> <span className="label-amt-goal">{habit.goal.goalAmt}</span></div>
                    </li>
                } else {
                    let percentageComplete = Math.round(habit.goal.currentAmt / habit.goal.goalAmt * 100);
                    if (percentageComplete < 10) {
                        percentageComplete = 10;
                    }
                    return <li className="display-bar-box" key={habit.id} style={{'background' : `${habit.color}${percentageComplete}`}}>
                        <div className="display-bar-label qty"><span className="label-name">{habit.name}</span><span className="label-amt-current">{habit.goal.currentAmt}</span> <span className="label-amt-goal">{habit.goal.goalAmt}</span></div>
                    </li>
                }
                
            }
        })

        return habitBlocks;
    }


  return (

    <StyledHistory>
        {
            records.map(record => {
                return <li className="history-record" key={record.id}>
                        <span className="history-record-date">{record.date.toString() == today.toString() ? "Today" : `${record.date[1]}/${record.date[2]}/${record.date[0]}`}</span>
                        <ul className="history-record-display-bar">
                            { createBlocks(record) }
                        </ul>
                    </li>
            })
        }
    </StyledHistory>

  )
}