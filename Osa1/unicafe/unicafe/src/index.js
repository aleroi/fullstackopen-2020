import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = (props) => {
    const all = props.feedback[0] + props.feedback[1] + props.feedback[2];

    if(all > 0){
        return (
            <div>
                <table>
                    <Stat text="good" value={props.feedback[0]} />
                    <Stat text="neutral" value={props.feedback[1]} />
                    <Stat text="bad" value={props.feedback[2]} />
                    <Stat text="all" value={all} />
                    <Stat text="average" value={(props.feedback[0] - props.feedback[2]) / all} />
                    <Stat text="positive" value={`${props.feedback[0] * 100 / all} %`}/>
                </table>
            </div>
        )
    }
    else {
        return (
        <p>No feedback given</p>
        )
    }
}
const Stat = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Button = (props) => {
    return (
    <button type="button" onClick={props.handleClick}>{props.text}</button>
    )
}

const App = () => {
    const [good,setGood] = useState(0);
    const [neutral,setNeutral] = useState(0);
    const [bad,setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>

            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <h2>statistics</h2>
            <Statistics feedback={[good,neutral,bad]} />
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root'))
