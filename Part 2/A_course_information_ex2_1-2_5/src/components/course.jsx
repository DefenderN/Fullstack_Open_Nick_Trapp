import Header from "./header"
import Content from "./content"

const Course = ({course}) => {
    
    return(
        <div>
            <Header coursename = {course.name}/>
            <Content content = {course.parts}/>
        </div>
    )
}

export default Course