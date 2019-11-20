import React from 'react'

const Course = (props) => {
    let total = props.course.parts.reduce((s, p) => {
        return s + p.exercises;
    }, 0);

    return (
        <div>
            <Header course={props.course.name}/>
            <Content parts={props.course.parts}/>
            <Total total={total}/>
        </div>
    )
};

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
                {props.parts.map((p) => {
                    return (
                        <div key={p.id}>
                            <p>{p.name} {p.exercises}</p>
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
            <p>Number of exercises {props.total}</p>
        </div>
    )
};

export default Course