import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
        return (
            <div>
                <h2>Statistics</h2>
                <h2>No feedback given</h2>
            </div>
        )
    }

    let average = 0;
    if (props.good > 0 || props.bad > 0)
        average = (props.good * 1 + props.bad * -1) / (props.good + props.neutral + props.bad);

    let positive = 0;
    if (props.good > 0) {
        if ((props.good + props.neutral + props.bad) !== 0) {
            positive = ((props.good / (props.good + props.neutral + props.bad)) * 100) +  ' %';
        }
    }

    return (
        <table>
            <tbody>
            <Statistic text="good" value={props.good}/>
            <Statistic text="Neutral" value={props.neutral}/>
            <Statistic text="Bad" value={props.bad}/>
            <Statistic text="All" value={props.good + props.neutral + props.bad}/>
            <Statistic text="Average" value={average}/>
            <Statistic text="Positive" value={positive}/>
            </tbody>
        </table>
    )
};

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text} </td>
            <td>{props.value}</td>
        </tr>
    )
};

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
);

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const onGoodClicked = () => {
        setGood(good + 1);
    };
    const onNeutralClicked = () => {
        setNeutral(neutral + 1);
    };
    const onBadClicked = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <h2>Give Feedback</h2>
            <Button onClick={onGoodClicked} text='Good'/>
            <Button onClick={onNeutralClicked} text='Neutral'/>
            <Button onClick={onBadClicked} text='Bad'/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
};

ReactDOM.render(<App/>,
    document.getElementById('root')
);