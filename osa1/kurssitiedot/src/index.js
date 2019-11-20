import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h2>{props.course}</h2>
        </div>
    )
};

const Content = (props) => {
    return (
        <>
            <div>
                {props.parts.map((p, i) => {
                    return (
                        <div key={i}>
                            <li>{p.name}</li>
                        </div>
                    )
                })}
                <br/>
            </div>
        </>
    )
};

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </div>
    )
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <div>
                <Header course={course.name}/>
                <Content parts={course.parts}/>
                <Total parts={course.parts}/>
            </div>
        </div>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'))