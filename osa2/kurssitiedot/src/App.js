import React from 'react'
import Course from "./Course";

const App = (props) => {
    return (
        <div>
            <div>
                {props.courses.map((course, i) => {
                    return (
                        <Course course={course} key={course.name + i}/>
                    )
                })}
            </div>
        </div>
    )
};

export default App