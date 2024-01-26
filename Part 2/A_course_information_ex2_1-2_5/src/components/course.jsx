import Header from "./header"
import Content from "./content"

const Course = ({course}) => {
    
    const totalExercises = course.parts.reduce(
        (accumulator, part) => accumulator + part.exercises, 0);
    
    return(
        <div>
            <Header coursename = {course.name}/>
            <Content content = {course.parts}/>
            <p>total of {totalExercises} exercises</p>
        </div>
    )
}

export default Course